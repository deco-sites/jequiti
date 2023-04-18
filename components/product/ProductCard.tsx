import Image from "deco-sites/std/components/Image.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Avatar from "deco-sites/jequiti/components/ui/Avatar.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import WishlistIcon from "deco-sites/jequiti/islands/WishlistButton.tsx";
import { useOffer } from "deco-sites/jequiti/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/jequiti/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/jequiti/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import AddToCartButton from "deco-sites/jequiti/islands/AddToCartButton.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([value, urls]) => {
        const url = urls.find((url) => url === product.url) || urls[0];

        return (
          <a href={url}>
            <Avatar
              class="bg-default"
              variant="abbreviation"
              content={value}
              disabled={url === product.url}
            />
          </a>
        );
      })}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    name: skuName,
    image: images,
    offers,
    isVariantOf,
    brand,
    sku,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller, installments } = useOffer(offers);
  const { name } = isVariantOf ?? {};

  const discount = price && listPrice ? listPrice - price : 0;
  const discountPercentage = Math.ceil(
    discount && listPrice ? discount * 100 / (listPrice ?? 0) : 0,
  );

  return (
    <div
      data-deco="view-product"
      id={`product-card-${productID}`}
      class="w-full group px-[24px] py-[12px] border-default border-1 flex flex-col"
    >
      <a href={url} aria-label="product link" class="flex flex-col flex-1">
        <div class="relative w-full">
          <div class="absolute top-0 right-0">
            <WishlistIcon
              productId={isVariantOf?.productGroupID}
              sku={productID}
              title={name}
            />
          </div>
          {discountPercentage !== 0 && (
            <div class="absolute top-0 left-0 bg-[#d13482] px-[7px] py-[4px] leading-none">
              <Text variant="caption" class="text-white font-bold text-[14px]">
                -{discountPercentage}%
              </Text>
            </div>
          )}
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={270}
            height={270}
            class="rounded w-full group-hover:hidden"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={270}
            height={270}
            class="rounded w-full hidden group-hover:block"
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          {seller && (
            <div
              class="absolute bottom-0 hidden sm:group-hover:flex flex-col gap-2 w-full p-2 bg-opacity-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
              }}
            >
              <Sizes {...product} />
              {/* FIXME: Understand why fresh breaks rendering this component */}
              {
                /* <SendEventButton
                as="a"
                href={product.url}
                event={{
                  name: "select_item",
                  params: {
                    item_list_name: itemListName,
                    items: [
                      mapProductToAnalyticsItem({
                        product,
                        price,
                        listPrice,
                      }),
                    ],
                  },
                }}
              >
                Visualizar Produto
              </SendEventButton> */
              }
            </div>
          )}
        </div>

        <div class="flex flex-col gap-1 py-2 flex-1">
          <Text class="text-interactive">{brand}</Text>
          <Text
            class="overflow-hidden overflow-ellipsis line-clamp-2 flex flex-1"
            variant="caption"
          >
            {name}
            {skuName && `, ${skuName}`}
          </Text>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <Text
                class="line-through"
                variant="list-price"
                tone="subdued"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>
              <Text variant="caption" tone="price">
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>
            <Text tone="subdued" variant="caption">
              {installments}
            </Text>
          </div>
          {seller && (
            <AddToCartButton
              skuId={productID}
              sellerId={seller}
              price={price ?? 0}
              discount={discount}
              name={product.name ?? ""}
              productGroupId={product.isVariantOf?.productGroupID ?? ""}
            />
          )}
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
