import type { JSX } from "preact";

type Props = JSX.IntrinsicElements["div"];

function Container({ class: _class = "", ...props }: Props) {
  return (
    <div
      class={`lg:(max-w-[1200px] w-[90%]) sm:mx-auto ${_class}`}
      {...props}
    />
  );
}

export default Container;
