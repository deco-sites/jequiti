import { Children } from "preact/compat";
import type { JSX } from "preact";

type SliderProps = JSX.IntrinsicElements["ul"] & {
  snap?: string;
  slidePerView?: number | { desktop: number; tablet: number; phone: number };
};

function responsiveValues(
  value: number | { desktop: number; tablet: number; phone: number },
) {
  if (typeof value === "number") {
    return { desktop: value, tablet: value, phone: value };
  } else return value;
}

export function Slider({
  children,
  snap = "scroll-snap-center",
  class: _class = "gap-6 scrollbar-none",
  slidePerView = 1,
  ...props
}: SliderProps) {
  const { tablet, desktop, phone } = responsiveValues(slidePerView);

  return (
    <ul
      data-slider
      class={`flex grid-flow-col items-center overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-none ${_class}`}
      {...props}
    >
      {Children.map(children, (child, index) => (
        <li
          data-slider-item={index}
          class={`${snap} min-w-[calc(100%/${phone})] sm:min-w-[calc(100%/${tablet})] lg:min-w-[calc(100%/${desktop})]`}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}

type SliderDotsProps = JSX.IntrinsicElements["ol"];

export function SliderDots({ children, class: _class }: SliderDotsProps) {
  return (
    <ol
      class={`flex items-center justify-center overflow-auto overscroll-contain snap-x snap-mandatory ${_class}`}
    >
      {Children.map(children, (child, index) => (
        <li class="scroll-snap-center">
          <button
            data-dot={index}
            aria-label={`go to slider item ${index}`}
            class="focus:outline-none group"
          >
            {child}
          </button>
        </li>
      ))}
    </ol>
  );
}
