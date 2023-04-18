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
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
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
}: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container class="flex flex-col py-10 px-0 sm:px-5 gap-[32px]">
      <h2 class="text-center">
        <Text variant="heading-2" class="uppercase">{title}</Text>
      </h2>

      <div class="tabbed tab-radio-button-1-[border-color:#00aeb9;color:#00aeb9;] tab-radio-button-2-[border-color:#00aeb9;color:#00aeb9;]  
      tab-radio-button-3-[border-color:#00aeb9;color:#00aeb9;] tab-radio-button-4-[border-color:#00aeb9;color:#00aeb9;]
      tab-radio-content-1-[display:block;] tab-radio-content-2-[display:block;] tab-radio-content-3-[display:block;] tab-radio-content-4-[display:block;] flex flex-col gap-[32px]">
        <input type="radio" id="tab1" name="css-tabs" class="hidden" checked />
        <input type="radio" id="tab2" name="css-tabs" class="hidden" />
        <input type="radio" id="tab3" name="css-tabs" class="hidden" />
        <input type="radio" id="tab4" name="css-tabs" class="hidden" />

        <ul class="tabs flex w-full sm:justify-center overflow-x-auto">
          <li class="tab p-[10px] border-b-[4px] border-default">
            <label for="tab1" class="px-[24px] whitespace-nowrap">
              Perfumaria
            </label>
          </li>
          <li class="tab p-[10px]  border-b-[4px] border-default">
            <label for="tab2" class="px-[24px]  whitespace-nowrap">
              Corpo e Banho
            </label>
          </li>
          <li class="tab p-[10px]  border-b-[4px] border-default">
            <label for="tab3" class="px-[24px]  whitespace-nowrap">
              Maquiagem
            </label>
          </li>
          <li class="tab p-[10px]  border-b-[4px] border-default">
            <label for="tab4" class="px-[24px]  whitespace-nowrap">
              Kits e Presentes
            </label>
          </li>
        </ul>

        <div class="tab-content hidden">
          <ShelfItem products={products} title={title} />
        </div>

        <div class="tab-content hidden">
          <ShelfItem products={products} title={title} />
        </div>

        <div class="tab-content hidden">
          <ShelfItem products={products} title={title} />
        </div>

        <div class="tab-content hidden">
          <ShelfItem products={products} title={title} />
        </div>
      </div>
    </Container>
  );
}

export default TabbedShelf;
