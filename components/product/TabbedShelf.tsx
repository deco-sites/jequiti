import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/fashion/islands/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function TabbedShelf({
  title,
  products,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="grid grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr] py-10 px-0 sm:px-5"
    >
      <h2 class="text-center row-start-1 col-span-full">
        <Text variant="heading-2" class="uppercase">{title}</Text>
      </h2>

      <div class="tabbed">
        <input type="radio" id="tab1" name="css-tabs" checked />
        <input type="radio" id="tab2" name="css-tabs" />
        <input type="radio" id="tab3" name="css-tabs" />

        <ul class="tabs">
          <li class="tab">
            <label for="tab1">Gangsta lipsum</label>
          </li>
          <li class="tab">
            <label for="tab2">Zombie lipsum</label>
          </li>
          <li class="tab">
            <label for="tab3">New age bullshit</label>
          </li>
        </ul>

        <div class="tab-content">
          <h4>Gangsta lipsum</h4>
          <p>
            Da bomb ipsizzle dolizzle sit amizzle, consectetuer adipiscing fo
            shizzle. Nullam yo velizzle, aliquet volutpizzle, fo shizzle
            yippiyo, for sure vizzle, arcu. Black eget fo shizzle. Sizzle
            erizzle. Rizzle at dolizzle dapibizzle turpis tempizzle izzle.
            Maurizzle crackalackin nibh et check out this. Cool check it out
            tortizzle. Break it down bling bling rhoncizzle my shizz. Fo hizzle
            rizzle platea boom shackalack. Gangsta dapibus. Owned tellus urna,
            pretizzle black, mattizzle ac, eleifend for sure, nunc. Owned
            suscipizzle. Integizzle sempizzle shiz sed purizzle.
          </p>
        </div>

        <div class="tab-content">
          <h4>Zombie lipsum</h4>
          <p>
            Zombie ipsum brains reversus ab cerebellum viral inferno, brein nam
            rick mend grimes malum cerveau cerebro. De carne cerebro lumbering
            animata cervello corpora quaeritis. Summus thalamus brains sit​​,
            morbo basal ganglia vel maleficia? De braaaiiiins apocalypsi gorger
            omero prefrontal cortex undead survivor fornix dictum mauris.
          </p>
        </div>

        <div class="tab-content">
          <h4>New age bullshit</h4>
          <p>
            Our conversations with other pilgrims have led to an awakening of
            pseudo-astral consciousness. Who are we? Where on the great myth
            will we be re-energized? We are at a crossroads of complexity and
            stagnation.
          </p>
          <p>
            Eons from now, we dreamers will exist like never before as we are
            aligned by the cosmos. We are being called to explore the
            stratosphere itself as an interface between nature and complexity.
            We must learn how to lead infinite lives in the face of bondage.
          </p>
          <p>
            Generated by the{" "}
            <a href="http://sebpearce.com/bullshit/">
              New Age Bullshit Generator
            </a>
          </p>
        </div>
      </div>

      <Slider
        class="col-span-full row-start-2 row-end-5"
        snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-[10px] sm:last:mr-0"
      >
        {products?.map((product) => (
          <div class="min-w-[270px] max-w-[270px] sm:min-w-[292px] sm:max-w-[292px]">
            <ProductCard product={product} itemListName={title} />
          </div>
        ))}
      </Slider>

      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <div class="absolute right-1/2 bg-interactive-inverse rounded-full border-default border">
            <Button variant="icon" data-slide="prev" aria-label="Previous item">
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Button>
          </div>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <div class="absolute left-1/2 bg-interactive-inverse rounded-full border-default border">
            <Button variant="icon" data-slide="next" aria-label="Next item">
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </>

      <SliderControllerJS rootId={id} />

      <ViewSendEvent
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </Container>
  );
}

export default TabbedShelf;
