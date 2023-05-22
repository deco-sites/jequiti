import HeaderButton from "deco-sites/jequiti/islands/HeaderButton.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/jequiti/components/search/Searchbar.tsx";
import Searchbar from "deco-sites/jequiti/components/search/Searchbar.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";

function Navbar({ items, searchbar, alerts }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  alerts?: Array<{
    text: string;
    href: string;
    children?: Array<{ text: string; href: string }>;
  }>;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`lg:hidden flex flex-col justify-between items-center h-[${navbarHeight}] border-b-1 border-default w-full  `}
      >
        <div class="flex flex-row justify-between items-center w-full  gap-1">
          <HeaderButton variant="menu" />
          <a
            href="https://institucional.jequiti.com.br/catalogo/"
            class="text-brand-primary flex items-center"
            aria-label="Catalogo"
          >
            <Icon id="Catalog" width={40} height={40} />
          </a>

          <a
            href="/"
            class={`flex-grow inline-flex justify-center items-center min-h-[${navbarHeight}]`}
            aria-label="Store logo"
          >
            <Icon id="Logo" width={150} height={42} />
          </a>

          <div class="flex gap-1">
            {/* <HeaderButton variant="search" /> */}
            <Button
              as="a"
              variant="icon"
              href="/login"
              aria-label="Log in"
              class="text-brand-primary flex items-center"
            >
              <Icon id="User" width={25} height={30} />
            </Button>
            <HeaderButton variant="cart" />
          </div>
        </div>
        <div class="bg-white w-full">
          <Searchbar {...searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex flex-col justify-between items-center w-full pl-2 pr-3 max-w-[1336px] mx-auto">
        <div class="flex flex-row items-center w-full py-[24px]">
          <div class="flex-1">
            <Searchbar {...searchbar} />
          </div>
          <div class="flex-none">
            <a
              href="/"
              aria-label="Store logo"
              class="block w-[150px]"
            >
              <Icon id="Logo" width={150} height={42} />
            </a>
          </div>
          <div class="flex-1 w-44 flex items-center justify-end gap-2">
            <Button
              as="a"
              variant="icon"
              href="/login"
              aria-label="Log in"
              class="text-1-500"
            >
              <Icon id="User" width={16} height={16} strokeWidth={0.4} />
              <Text variant="caption" tone="default">Minha Conta</Text>
            </Button>
            <Button
              as="a"
              variant="icon"
              href="/wishlist"
              aria-label="Wishlist"
              class="text-1-500"
            >
              <Icon
                id="Heart"
                width={20}
                height={20}
                strokeWidth={2}
                fill="none"
              />
              <Text variant="caption" tone="default">Favoritos</Text>
            </Button>
            <HeaderButton variant="cart" />
          </div>
        </div>
        <div class="flex-auto flex justify-between w-full micro-header-hidden">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
