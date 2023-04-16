import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  images?: Array<{ src?: string; alt?: string; href?: string }>;
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, images } = item;

  return (
    <li class="group flex items-center">
      <a href={href}>
        <Text
          class="group-hover:border-black border-solid border-b border-white"
          variant="menu"
        >
          {label}
        </Text>
      </a>

      {((children && children.length > 0) || (images && images.length > 0)) &&
        (
          <div
            class={`fixed invisible hover:visible group-hover:visible bg-default z-50 flex items-start justify-center gap-6 border-t-1 border-b-2 border-default w-screen mt-[${headerHeight}] max-w-[1336px] mx-auto translate-x-[-50%]`}
            style={{ top: "0px", left: "50%" }}
          >
            <ul class="flex items-start justify-center gap-6">
              {children?.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.href}>
                    <Text variant="menu">{node.label}</Text>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <Text variant="caption">{leaf.label}</Text>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {images?.map((image) =>
              image?.src && (
                <a href={image.href}>
                  <Image
                    class="p-6"
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={332}
                    loading="lazy"
                  />
                </a>
              )
            )}
          </div>
        )}
    </li>
  );
}

export default NavItem;
