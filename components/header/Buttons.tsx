import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import { useUI } from "deco-sites/jequiti/sdk/useUI.ts";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { sendAnalyticsEvent } from "deco-sites/std/commerce/sdk/sendAnalyticsEvent.ts";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={20} height={20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="open menu"
      class="text-brand-primary"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={38} height={38} strokeWidth={0.01} />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
  const dataDeco = displayCart.value ? {} : { "data-deco": "open-cart" };
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  return (
    <Button
      {...dataDeco}
      variant="icon"
      class="relative text-brand-primary"
      aria-label="open cart"
      disabled={loading.value}
      onClick={() => {
        displayCart.value = true;
        sendAnalyticsEvent({
          name: "view_cart",
          params: {
            currency: cart.value ? currencyCode! : "",
            value: total?.value
              ? (total?.value - (discounts?.value ?? 0)) / 100
              : 0,

            items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
          },
        });
      }}
    >
      <Icon
        id="ShoppingCart"
        width={20}
        height={20}
        strokeWidth={2}
        class="hidden sm:inline"
      />
      <Icon
        id="ShoppingCart"
        width={28}
        height={44}
        strokeWidth={2}
        class="sm:hidden"
      />
      <Text variant="caption" class="hidden sm:inline">Sacola</Text>
      {totalItems && (
        <span class="absolute text-[9px] left-0 top-0 rounded-full bg-[#00aeb9] text-white w-4 h-4 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  );
}

function HeaderButton({ variant }: { variant: "cart" | "search" | "menu" }) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default HeaderButton;
