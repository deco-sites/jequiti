import Container from "deco-sites/fashion/components/ui/Container.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Text from "deco-sites/fashion/components/ui/Text.tsx";

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
        <div
          class={`grid gap-[8px] grid-cols-${
            itemsPerLine && itemsPerLine.mobile ? itemsPerLine.mobile : "1"
          } md:grid-cols-${
            itemsPerLine && itemsPerLine.desktop
              ? itemsPerLine.desktop
              : banners.length
          }`}
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
        </div>
      </section>
    </Container>
  );
}
