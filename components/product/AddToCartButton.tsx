import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/jequiti/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  text?: string;
  variant?: "secondary" | "icon" | "primary" | "tertiary";
}

function AddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity = 1,
    text = "Adicionar à Sacola",
    variant = "secondary",
  }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity,
  });

  return (
    <Button
      data-deco="add-to-cart"
      variant={variant}
      {...props}
      class="w-full rounded-none uppercase"
    >
      {text}
    </Button>
  );
}

export default AddToCartButton;
