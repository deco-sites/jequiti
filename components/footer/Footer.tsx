import Icon, {
  AvailableIcons,
} from "deco-sites/jequiti/components/ui/Icon.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

import Newsletter from "./Newsletter.tsx";
import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type ImageItem = {
  image: ImageType;
  href?: string;
  alt?: string;
  width: number;
  height: number;
};

export type Item = StringItem | IconItem | ImageItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

const isImage = (item: Item): item is ImageItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.image === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <Text
      variant="caption"
      tone="default"
      class="uppercase text-[12px]"
    >
      {isIcon(item)
        ? (
          <div class="border-default border-1 py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : isImage(item)
        ? (
          <a href={item.href}>
            <Image
              class="p-6"
              src={item.image}
              alt={item.alt}
              width={item.width ?? 100}
              height={item.height ?? 40}
              loading="lazy"
            />
          </a>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </Text>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
  sections2?: Section[];
  socials?: Array<{ href: string; image: ImageType; alt: string }>;
}

function Footer({ sections = [], sections2 = [], socials = [] }: Props) {
  return (
    <footer class="w-full flex flex-col divide-y-1 divide-default mt-[30px]">
      <div>
        <div class="w-full bg-footer">
          <Container class="w-full bg-footer flex flex-col divide-y-1 divide-default">
            <FooterContainer>
              <Newsletter socials={socials} />
            </FooterContainer>
          </Container>
        </div>
        <Container>
          <FooterContainer>
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row gap-20">
              {sections.map((section) => (
                <li>
                  <div>
                    <Text
                      variant="heading-3"
                      tone="default"
                      class="text-[14px] uppercase"
                    >
                      {section.label}
                    </Text>

                    <ul
                      class={`flex ${
                        (isIcon(section.children[0]) ||
                            isImage(section.children[0]))
                          ? "flex-row"
                          : "flex-col"
                      } gap-2 pt-2 flex-wrap`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
              {sections.map((section) => (
                <li>
                  <Text variant="body" tone="default">
                    <details>
                      <summary>
                        {section.label}
                      </summary>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 px-2 pt-2`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </Text>
                </li>
              ))}
            </ul>
          </FooterContainer>
        </Container>
      </div>

      <div>
        <Container class="w-full">
          <FooterContainer class="flex  justify-between w-full">
            <ul class="flex flex-col lg:flex-row gap-20 justify-between w-full">
              {sections2.map((section) => (
                <li>
                  <div>
                    <Text
                      variant="heading-3"
                      tone="default"
                      class="text-[14px] uppercase text-center w-full flex justify-center"
                    >
                      {section.label}
                    </Text>

                    <ul
                      class={`flex ${
                        (isIcon(section.children[0]) ||
                            isImage(section.children[0]))
                          ? "flex-row"
                          : "flex-col"
                      } gap-2 pt-2 flex-wrap`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <li>
                <Text
                  class="flex items-center gap-1"
                  variant="body"
                  tone="default"
                >
                  Powered by{" "}
                  <a
                    href="https://www.deco.cx"
                    aria-label="powered by https://www.deco.cx"
                  >
                    <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
                  </a>
                </Text>
              </li>
            </ul>
          </FooterContainer>
        </Container>
      </div>

      <div>
        <Container class="w-full">
          <FooterContainer class="flex justify-center w-full override:(pt-[25px] px-[15px]) ">
            <Text
              class="flex items-center text-[12px]"
              variant="body"
              tone="default"
            >
              SS COMÉRCIO DE COSMÉTICOS E PRODUTOS DE HIGIENE PESSOAL LTDA -
              CNPJ: 07.278.350/0001-63 AV. DAS COMUNICAÇÕES, 927 - VILA JARAGUA,
              OSASCO - SP, 06276-906
            </Text>
          </FooterContainer>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
