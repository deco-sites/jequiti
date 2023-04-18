import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";

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
}

export interface Props {
  title?: string;
  subtitle?: string;
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
  link: {
    text: string;
    link: string;
  };
  banners: Banner[];
}

export default function InstagramGrid({
  title,
  subtitle,
  link,
  itemsPerLine,
  borderRadius,
  banners = [],
}: Props) {
  return (
    <Container>
      <section class="w-full px-0 mx-auto">
        {title &&
          (
            <div class="py-6 md:py-0 md:pb-[40px] flex flex-col items-center justify-center mt-6">
              <h2
                class={"text-lg font-semibold uppercase pb-[2rem] text-center"}
              >
                <Text variant="heading-2" class="text-[25px] lg:text-[37px]">
                  {title}
                </Text>
              </h2>
              {subtitle && <Text class="pb-[15px] text-center">{subtitle}
              </Text>}
              {link && (
                <a href={link.link} class="text-[#00aeb9] font-bold italic">
                  {link.text}
                </a>
              )}
            </div>
          )}
        <div
          class={`grid lg:grid-rows-2 grid-rows-1 grid-cols-2 lg:grid-cols-6 gap-[8px] nth-child-3-[display:none;] lg:nth-child-3-[grid-area:span_2/span_2;] `}
        >
          {banners.map(({ href, srcMobile, srcDesktop, alt }, index) => (
            <a
              href={href}
              class={`overflow-hidden ${
                borderRadius?.mobile && `rounded-[${borderRadius.mobile}px]`
              } ${
                borderRadius?.desktop
                  ? `sm:rounded-[${borderRadius.desktop}px]`
                  : `sm:rounded-none`
              } ${index > 4 ? "hidden lg:inline" : ""}`}
            >
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  src={srcMobile}
                  width={100}
                  height={100}
                />
                <Source
                  media="(min-width: 768px)"
                  src={srcDesktop ? srcDesktop : srcMobile}
                  width={250}
                  height={250}
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
          ))}
        </div>
      </section>
    </Container>
  );
}
