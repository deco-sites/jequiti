import Image from "deco-sites/std/components/Image.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import QuantitySelector from "deco-sites/jequiti/components/ui/QuantitySelector.tsx";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/jequiti/sdk/format.ts";
import { sendAnalyticsEvent } from "deco-sites/std/commerce/sdk/sendAnalyticsEvent.ts";

interface Props {
  index: number;
}

function CartItem({ index }: Props) {
  const { loading, cart, updateItems, mapItemsToAnalyticsItems } = useCart();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const {
    imageUrl,
    skuName,
    sellingPrice,
    listPrice,
    name,
    quantity,
  } = item;

  const isGift = sellingPrice < 0.01;

  return (
    <div class="flex flex-row justify-between items-start gap-4 p-[16px]">
      <Image
        src={imageUrl}
        alt={skuName}
        width={72}
        height={72}
        class="object-cover object-center"
      />
      <div class="flex-grow">
        <div class="flex justify-between items-start">
          <Text variant="body" class="text-[14px] max-w-[180px]">
            {name}
          </Text>
          <Button
            onClick={() => {
              updateItems({ orderItems: [{ index, quantity: 0 }] });
              if (!cart.value) return;
              sendAnalyticsEvent({
                name: "remove_from_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: [item],
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
            disabled={loading.value || isGift}
            loading={loading.value}
            variant="icon"
          >
            <Icon id="Trash" width={20} height={20} strokeWidth={1} />
          </Button>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col justify-center gap-2">
            {!isGift && (
              <>
                <Text class="line-through" tone="subdued" variant="list-price">
                  {formatPrice(listPrice / 100, currencyCode!, locale)}
                </Text>
                <Text tone="price" variant="caption">
                  {formatPrice(sellingPrice / 100, currencyCode!, locale)}
                </Text>
              </>
            )}
          </div>
          <div class="mt-[5px] flex-1 max-w-[161px]">
            <QuantitySelector
              disabled={loading.value || isGift}
              quantity={quantity}
              onChange={(quantity) => {
                updateItems({ orderItems: [{ index, quantity }] });
                const quantityDiff = quantity - item.quantity;

                if (!cart.value) return;

                sendAnalyticsEvent({
                  name: quantityDiff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: {
                    items: mapItemsToAnalyticsItems({
                      items: [{
                        ...item,
                        quantity: Math.abs(quantityDiff),
                      }],
                      marketingData: cart.value.marketingData,
                    }),
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
