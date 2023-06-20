import {
  Options as UseAddToCartProps,
} from "deco-sites/jequiti/sdk/useAddToCart.ts";
import { useSignal } from "@preact/signals";
import QuantitySelector from "deco-sites/jequiti/islands/QuantitySelector.tsx";
import AddToCartButton from "deco-sites/jequiti/islands/AddToCartButton.tsx";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  text?: string;
  variant?: "secondary" | "icon" | "primary" | "tertiary";
}

function QuantityAddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    text = "Adicionar à Sacola",
    variant = "secondary",
  }: Props,
) {
  const quantity = useSignal(1);

  return (
    <div class="flex w-full gap-2 ">
      <QuantitySelector
        disabled={price === 0}
        quantity={quantity.value}
        onChange={(newQuantity) => {
          quantity.value = newQuantity;
        }}
      />
      <AddToCartButton
        skuId={skuId}
        sellerId={sellerId}
        price={price ?? 0}
        discount={discount}
        name={name}
        productGroupId={productGroupId}
        quantity={quantity.value}
        text={text}
        variant={variant}
      />
    </div>
  );
}

export default QuantityAddToCartButton;
