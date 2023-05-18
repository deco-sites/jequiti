import Icon, {
  AvailableIcons,
} from "deco-sites/jequiti/components/ui/Icon.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Container from "deco-sites/jequiti/components/ui/Container.tsx";

export interface Feature {
  /**
   * @description Image src
   */
  icon: AvailableIcons;
  /**
   * @description Title
   */
  title: string;
  /**
   * @description Description and Image alt text
   */
  description: string;
}

export interface Props {
  features: Feature[];
}

function FeatureHighlights(
  { features }: Props,
) {
  return (
    <Container class="my-4">
      <div class="border-default border-y overflow-x-hidden">
        <div class="flex flex-row w-fit-content overflow-x-auto mx-0 fit-content sm:(py-4 justify-evenly)">
          {features.map(({ icon: id = "Truck", title, description }) => (
            <div class="flex flex-row gap-4 py-6 px-2 items-center min-w-[288px] sm:(py-0 px-8)">
              <Icon
                id={id}
                width={40}
                height={40}
                strokeWidth={2}
                class="min-w-[40px] text-brand-primary"
              />
              <div class="flex flex-col">
                <div class="font-bold text-lg text-brand-primary leading-6">
                  {title}
                </div>
                <div class="text-md text-2-500 leading-6">
                  {description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default FeatureHighlights;
