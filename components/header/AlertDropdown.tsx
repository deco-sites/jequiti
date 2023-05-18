import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { useState } from "preact/hooks";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
type Alert = {
  text: string;
  href: string;
  children?: Array<{ text: string; href: string }>;
};
export interface Props {
  alert: Alert;
}
export default function AlertDropdown(
  { alert: { text, href, children } }: Props,
) {
  const [dropDownVisibility, setDropDownVisibility] = useState(false);

  // console.log('headerProps alerts',children)
  function handleEnter() {
    setDropDownVisibility(true);
  }
  function handleLeave() {
    setDropDownVisibility(false);
  }
  if (children?.length) return null;
  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      class="flex items-center"
      style={text === "Consultor(a)"
        ? { flex: "1", justifyContent: "flex-end" }
        : {}}
    >
      <a href={href}>
        <Text
          class="flex items-center h-[44px] hover:text-price "
          variant="caption"
          tone="default"
        >
          {text}
        </Text>
      </a>
      <Icon
        id="ChevronDown"
        width={15}
        height={15}
        strokeWidth={3}
        class="ml-1"
      />

      {dropDownVisibility
        ? (
          <div class="absolute top-8 flex-col flex">
            <Icon
              id="Triangle"
              width={25}
              height={12}
              class={text === "Consultor(a)"
                ? "self-end mr-2 z-10"
                : "ml-2 z-10"}
            />
            <ul class="bg-white py-2 px-4 shadow-md	rounded 	">
              {children && children.map((child, index) => (
                <li key={index}>
                  <a
                    href={child.href}
                    class="font-caption text-caption text-1-500 flex items-center hover:text-price "
                  >
                    {child.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
        : null}
    </div>
  );
}
