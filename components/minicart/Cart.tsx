import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/jequiti/sdk/format.ts";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { sendAnalyticsEvent } from "deco-sites/std/commerce/sdk/sendAnalyticsEvent.ts";

import { useUI } from "deco-sites/jequiti/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";
import Icon from "../ui/Icon.tsx";

const CHECKOUT_URL = "https://jequiti.vtexcommercestable.com.br/checkout";

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6 text-interactive">
        <Icon id="ShoppingCart" width={64} height={84} />
        <Text variant="caption">Sua sacola está vazia :{"("}</Text>
      </div>
    );
  }

  return (
    <>
      {/* Cart Items */}
      <ul
        role="list"
        class="flex-grow-1 overflow-y-auto flex flex-col"
      >
        {cart.value.items.map((_, index) => (
          <li class=" border-default border-t">
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer>
        {/* Subtotal */}
        <div class="border-t-1 border-default py-4 flex flex-col gap-4">
          {discounts?.value && (
            <div class="flex justify-between items-center px-4">
              <Text variant="caption">Descontos</Text>
              <Text variant="caption">
                {formatPrice(discounts.value / 100, currencyCode!, locale)}
              </Text>
            </div>
          )}
          {/* <Coupon /> */}
        </div>
        {/* Total */}
        {total?.value && (
          <div class=" pt-4 flex flex-col justify-end items-end gap-2 mx-4">
            <div class="flex justify-between items-center w-full">
              <Text variant="body">Total</Text>
              <Text variant="heading-3">
                {formatPrice(total.value / 100, currencyCode!, locale)}
              </Text>
            </div>
            <div class="flex justify-center w-full border-default border-t pt-[16px]">
              <Text tone="subdued" variant="caption">
                Seu frete será calculado na próxima etapa
              </Text>
            </div>
          </div>
        )}
        <div class="px-4 pb-4">
          <a
            class="inline-block w-full my-[8px]"
            target="_blank"
            href={`${CHECKOUT_URL}?orderFormId=${cart.value!.orderFormId}`}
          >
            <Button
              data-deco="buy-button"
              class="w-full uppercase bg-[#7a206c]"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                sendAnalyticsEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total?.value
                      ? (total?.value - (discounts?.value ?? 0)) / 100
                      : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              Finalizar Compra
            </Button>
          </a>
          <Button onClick={() => displayCart.value = false} class=" w-full">
            Continuar comprando
          </Button>
        </div>
      </footer>
    </>
  );
}

export default Cart;
