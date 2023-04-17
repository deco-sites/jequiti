import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";

import Button from "./Button.tsx";

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
  description?: string;
  cta?: {
    href?: string;
    text?: string;
  };
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    mobile?: number;
    desktop?: number;
  };
  banner: Banner;
}

export default function BannerWithText({
  title,
  description,
  borderRadius,
  cta,
  banner,
}: Props) {
  return (
    <Container>
      <section class="flex w-full flex-col px-4 md:px-0 mx-auto sm:flex-row">
        <div class="w-full sm:w-[50%]">
          <a
            href={banner.href}
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
                src={banner.srcMobile}
                width={652}
                height={486}
              />
              <Source
                media="(min-width: 768px)"
                src={banner.srcDesktop ? banner.srcDesktop : banner.srcMobile}
                width={652}
                height={486}
              />
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={banner.srcMobile}
                alt={banner.alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        </div>
        <div class="w-full flex items-center sm:items-start flex-col sm:w-[50%] sm:p-[80px] gap-[25px]">
          {title &&
            (
              <div class="gap-[25px] md:gap-[25px] flex flex-col justify-center mt-6 sm:justify-start">
                <h2
                  class={"text-lg leading-[1] font-semibold uppercase text-center sm:text-left text-[37px]"}
                >
                  {title}
                </h2>
                {description && (
                  <Text class="text-center sm:text-left">{description}</Text>
                )}
              </div>
            )}

          {cta && (
            <a href={cta?.href}>
              <Button class="rounded-none">
                {cta?.text}
              </Button>
            </a>
          )}
        </div>
      </section>
    </Container>
  );
}
