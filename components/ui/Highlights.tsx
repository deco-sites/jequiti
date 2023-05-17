import Image from "deco-sites/std/components/Image.tsx";
import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { Slider } from "deco-sites/jequiti/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/jequiti/islands/SliderJS.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";
import { useId } from "preact/hooks";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  label: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
}

function Highlights({ highlights = [], title }: Props) {
  const id = useId();
  return (
    <Container class="flex flex-col py-10" id={id}>
      <h2 class="text-center">
        <div class="text-heading-4 lg:text-[37px] pb-8 font-bold text-1-500 leading-7">
          {title}
        </div>
      </h2>
      <div class="relative">
        <Slider
          class="gap-4"
          snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
          slidePerView={{ desktop: 6, tablet: 4, phone: 3.1 }}
        >
          {highlights.map(({ href, src, alt, label }) => (
            <a href={href} class="flex flex-col gap-[4px] items-center">
              <Image
                class="rounded-full"
                src={src}
                alt={alt}
                width={120}
                height={120}
              />
              <div class="font-bold text-brand-primary text-md">{label}</div>
            </a>
          ))}
        </Slider>
        <div class="absolute top-1/2 flex items-center justify-center z-10 lg:translate-x-0  translate-y-[-50%] lg:translate-x-[-50%] ">
          <Button
            class="h-12 w-12 rounded-full bg-white shadow-lg"
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
        <div class="flex absolute top-1/2 items-center right-0 justify-center z-10 translate-y-[-50%] lg:translate-x-[50%]">
          <Button
            class="h-12 w-12 rounded-full bg-white shadow-lg"
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
      </div>
      <SliderControllerJS rootId={id} />
    </Container>
  );
}

export default Highlights;
