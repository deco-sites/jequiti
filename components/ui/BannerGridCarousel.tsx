import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { Slider } from "deco-sites/jequiti/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/jequiti/islands/SliderJS.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import ViewSendEvent from "deco-sites/jequiti/islands/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/jequiti/sdk/useOffer.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  title: string;
  linkText: string;
}

export interface Props {
  title: string;
  itemsPerPage?: number;
  images: Banner[];
  borderRadius: {
    mobile?: number;
    desktop?: number;
  };
}

function ProductShelf({
  title,
  images,
  borderRadius,
}: Props) {
  const id = useId();

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="grid grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr] py-10 px-0 sm:px-5"
    >
      {title &&
        (
          <h2 class="text-center row-start-1 col-span-full">
            <Text variant="heading-2">{title}</Text>
          </h2>
        )}

      <Slider
        class="col-span-full row-start-2 row-end-5"
        snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-[10px] sm:last:mr-0"
        slidePerView={4}
      >
        {images.map(({ href, srcMobile, srcDesktop, alt, title, linkText }) => (
          <div class="max-w-[300px] min-w-[300px] mx-auto">
            <a
              href={href}
              class={`overflow-hidden relative ${
                borderRadius?.mobile && `rounded-[${borderRadius.mobile}px]`
              } ${
                borderRadius?.desktop
                  ? `sm:rounded-[${borderRadius.desktop}px]`
                  : `sm:rounded-none`
              }`}
            >
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  src={srcMobile}
                  width={300}
                  height={480}
                />
                <Source
                  media="(min-width: 768px)"
                  src={srcDesktop ? srcDesktop : srcMobile}
                  width={300}
                  height={480}
                />
                <img
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={srcMobile}
                  alt={alt}
                  decoding="async"
                  loading="lazy"
                />
              </Picture>
              <div class="absolute bottom-0 pb-[20px] flex flex-col items-center w-full">
                <Text class="uppercase text-default-inverse font-bold text-[20px] pb-[13px]">
                  {title}
                </Text>
                <Text class="underline uppercase text-default-inverse font-bold text-[14px]">
                  {linkText} {">>"}
                </Text>
              </div>
            </a>
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

      {
        /* <ViewSendEvent
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
      /> */
      }
    </Container>
  );
}

export default ProductShelf;
