import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import Input from "deco-sites/jequiti/components/ui/Input.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import { formatPrice } from "deco-sites/jequiti/sdk/format.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import type {
  SimulationOrderForm,
  SKU,
  Sla,
} from "deco-sites/std/packs/vtex/types.ts";

export interface Props {
  items: Array<SKU>;
}

const handleShippingTime = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContentError() {
  return (
    <div class="p-2">
      <span>CEP inválido</span>
    </div>
  );
}

function ShippingContent(
  { simulation, locale, currencyCode }: {
    simulation: SimulationOrderForm;
    locale: string;
    currencyCode: string;
  },
) {
  if (!simulation.logisticsInfo?.length) {
    return <ShippingContentError />;
  }

  const methods = simulation.logisticsInfo.reduce<Sla[]>(
    (initial, logistic) => {
      return [...initial, ...logistic.slas];
    },
    [],
  );

  if (!methods.length) {
    return <ShippingContentError />;
  }

  return (
    <ul class="flex flex-col gap-[4px] p-4 rounded-[4px] border-default border-y">
      {methods.map((method) => (
        <li class="flex justify-between items-center">
          <Text variant="body" class="text-button text-center">
            {method.name}
          </Text>
          <Text variant="body" tone="subdued" class="text-button">
            Em até {handleShippingTime(method.shippingEstimate)}
          </Text>
          <Text
            variant="body"
            tone="subdued"
            class="text-base text-right"
          >
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode!, locale)
            )}
          </Text>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);

  const { simulate, cart } = useCart();

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  const handleSimulation = useCallback(() => {
    const simulationData = {
      items: items,
      postalCode: postalCode.value,
      country: cart.value?.storePreferencesData.countryCode || "BRA",
    };

    if (postalCode.value.length == 8) {
      loading.value = true;
      simulate(simulationData)
        .then((result) => {
          simulateResult.value = result;
          loading.value = false;
        });
    }
  }, []);

  return (
    <div class="flex flex-col gap-2 w-full align-center">
      <div class="flex flex-col">
        <Text>Calcular o valor do frete:</Text>
      </div>
      <div>
        <form
          class="flex  items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSimulation();
          }}
        >
          <label htmlFor="postal" class="whitespace-nowrap ">
            Digite seu CEP
          </label>
          <Input
            as="input"
            type="text"
            id="postal"
            variant="input"
            class="p-2 rounded-none border-1 border-default w-full ml-2 bg-[#e5e5e5]"
            onChange={(e: { currentTarget: { value: string } }) => {
              postalCode.value = e.currentTarget.value;
            }}
            value={postalCode.value}
            maxlength={8}
          >
          </Input>
          <Button
            type="submit"
            loading={loading.value}
            class="rounded-none disabled:bg-[#d1d1d1] text-white uppercase"
            disabled={postalCode.value.length < 8}
          >
            ok
          </Button>
        </form>
      </div>
      <div class="flex justify-end">
        <a
          href="//buscacepinter.correios.com.br/app/endereco/index.php?t"
          class="underline"
        >
          Não sei meu Cep
        </a>
      </div>
      <div>
        {simulateResult.value && (
          <div>
            <ShippingContent
              simulation={simulateResult.value}
              locale={locale}
              currencyCode={currencyCode}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ShippingSimulation;
