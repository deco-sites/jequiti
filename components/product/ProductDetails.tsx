import { useId } from "preact/hooks";
import AddToCartButton from "deco-sites/jequiti/islands/AddToCartButton.tsx";
import ShippingSimulation from "deco-sites/jequiti/islands/ShippingSimulation.tsx";
import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Breadcrumb from "deco-sites/jequiti/components/ui/Breadcrumb.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/jequiti/components/ui/Slider.tsx";
import SliderJS from "deco-sites/jequiti/components/ui/SliderJS.tsx";
import { useOffer } from "deco-sites/jequiti/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/jequiti/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/jequiti/islands/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import ProductImageZoom from "deco-sites/jequiti/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 600;
const HEIGHT = 600;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    brand,
    productID,
    offers,
    name: skuName,
    gtin,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const { name } = isVariantOf ?? {};

  const isGift = (price ?? 0) < 0.01;
  const discount = (listPrice ?? 0) - (price ?? 0);

  return (
    <>
      {/* Code and name */}
      <div>
        <Text>{brand}</Text>
        <h1>
          <Text variant="heading-2">{name}</Text>
        </h1>
        <div>
          <Text tone="subdued" variant="caption">
            Cod. {gtin}
          </Text>
        </div>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          <Text
            class="line-through"
            tone="subdued"
            variant="list-price"
          >
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </Text>
          <Text tone="price" variant="heading-3">
            {formatPrice(price, offers!.priceCurrency!)}
          </Text>
          <Text tone="subdued" variant="caption">
            {installments}
          </Text>
        </div>
        <div>
          Você está economizando {formatPrice(discount, offers!.priceCurrency!)}
        </div>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="fixed bottom-0 right-0 mt-4 sm:mt-10 flex flex gap-2 bg-white w-full p-[8px] sm:(py-0 px-0 static)">
        {seller && (
          <>
            <QuantitySelector
              disabled={isGift}
              quantity={0}
              onChange={(quantity) => {
                // updateItems({ orderItems: [{ index, quantity }] });
                // const quantityDiff = quantity - item.quantity;
              }}
            />
            <AddToCartButton
              skuId={productID}
              sellerId={seller}
              price={price ?? 0}
              discount={price && listPrice ? listPrice - price : 0}
              name={product.name ?? ""}
              productGroupId={product.isVariantOf?.productGroupID ?? ""}
            />
          </>
        )}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(product.sku),
            quantity: 1,
            seller: seller ?? "1",
          }]}
        />
      </div>
      <ViewSendEvent
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const id = `product-image-gallery:${useId()}`;
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    image: images = [],
    isVariantOf,
    productID,
    name,
    description,
    offers,
  } = product;
  const { price, listPrice } = useOffer(offers);

  const discount = price && listPrice ? listPrice - price : 0;
  const discountPercentage = Math.ceil(
    discount && listPrice ? discount * 100 / (listPrice ?? 0) : 0,
  );

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <div class="flex flex-col px-[8px] sm:py-0">
        {/* Breadcrumb */}
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement}
        />
        <div
          class={`flex flex-col sm:flex-row sm:( max-h-[calc(${
            (HEIGHT / WIDTH).toFixed(2)
          }*40vw)] gap-[50px]) py-[30px] `}
        >
          <div
            id={id}
            class="w-full flex flex-col sm:(grid grid-cols-[63px_1fr] w-[60%]) gap-[16px]"
          >
            {/* Dots */}
            <SliderDots class=" gap-2 override:(justify-start hidden) overflow-auto px-4 sm:(px-0 flex-col flex)">
              {images.map((img, _) => (
                <Image
                  style={{ aspectRatio: ASPECT_RATIO }}
                  class="group-disabled:(border-interactive) border rounded min-w-[63px]"
                  width={63}
                  height={63}
                  src={img.url!}
                  alt={img.alternateName}
                />
              ))}
            </SliderDots>

            {/* Image Slider */}
            <div>
              <div class="relative grid max-w-[600px]">
                <Slider class="gap-6">
                  {images.map((img, index) => (
                    <Image
                      class={`scroll-snap-center max-w-[100%] mx-auto`}
                      sizes="(max-width: 640px) 100vw, 40vw"
                      style={{ aspectRatio: ASPECT_RATIO }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      // Preload LCP image for better web vitals
                      preload={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  ))}
                </Slider>

                <div class="absolute  left-2 top-1/2  bg-interactive-inverse rounded-full border-default border">
                  <Button
                    variant="icon"
                    data-slide="prev"
                    aria-label="Previous"
                  >
                    <Icon size={20} id="ChevronLeft" strokeWidth={3} />
                  </Button>
                </div>
                <div class="absolute right-2 top-1/2 bg-interactive-inverse rounded-full border-default border">
                  <Button variant="icon" data-slide="next" aria-label="Next">
                    <Icon size={20} id="ChevronRight" strokeWidth={3} />
                  </Button>
                </div>

                <SliderDots class="w-full absolute bottom-0 gap-2 override:(justify-center) overflow-auto px-4 sm:(px-0 flex)">
                  {images.map((img, _) => (
                    <div
                      style={{ aspectRatio: ASPECT_RATIO }}
                      class="group-disabled:(border-interactive) border rounded-full min-w-[10px] sm:min-w-[10px]"
                    />
                  ))}
                </SliderDots>

                <div class="absolute top-0 left-0 bg-[#d13482] px-[7px] py-[4px] leading-none">
                  <Text
                    variant="caption"
                    class="text-white font-bold text-[14px]"
                  >
                    -{discountPercentage}%
                  </Text>
                </div>
                {
                  /* <div class="absolute top-2 right-2 bg-interactive-inverse rounded-full">
                <ProductImageZoom
                  images={images}
                  width={1280}
                  height={1280 * HEIGHT / WIDTH}
                />
              </div> */
                }
                <div class="absolute right-0">
                  <WishlistButton
                    variant="full"
                    productId={isVariantOf?.productGroupID}
                    sku={productID}
                    title={name}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Product Info */}
          <div class="w-full  sm:w-[40%]">
            <ProductInfo page={page} />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>
        {/* Description card */}
        <div class="mt-4 sm:mt-6">
          <Text variant="caption">
            {description && (
              <details>
                <summary class="cursor-pointer border-default border-y flex justify-between py-[15px]">
                  <h2 class="mx-[1.5rem]">
                    <Text variant="heading-2">Descrição</Text>
                  </h2>
                  <Icon
                    id="ChevronRight"
                    class="open-hide"
                    width={20}
                    height={20}
                    strokeWidth={1}
                  />
                </summary>
                <div class="flex flex-col sm:flex-row">
                  <div
                    class="w-full sm:w-[60%] p-[15px]"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                  <div class="w-full sm:w-[40%]">
                    <Image
                      style={{ aspectRatio: ASPECT_RATIO }}
                      class="group-disabled:(border-interactive)  rounded min-w-[63px] sm:min-w-[100px]"
                      width={474}
                      height={474}
                      src={images[0].url!}
                      alt={images[0].alternateName}
                    />
                  </div>
                </div>
              </details>
            )}
          </Text>
        </div>
      </div>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="flex flex-col">
      <div class="grid grid-cols-1 gap-4 sm:(grid-cols-[50vw_25vw] grid-rows-1 justify-center)">
        {/* Image slider */}
        <Slider class="gap-6">
          {[images[0], images[1] ?? images[0]].map((img, index) => (
            <Image
              class={`scroll-snap-center min-w-[100vw] sm:(min-w-[24vw])`}
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </Slider>

        {/* Product Info */}
        <div class="px-4 sm:(pr-0 pl-6)">
          <ProductInfo page={page} />
        </div>
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <Text variant="caption">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div class="ml-2 mt-2">{description}</div>
            </details>
          )}
        </Text>
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <Container class="py-0 ">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </Container>
  );
}

export default ProductDetails;
