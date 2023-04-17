import Modal from "deco-sites/jequiti/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import { useUI } from "deco-sites/jequiti/sdk/useUI.ts";

import type { Props as MenuProps } from "deco-sites/jequiti/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "deco-sites/jequiti/components/search/Searchbar.tsx";
import Loading from "deco-sites/jequiti/components/ui/Loading.tsx";

const Menu = lazy(() =>
  import("deco-sites/jequiti/components/header/Menu.tsx")
);
const Cart = lazy(() =>
  import("deco-sites/jequiti/components/minicart/Cart.tsx")
);
const Searchbar = lazy(() =>
  import("deco-sites/jequiti/components/search/Searchbar.tsx")
);

interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  alerts?: Array<{
    text: string;
    href: string;
    children?: Array<{ text: string; href: string }>;
  }>;
}

function Modals({ menu, searchbar, alerts }: Props) {
  const { displayCart, displayMenu, displaySearchbar } = useUI();

  return (
    <>
      <Modal
        title="Menu"
        mode="sidebar-left"
        loading="lazy"
        open={displayMenu.value}
        header={false}
        onClose={() => {
          displayMenu.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Menu {...menu} alerts={alerts} />
        </Suspense>
      </Modal>

      <Modal
        title="Buscar"
        mode="sidebar-right"
        loading="lazy"
        open={displaySearchbar.value &&
          window?.matchMedia("(max-width: 767px)")?.matches}
        onClose={() => {
          displaySearchbar.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Searchbar {...searchbar} />
        </Suspense>
      </Modal>

      <Modal
        title="Minha sacola"
        mode="sidebar-right"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Cart />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
