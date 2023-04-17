import Image from "deco-sites/std/components/Image.tsx";
import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { Slider } from "deco-sites/jequiti/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

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
  return (
    <Container class="grid grid-cols-1 grid-rows-[48px_1fr] py-10">
      <h2 class="text-center">
        <Text variant="heading-2" class="uppercase">{title}</Text>
      </h2>

      <Slider
        class=""
        snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
        slidePerView={{
          desktop: 6,
          tablet: 4,
          phone: 2.7,
        }}
      >
        {highlights.map(({ href, src, alt, label }) => (
          <a
            href={href}
            class="flex flex-col gap-[4px] items-center"
          >
            <Image
              class="rounded-full"
              src={src}
              alt={alt}
              width={120}
              height={120}
            />
            <Text variant="body">{label}</Text>
          </a>
        ))}
      </Slider>
    </Container>
  );
}

export default Highlights;
