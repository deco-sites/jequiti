import ProductCard from "deco-sites/jequiti/components/product/ProductCard.tsx";
import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { Slider } from "deco-sites/jequiti/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/jequiti/islands/SliderJS.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/jequiti/islands/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/jequiti/sdk/useOffer.ts";

export interface Props {
    title: string;
    shelfTitles?: string[];
    products: LoaderReturnType<Product[] | null>;
    itemsPerPage?: number;
    shelfs?: LoaderReturnType<Product[][] | null>;
    seeMore?: string;
    seeMoreLink?: string;
}

function ShelfItem({ products, title }: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div id={id} class="relative">
      <Slider
        class="col-span-full row-start-2 row-end-5 override:(items-stretch) "
        snap="snap-center sm:snap-start last:mr-[10px] sm:last:mr-0 flex items-stretch"
        slidePerView={{
          desktop: 4,
          tablet: 3,
          phone: 1.25,
        }}
      >
        {products?.map((product) => (
          <div class="flex flex-1 max-w-[270px] sm:max-w-[292px] mx-auto flex items-stretch">
            <ProductCard product={product} itemListName={title} />
          </div>
        ))}
      </Slider>

      <>
        <div class="hidden absolute sm:block z-10 top-1/2 left-0">
          <div class=" bg-interactive-inverse rounded-full border-default border">
            <Button
              variant="icon"
              data-slide="prev"
              aria-label="Previous item"
            >
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Button>
          </div>
        </div>
        <div class="hidden sm:block z-10  absolute  top-1/2 right-0">
          <div class=" bg-interactive-inverse rounded-full border-default border">
            <Button variant="icon" data-slide="next" aria-label="Next item">
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </>

      <SliderControllerJS rootId={id} />

      <ViewSendEvent
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </div>
  );
}
function TabbedShelf({
    title,
    products,
    shelfTitles,
    shelfs,
    seeMore,
    seeMoreLink,
}: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container class="flex flex-col py-10 px-0 sm:px-5 gap-[32px]">
      <h2 class="text-center text-heading-4 font-heading-4 text-1-500">
        {title}
      </h2>

      <div class="tabbed tab-radio-button-1-[border-color:#00aeb9;color:#00aeb9;] tab-radio-button-2-[border-color:#00aeb9;color:#00aeb9;]  
      tab-radio-button-3-[border-color:#00aeb9;color:#00aeb9;] tab-radio-button-4-[border-color:#00aeb9;color:#00aeb9;]
      tab-radio-content-1-[display:block;] tab-radio-content-2-[display:block;] tab-radio-content-3-[display:block;] tab-radio-content-4-[display:block;] flex flex-col gap-4">
        {
          /* <input type="radio" id="tab2" name="css-tabs" class="hidden" />
        <input type="radio" id="tab3" name="css-tabs" class="hidden" />
        <input type="radio" id="tab4" name="css-tabs" class="hidden" /> */
        }

        {shelfTitles?.map((_, index) => (
          <input
            type="radio"
            id={`tab${index}`}
            name="css-tabs"
            class="hidden"
            checked={index === 0}
          />
        ))}

        <ul class="tabs flex w-full pb-6 sm:justify-center overflow-x-auto">
          {shelfTitles?.map((shelfTitle, index) => (
            <li class="tab p-[14px] border-b-[4px] border-default text-2-500">
              <label for={`tab${index}`} class="px-5 whitespace-nowrap text-lg">
                {shelfTitle}
              </label>
            </li>
          ))}
        </ul>

        {shelfs?.map((shelf) => (
          <div class="tab-content hidden">
            <ShelfItem products={shelf} title={title} />
          </div>
        ))}
        {!!seeMore && !!seeMoreLink}
        <div class="text-center mt-4">
            <a href={seeMoreLink} class="text-[#00AEB9] font-bold text-sm ">
                {seeMore}
            </a>
        </div>
      </div>
    </Container>
  );
}

export default TabbedShelf;
