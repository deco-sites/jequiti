import { toProduct } from "deco-sites/std/packs/vtex/utils/transform.ts";
import { paths } from "deco-sites/std/packs/vtex/utils/paths.ts";
import {
  getSegment,
  setSegment,
  withSegmentCookie,
} from "deco-sites/std/packs/vtex/utils/segment.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import {
  toPath,
  withDefaultFacets,
  withDefaultParams,
} from "deco-sites/std/packs/vtex/utils/intelligentSearch.ts";
import type { ProductSearchResult } from "deco-sites/std/packs/vtex/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import type { Sort } from "deco-sites/std/packs/vtex/types.ts";
import type { Context } from "deco-sites/std/packs/vtex/accounts/vtex.ts";

export interface QueryProps extends CommonProps {
  /** @description query to use on search */
  query: string;
  /**
   * @description search sort parameter
   */
  sort?: Sort;
  /** @description total number of items to display */
  count: number;
}

export interface CommonProps {
  /**
   * @title Hide Unavailable Items
   * @description Do not return out of stock items
   */
  hideUnavailableItems?: boolean;
}

export type CategoryProps = Array<Partial<QueryProps>>;

const fromProps = (props: Partial<QueryProps>) => {
  return {
    query: props.query || "",
    count: props.count || 12,
    sort: props.sort || "",
    selectedFacets: [],
    hideUnavailableItems: props.hideUnavailableItems,
  } as const;
};

/**
 * @title VTEX product list - Intelligent Search
 * @description Usefull for shelves and galleries.
 */
const loader = async (
  categoryProps: CategoryProps,
  req: Request,
  ctx: Context,
): Promise<Product[][] | null> => {
  const { configVTEX: config } = ctx;
  const { url } = req;
  const vtex = paths(config!);
  const segment = getSegment(req);

  const promises = [];
  for (const [_, props] of Object.entries(categoryProps)) {
    const { selectedFacets, ...args } = fromProps(props);
    const params = withDefaultParams(args, ctx);
    const facets = withDefaultFacets(selectedFacets, ctx);
    const search = vtex.api.io._v.api["intelligent-search"].product_search;

    // search products on VTEX. Feel free to change any of these parameters
    promises.push(fetchAPI<ProductSearchResult>(
      `${search.facets(toPath(facets))}?${params}`,
      {
        withProxyCache: true,
        headers: withSegmentCookie(segment),
      },
    ));
  }
  // Transform VTEX product format into schema.org's compatible format
  // If a property is missing from the final `products` array you can add
  // it in here
  const options = {
    baseUrl: url,
    priceCurrency: config!.defaultPriceCurrency,
  };

  const vtexProducts = (await Promise.all(promises)).map((x) => x.products);
  const products = vtexProducts
    .map((pp) => pp.map((p) => toProduct(p, p.items[0], 0, options)));

  setSegment(segment, ctx.response.headers);
  return products;
};

export default loader;
