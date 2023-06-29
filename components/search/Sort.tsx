import { useMemo } from "preact/hooks";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div class="relative flex">
      <div class="absolute lg:static inset-0 pointer-events-none flex bg-white items-center justify-center gap-[5px]">
        <Icon
          id="SortList"
          width={20}
          height={20}
          strokeWidth={1}
          class="lg:hidden"
        />{" "}
        <Text
          variant="caption"
          class="font-bold text-1-500 md:(font-bold text-default text-lg) text-[#7a206c]"
        >
          Ordenar por:
        </Text>
      </div>
      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="w-min h-[36px] px-1 rounded m-2 text-button font-button text-1-500 hover:bg-hover cursor-pointer outline-none font-normal "
      >
        {sortOptions.map(({ value, label }) => (
          <option
            key={value}
            value={value}
            selected={value === sort}
          >
            <Text variant="caption">
              {label}
            </Text>
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sort;
