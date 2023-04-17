import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { Slider } from "deco-sites/jequiti/components/ui/Slider.tsx";

export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  title?: string;
  text?: string;
  date?: string;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
}

export interface Props {
  title?: string;
  /**
   * @description Default is 1 for mobile and all for desktop
   */
  itemsPerLine: {
    mobile?: number;
    desktop?: number;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    mobile?: number;
    desktop?: number;
  };
  banners: Banner[];
}

export default function BannnerGrid({
  title,
  itemsPerLine,
  borderRadius,
  banners = [],
}: Props) {
  return (
    <Container>
      <section class="w-full px-4 md:px-0 mx-auto">
        {title &&
          (
            <div class="py-6 md:py-0 md:pb-[40px] flex items-center justify-center mt-6">
              <h2 class={"text-lg  font-semibold uppercase "}>
                <Text variant="heading-2">
                  {title}
                </Text>
              </h2>
            </div>
          )}
        <Slider
          class="col-span-full row-start-2 row-end-5 flex items-stretch gap-[8px]"
          snap="snap-center sm:snap-start first:ml-6 sm:first:ml-0 last:mr-[10px] sm:last:mr-0 flex items-stretch"
          slidePerView={{
            desktop: 4,
            tablet: 3,
            phone: 1,
          }}
        >
          {banners.map((
            {
              href,
              srcMobile,
              srcDesktop,
              alt,
              title: bannerTitle,
              text: bannerText,
              date: bannerDate,
            },
          ) => (
            <div class="flex flex-col ">
              <a
                href={href}
                class={`overflow-hidden ${
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
                    width={334}
                    height={175}
                  />
                  <Source
                    media="(min-width: 768px)"
                    src={srcDesktop ? srcDesktop : srcMobile}
                    width={334}
                    height={175}
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
              </a>
              <div class="flex-grow flex  flex-col  ">
                <div>
                  <Text variant="caption" class="py-[8px]">{bannerDate}</Text>
                </div>
                <div>
                  <Text class="font-bold">{bannerTitle}</Text>
                </div>
                <div>
                  <Text>{bannerText}</Text>
                </div>
                <div class="flex flex-grow items-end my-[14px]">
                  <a
                    href={href}
                    class="uppercase font-bold underline text-[14px]"
                  >
                    Saiba mais {">>"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </Container>
  );
}
