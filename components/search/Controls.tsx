import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import Filters from "deco-sites/jequiti/components/search/Filters.tsx";
import Sort from "deco-sites/jequiti/components/search/Sort.tsx";
import Modal from "deco-sites/jequiti/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import useIsMobile from "../hooks/useIsMobile.tsx";
type Dispatch<A> = (value: A) => void;
type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    grid: boolean;
    setGrid: Dispatch<boolean>;
  };

function SearchControls(
  {
    filters,
    breadcrumb,
    displayFilter,
    sortOptions,
    grid,
    setGrid,
  }: Props,
) {
  const open = useSignal(false);
  const breadcrumbLength = breadcrumb.itemListElement.length - 1;
  const selectedItems = filters.map((filter) => {
    if (Array.isArray(filter.values)) {
      const selected = filter.values.filter((value) => value.selected);
      return selected;
    }
    return;
  }, []).filter((item) => item?.length).flat();
  const mobile = useIsMobile();
  return (
    <div class="flex flex-col justify-between p-1 mb-[25px] border-y-1 sm:(p-0 gap-4 flex-row h-[60px] )">
      <div class="flex flex-row w-full items-center justify-between border-default sm:(gap-4 border-none)">
        <div class="hidden lg:flex gap-[5px]  flex-1">
          <span class="font-extrabold text-lg ">
            Filtrado por:
          </span>

          {selectedItems.map((item) => (
            <div class="bg-[#e3e3e3] hover:text-[#7a206c] cursor-pointer px-2 flex items-center h-6 text-sm">
              {item?.label}{" "}
              <a href={item?.url} class="block rotate-45 text-3xl ml-1">
                +
              </a>
            </div>
          ))}

          {selectedItems.length > 0 &&
            (
              <a
                href={breadcrumb.itemListElement[breadcrumbLength].item}
                class="text-sm bg-[#7a206c] text-white px-3 flex items-center hover:bg-white	hover:text-[#7a206c] border-[#7a206c] border-2 h-6"
              >
                Limpar tudo
              </a>
            )}
        </div>
        <Button
          class={displayFilter
            ? "font-bold text-1-500 lg:(font-normal text-default )"
            : "lg:hidden"}
          variant="tertiary"
          onClick={() => {
            open.value = true;
          }}
        >
          <Icon id="Funnel" width={16} height={16} />
          <span class="text-[#7a206c] ">
            Filtrar
          </span>
        </Button>
        <div>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
        <button
          onClick={() => setGrid(!grid)}
          class="flex focus:outline-none font-extrabold gap-1	 text-lg"
        >
          {!mobile ? "Visualização:" : ""}
          <Icon
            id={!mobile ? "GridDesk" : "GridMobile"}
            width={26}
            height={25}
            fill={!grid ? "#7a206c" : "#d1d1d1"}
          />
          <Icon
            id={!mobile ? "GridDesk2" : "GridMobile2"}
            width={26}
            height={25}
            fill={grid ? "#7a206c" : "#d1d1d1"}
          />
        </button>
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
