import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/jequiti/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/jequiti/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Container from "./Container.tsx";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const { alt, mobile, desktop, action } = image;

  return (
    <div class="relative max-h-[364px] sm:max-h-[496px] w-[100%] overflow-y-hidden">
      <a href={action?.href ?? "#"} aria-label={action?.label}>
        <Picture class="w-full" preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={360}
            height={364}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1128}
            height={420}
          />
          <img
            class="object-cover w-full sm:h-full"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
        {action && (
          <div
            class="absolute top-0 bottom-0 m-auto left-0 right-0 sm:right-auto sm:left-[12%] max-h-min max-w-[235px] flex flex-col gap-4 bg-hover-inverse p-4 rounded"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <Text variant="heading-1" tone="default-inverse">
              {action.title}
            </Text>
            <Text variant="heading-3" tone="default-inverse">
              {action.subTitle}
            </Text>
            <Button variant="secondary">{action.label}</Button>
          </div>
        )}
      </a>
    </div>
  );
}

function ProgressiveDots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }`,
        }}
      >
      </style>
      <SliderDots class="absolute bottom-0 right-0  left-0 gap-[8px] z-10 ">
        {images?.map((_) => (
          <div class="pt-[26px]">
            <div class={"bg-[#d1d1d1] w-6 h-1 group-disabled:bg-[#00aeb9]"} />
          </div>
        ))}
      </SliderDots>
    </>
  );
}

function Controls() {
  return (
    <>
      <div class="lg:flex hidden absolute top-1/2 flex items-center justify-center z-10 col-start-1 row-start-2 absolute lg:translate-x-0   translate-y-[-50%] lg:translate-x-[-50%] ">
        <Button
          class="h-12 w-12 rounded-full bg-white"
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
      <div class="lg:flex hidden flex absolute top-1/2 items-center justify-center z-10 col-start-3 row-start-2 absolute right-0 translate-x-0 translate-y-[-50%] lg:translate-x-[50%]">
        <Button
          class="h-12 w-12 rounded-full bg-white"
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
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();
  console.log("interval", interval);
  return (
    <Container>
      <div id={id} class="flex relative">
        <Slider class=" row-span-full scrollbar-none pb-[30px]">
          {images?.map((image, index) => (
            <BannerItem image={image} lcp={index === 0 && preload} />
          ))}
        </Slider>

        <Controls />

        <ProgressiveDots images={images} interval={interval} />

        <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
      </div>
    </Container>
  );
}

export default BannerCarousel;
