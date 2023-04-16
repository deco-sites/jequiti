import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
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
      class={`flex flex-wrap gap-2 ${flexDirection} absolute z-10 bg-[#eee] p-[24px]`}
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
            <input type="checkbox" checked={selected} class="hidden" />
            <Text variant="caption">{label}</Text>
            <Text tone="subdued" variant="caption">
              ({quantity})
            </Text>
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
        .map((filter) => (
          <details class="flex flex-col gap-4">
            <summary>
              <Text variant="body">{filter.label}</Text>
            </summary>
            <FilterValues {...filter} />
          </details>
        ))}
    </ul>
  );
}

export default Filters;
