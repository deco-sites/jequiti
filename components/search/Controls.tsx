import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import Filters from "deco-sites/jequiti/components/search/Filters.tsx";
import Sort from "deco-sites/jequiti/components/search/Sort.tsx";
import Modal from "deco-sites/jequiti/components/ui/Modal.tsx";
import Breadcrumb from "deco-sites/jequiti/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";

import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <div class="flex flex-col justify-between mb-4 p-4 sm:(mb-0 p-0 gap-4 flex-row h-[53px] border-b-1)">
      <div class="flex flex-row w-full items-center justify-between border-b-1 border-default sm:(gap-4 border-none)">
        <div class="hidden sm:flex gap-[5px]">
          Filtrado por:
          {filters.map((filter) => {
            if (Array.isArray(filter.values)) {
              const selected = filter.values.filter((value) => value.selected);
              return selected;
            }
            return;
          }, []).filter((item) => item?.length).flat().map((item) => (
            <div class="bg-[#e3e3e3] py-[2px] px-[4px]">
              {item?.label} <a href={item?.url}>X</a>
            </div>
          ))}
        </div>
        <Button
          class={displayFilter ? "" : "sm:hidden"}
          variant="tertiary"
          onClick={() => {
            open.value = true;
          }}
        >
          <Icon id="FilterList" width={16} height={16} />
          Filtrar
        </Button>
        <div>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>

      <Modal
        loading="lazy"
        title="Filtrar"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </div>
  );
}

export default SearchControls;
