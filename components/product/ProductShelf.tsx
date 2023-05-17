import ProductCard from "deco-sites/jequiti/components/product/ProductCard.tsx";
import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { Slider } from "deco-sites/jequiti/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/jequiti/islands/SliderJS.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type {
  Product,
  ProductDetailsPage,
} from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/jequiti/islands/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/jequiti/sdk/useOffer.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="flex flex-col py-10 px-0 sm:px-5"
    >
      <h2 class="text-center">
        <div class="font-bold text-[37px] text-default pb-[30px]">
          {title}
        </div>
      </h2>
      <div class="relative">
        <Slider
          class="override:(items-stretch) gap-4 "
          snap="snap-center sm:snap-start last:mr-[10px] sm:last:mr-0 flex items-stretch mx-[-8px]"
          slidePerView={{ desktop: 4, tablet: 3, phone: 1.25 }}
        >
          {products?.map((product) => (
            <div class="flex flex-1 max-w-[270px] sm:max-w-[320px] flex items-stretch mx-2">
              <ProductCard product={product} itemListName={title} />
            </div>
          ))}
        </Slider>
        <div class="absolute top-1/2 flex items-center justify-center z-10 lg:translate-x-0  translate-y-[-50%] lg:translate-x-[-50%] ">
          <Button
            class="h-12 w-12 rounded-full bg-white shadow-lg"
            data-slide="prev"
            aria-label="Previous item"
          >
            <Icon
              class="text-default"
              size={20}
              id="ChevronLeft"
              strokeWidth={3}
            />
          </Button>
        </div>
        <div class="flex absolute top-1/2 items-center right-0 justify-center z-10 translate-y-[-50%] lg:translate-x-[50%]">
          <Button
            class="h-12 w-12 rounded-full bg-white shadow-lg"
            data-slide="next"
            aria-label="Next item"
          >
            <Icon
              class="text-default"
              size={20}
              id="ChevronRight"
              strokeWidth={3}
            />
          </Button>
        </div>
      </div>

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
    </Container>
  );
}

export default ProductShelf;
