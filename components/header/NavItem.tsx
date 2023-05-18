import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  images?: Array<{ src?: string; alt?: string; href?: string }>;
  imagesWidth?: number;
  imagesHeight?: number;
}

function NavItem({ item }: { item: INavItem }) {
  const {
    href,
    label,
    children,
    images,
    imagesWidth = 360,
    imagesHeight = 248,
  } = item;

  return (
    <li class="group flex items-center pb-[16px]">
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
            class={`fixed invisible hover:visible group-hover:visible bg-default z-50 flex items-start gap-6 border-t-1 border-b-2 border-default w-screen mt-[${headerHeight}] max-w-[1336px] mx-auto translate-x-[-50%] justify-between`}
            style={{ top: "0px", left: "50%" }}
          >
            <ul class="flex items-start justify-center gap-6">
              {children?.map((node) => (
                <li class="p-6">
                  <a href={node.href}>
                    <Text
                      variant="menu"
                      class="hover:text-1-500 override:(font-bold) text-[16px]"
                    >
                      {node.label}
                    </Text>
                  </a>

                  <ul class="flex flex-col gap-1">
                    {node.children?.map((leaf) => (
                      <li>
                        <a href={leaf.href}>
                          <Text
                            variant="caption"
                            class=" text-[16px] hover:text-1-500 "
                          >
                            {leaf.label}
                          </Text>
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
                    width={imagesWidth}
                    height={imagesHeight}
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
