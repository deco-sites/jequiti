import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "deco-sites/std/commerce/types.ts";
import { formatPrice } from "./format.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  const accPrice = acc.billingIncrement ? acc.billingIncrement : acc.price;
  const currPrice = curr.billingIncrement ? curr.billingIncrement : curr.price;

  if (accPrice > currPrice) {
    return curr;
  }

  if (accPrice < currPrice) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }
  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  priceCurrency: string,
  // sellingPrice: number,
) => {
  const { billingDuration, billingIncrement } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  // const withTaxes = sellingPrice < price;

  return `em até <strong>${billingDuration}x</strong> de <strong>R$ ${
    formatPrice(billingIncrement, priceCurrency!)
  }</strong>`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;

  return {
    price,
    listPrice: listPrice?.price,
    seller,
    installments: installment && price
      ? installmentToString(installment, aggregateOffer!.priceCurrency!)
      : null,
  };
};
