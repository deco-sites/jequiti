import Button from "../ui/Button.tsx";
import Icon from "./Icon.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

// Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// TODO: Figure out how to add it via twind config.
const innerStyle = `
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="flex border-1 border-default ">
      <Button
        class="h-full w-[32px] rounded-0 text-1-500 disabled:text-1-500"
        variant="icon"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="Minus" width={16} height={16} strokeWidth={3} />
      </Button>
      <style dangerouslySetInnerHTML={{ __html: innerStyle }} />
      <input
        class="text-center text-1-500 text-body font-body bg-transparent outline-none disabled:opacity-50 flex-1"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
      />
      <Button
        class="h-full w-[32px] text-1-500 disabled:text-1-500 "
        variant="icon"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        <Icon id="Plus" width={16} height={16} strokeWidth={3} />
      </Button>
    </div>
  );
}

export default QuantitySelector;
