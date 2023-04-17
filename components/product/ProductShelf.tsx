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
      class="grid grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr] py-10 px-0 sm:px-5"
    >
      <h2 class="text-center row-start-1 col-span-full">
        <Text variant="heading-2" class="uppercase text-[26px] sm:text-[37px]">
          {title}
        </Text>
      </h2>

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
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <div class="absolute right-1/2 bg-interactive-inverse rounded-full border-default border">
            <Button variant="icon" data-slide="prev" aria-label="Previous item">
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Button>
          </div>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <div class="absolute left-1/2 bg-interactive-inverse rounded-full border-default border">
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
    </Container>
  );
}

export default ProductShelf;
