import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

interface Props {
  rootId: string;
  behavior?: "smooth" | "auto";
  interval?: number;
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  "data-dot": "data-dot",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
  const delta = container.width / 1_000;

  if (element.right < container.left - delta) {
    return 0.0;
  }

  if (element.left > container.right + delta) {
    return 0.0;
  }

  if (element.left < container.left - delta) {
    return element.right - container.left + delta;
  }

  if (element.right > container.right + delta) {
    return container.right - element.left + delta;
  }

  return element.width;
};

// as any are ok in typeguard functions
const isHTMLElement = (x: Element): x is HTMLElement =>
  // deno-lint-ignore no-explicit-any
  typeof (x as any).offsetLeft === "number";

const setup = ({ rootId, behavior, interval }: Props) => {
  const element = document.getElementById(rootId);

  if (!rootId || !element) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { rootId },
    );

    return;
  }

  let a = false;

  globalThis?.addEventListener("scroll", () => {
    if (globalThis.scrollY >= 300 && !a) {
      console.log("passou");
      element.classList.add("teste");
      a = true;
    }
    if (globalThis.scrollY < 300) {
      a = false;
      element.classList.remove("teste");
    }
  });

  // const observer = new IntersectionObserver(
  //   (items) =>
  //     items.forEach((item) => {
  //       const index =
  //         Number(item.target.getAttribute(ATTRIBUTES["data-slider-item"])) || 0;
  //       const dot = dots?.item(index);

  //       if (item.isIntersecting) {
  //         dot?.setAttribute("disabled", "");
  //       } else {
  //         dot?.removeAttribute("disabled");
  //       }
  //     }),
  //   { threshold: THRESHOLD, root: slider },
  // );

  // items.forEach((item) => observer.observe(item));

  // for (let it = 0; it < (dots?.length ?? 0); it++) {
  //   dots?.item(it).addEventListener("click", () => goToItem(it));
  // }

  // prev?.addEventListener("click", onClickPrev);
  // next?.addEventListener("click", onClickNext);

  // const timeout = interval && setInterval(onClickNext, interval);

  // Unregister callbacks
  // return () => {
  //   for (let it = 0; it < (dots?.length ?? 0); it++) {
  //     dots?.item(it).removeEventListener("click", () => goToItem(it));
  //   }

  //   prev?.removeEventListener("click", onClickPrev);
  //   next?.removeEventListener("click", onClickNext);

  //   observer.disconnect();

  //   clearInterval(timeout);
  // };
};

function Slider({ rootId, behavior = "smooth", interval }: Props) {
  useEffect(() => setup({ rootId, behavior, interval }), [
    rootId,
    behavior,
    interval,
  ]);

  return <div data-scroll-track-js />;
}

export default Slider;
