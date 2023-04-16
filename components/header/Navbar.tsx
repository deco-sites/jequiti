import HeaderButton from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import HeaderSearchMenu from "deco-sites/fashion/islands/HeaderSearchMenu.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import Searchbar from "deco-sites/fashion/components/search/Searchbar.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-col justify-between items-center h-[${navbarHeight}] border-b-1 border-default w-full `}
      >
        <div class="flex flex-row justify-between items-center w-full px-2 gap-2">
          <HeaderButton variant="menu" />

          <a
            href="/"
            class={`flex-grow inline-flex justify-center items-center min-h-[${navbarHeight}]`}
            aria-label="Store logo"
          >
            <Icon id="Logo" width={150} height={42} />
          </a>

          <div class="flex gap-1">
            {/* <HeaderButton variant="search" /> */}
            <a href="/login" class="text-interactive">
              <Icon id="User" width={20} height={40} />
            </a>
            <HeaderButton variant="cart" />
          </div>
        </div>
        <div class="bg-white w-full ">
          <Searchbar {...searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col justify-between items-center w-full pl-2 pr-3 max-w-[1336px] mx-auto">
        <div class="md:flex flex-row items-center w-full py-[24px]">
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
              class="text-interactive"
            >
              <Icon id="User" width={16} height={16} strokeWidth={0.4} />
              <Text variant="caption" tone="default">Minha Conta</Text>
            </Button>
            <Button
              as="a"
              variant="icon"
              href="/wishlist"
              aria-label="Wishlist"
              class="text-interactive"
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
        <div class="flex-auto flex justify-between w-full pb-[16px]">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
