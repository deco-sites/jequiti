import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Avatar from "deco-sites/jequiti/components/ui/Avatar.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";
interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul
      class={`flex flex-col gap-2 ${flexDirection} absolute z-10 bg-[#eee] p-[24px] max-h-48 overflow-y-scroll`}
    >
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "cor") {
          return (
            <a href={url}>
              <Avatar
                // deno-lint-ignore no-explicit-any
                content={value as any}
                disabled={selected}
                variant="color"
              />
            </a>
          );
        }

        if (key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={label}
                disabled={selected}
                variant="abbreviation"
              />
            </a>
          );
        }

        return (
          <a href={url} class="flex items-center gap-2">
            <span
              class={`custom-checkbox ${selected ? "checked" : ""}`}
            >
              {selected
                ? (
                  <span class={"checkmark"}>
                  </span>
                )
                : null}
            </span>
            <Text variant="caption">{label}</Text>
          </a>
        );
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex w-full gap-6 justify-between relative">
      {filters
        .filter(isToggle)
        .map((filter, index) => (
          <details
            key={index}
            class="flex flex-col gap-4 detail-chevron cursor-pointer"
          >
            <summary class="no-marker flex items-center">
              <Text variant="body">{filter.label}</Text>
              <Icon
                id="ChevronDown"
                width={15}
                height={15}
                strokeWidth={3}
                class={"ml-2 z-10 closed-chevron"}
              />
              <Icon
                id="ChevronUp"
                width={15}
                height={15}
                strokeWidth={3}
                class={"ml-2 z-10 opened-chevron"}
              />
            </summary>
            <FilterValues {...filter} />
          </details>
        ))}
    </ul>
  );
}

export default Filters;
