import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

// Lazy load a <dialog> polyfill.
if (IS_BROWSER && typeof window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
  header?: boolean;
};

const dialogStyles = {
  "sidebar-right": "animate-slide-left",
  "sidebar-left": "animate-slide-right",
  center: "animate-fade-in",
};

const sectionStyles = {
  "sidebar-right": "justify-end",
  "sidebar-left": "justify-start",
  center: "justify-center items-center",
};

const containerStyles = {
  "sidebar-right": "h-full w-full sm:(max-w-[400px])",
  "sidebar-left": "h-full w-full sm:(max-w-lg)",
  center: "",
};

const Modal = ({
  open,
  title,
  header = true,
  mode = "sidebar-right",
  onClose,
  children,
  loading,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open === false) {
      document.getElementsByTagName("body").item(0)?.removeAttribute(
        "no-scroll",
      );
      ref.current?.open === true && ref.current.close();
    } else if (open === true) {
      document.getElementsByTagName("body").item(0)?.setAttribute(
        "no-scroll",
        "",
      );
      ref.current?.open === false && ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  return (
    <dialog
      {...props}
      ref={ref}
      class={`bg-transparent p-0 m-0 max-w-full w-full max-h-full h-full backdrop ${
        dialogStyles[mode]
      } ${props.class ?? ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
      // @ts-expect-error - This is a bug in types.
      onClose={onClose}
    >
      <section
        class={`w-full h-full flex bg-transparent ${sectionStyles[mode]}`}
      >
        <div
          class={`bg-default flex flex-col max-h-full  ${
            containerStyles[mode]
          } w-[85%] min-w-[280px] relative`}
        >
          {header
            ? (
              <header class="flex p-[16px] justify-between items-center border-b-1 border-default bg-[#7a206c] ">
                <h1>
                  <Text
                    variant="heading-2"
                    class="text-white uppercase text-[16px]"
                  >
                    {title}
                  </Text>
                </h1>
                <Button variant="icon" onClick={onClose} class="text-white">
                  <Icon id="XMark" width={30} height={30} strokeWidth={2} />
                </Button>
              </header>
            )
            : (
              <div class="absolute right-0 top-0">
                <Button variant="icon" onClick={onClose} class="text-1-500">
                  <Icon id="XMark" width={30} height={30} strokeWidth={2} />
                </Button>
              </div>
            )}

          <div class="overflow-y-auto flex-grow flex flex-col">
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default Modal;
