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
  subtitle?: string;
  emphasisText?: string;
  itemsPerPage?: number;
  images: Banner[];
  borderRadius: {
    mobile?: number;
    desktop?: number;
  };
}

function ProductShelf({
  title,
  subtitle,
  images,
  borderRadius,
  emphasisText,
}: Props) {
  const id = useId();

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Container class="flex flex-col py-10 px-0 sm:px-5">
      {title &&
        (
          <h2 class="text-center row-start-1 col-span-full inline-flex pb-[40px] justify-center">
            <Text variant="heading-2" class="text-[25px] lg:text-[37px]">
              {title}
            </Text>
          </h2>
        )}
      {(subtitle || emphasisText) && (
        <div class="flex flex-col justify-center px-[16px] gap-2">
          <span class="text-center leading-none inline-flex mx-auto text-lg text-2-500">
            {subtitle}
          </span>
          <span class="text-center leading-none inline-flex mx-auto text-lg font-bold text-2-500">
            {emphasisText}
          </span>
        </div>
      )}

      <div id={id} class="relative pt-4">
        <Slider
          class="gap-4"
          snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 sm:last:mr-0 mx-[-8px]"
          slidePerView={{ desktop: 4, tablet: 2, phone: 1.6 }}
        >
          {images.map((
            { href, srcMobile, srcDesktop, alt, title, linkText },
          ) => (
            <div class="mx-auto mx-2">
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
          <div class="absolute top-1/2 flex items-center justify-center z-10 col-start-1 row-start-2 absolute left-[15%] lg:translate-x-0   translate-y-[-50%] lg:translate-x-[-50%] lg:left-0 ">
            <Button
              class="h-9 w-9 lg:(h-12 w-12) rounded-full bg-white shadow-lg"
              // variant="icon"
              data-slide="prev"
              aria-label="Previous item"
            >
              <Icon
                class="text-1-500"
                size={20}
                id="ChevronLeft"
                strokeWidth={3}
              />
            </Button>
          </div>
          <div class="flex absolute top-1/2 items-center justify-center z-10 col-start-3 row-start-2 absolute right-[15%] translate-x-0 translate-y-[-50%] lg:translate-x-[50%] lg:right-0 ">
            <Button
              class="h-9 w-9 lg:(h-12 w-12) rounded-full bg-white shadow-lg"
              // variant="icon"
              data-slide="next"
              aria-label="Next item"
            >
              <Icon
                class="text-1-500"
                size={20}
                id="ChevronRight"
                strokeWidth={3}
              />
            </Button>
          </div>
        </>

        <SliderControllerJS rootId={id} />
      </div>
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
