import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /** @description text to be rendered on top of the image */
  subtitle?: string;
  image: {
    /** @description Image for big screens */
    desktop: LiveImage;
    /** @description Image for small screens */
    mobile?: LiveImage;
    /** @description image alt text */
    alt?: string;
  };
}

export interface Props {
  page?: LoaderReturnType<ProductListingPage | null>;
  banners?: Banner[];
}

function BannerUI({ banner }: { banner: Banner }) {
  const { title, subtitle, image } = banner;

  return (
    <Container>
      <div class="flex relative">
        <Picture
          preload
          class="col-start-1 col-span-1 row-start-1 row-span-1 hidden lg:inline"
        >
          <Source
            src={image.desktop}
            width={1330}
            height={300}
            media="(min-width: 767px)"
          />
          <img
            style={{ filter: "brightness(0.8)" }}
            class="w-full"
            src={image.desktop}
            alt={image.alt ?? title}
          />
        </Picture>

        <Container class="lg:absolute static bottom-0 flex flex-col items-center justify-center text-center w-full pb-[33px] pt-[18px] lg:(pb-0 pt-0)">
          <h1>
            <Text
              variant="heading-1"
              tone="default"
              class="uppercase lg:text-default-inverse text-[41px] lg:text-[32px]"
            >
              {title}
            </Text>
          </h1>
          <h2>
            <Text variant="heading-3" tone="default-inverse">
              {subtitle}
            </Text>
          </h2>
        </Container>
      </div>
    </Container>
  );
}

/**
 * TODO: run the matcher agains the true URL instead on the breadcrumb.
 * This way we can remove the need for a loader. This can be done on live@1.x
 */
function Banner({ page, banners = [] }: Props) {
  if (!page || page.breadcrumb.itemListElement.length === 0) {
    return null;
  }

  const { item: canonical } = page
    .breadcrumb
    .itemListElement
    .reduce((curr, acc) => curr.position > acc.position ? curr : acc);

  const matching = banners.find(({ matcher }) =>
    new RegExp(matcher).test(canonical)
  );

  if (!matching) {
    return null;
  }

  return <BannerUI banner={matching} />;
}

export default Banner;
