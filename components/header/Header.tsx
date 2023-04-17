import Modals from "deco-sites/jequiti/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "deco-sites/jequiti/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import ScrollTrackJS from "deco-sites/jequiti/islands/ScrollTrackJS.tsx";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight, headerHeightMobile } from "./constants.ts";
import { useId } from "preact/hooks";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  images?: Array<{ src?: Image; alt?: string; href?: string }>;
  imagesWidth?: number;
  imagesHeight?: number;
}

export interface Props {
  alerts?: Array<{
    text: string;
    href: string;
    children?: Array<{ text: string; href: string }>;
  }>;
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  // products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

function Header(
  {
    alerts,
    searchbar: _searchbar,
    // products,
    navItems = [],
    suggestions,
  }: Props,
) {
  const searchbar = { ..._searchbar, suggestions };
  const id = useId();
  return (
    <header class={`h-[${headerHeightMobile}] sm:h-[${headerHeight}]`}>
      <div
        id={id}
        class="bg-default fixed w-full z-50  border-b border-default"
      >
        <Alert alerts={alerts} />
        <Navbar items={navItems} searchbar={searchbar} />
        <ScrollTrackJS rootId={id} />
      </div>

      <Modals
        menu={{ items: navItems }}
        alerts={alerts}
        searchbar={searchbar}
      />
    </header>
  );
}

export default Header;
