import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";

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
    <Container class="min-h-[280px] my-[15px]">
      <div class="border-default border-y">
        <div class="flex flex-col justify-evenly mx-6 sm:(flex-row  mx-0 py-[15px])">
          {features.map(({ icon: id = "Truck", title, description }) => (
            <div class="flex flex-row gap-4 py-6 text-interactive items-center sm:( py-0 px-8)">
              <Icon
                id={id}
                width={40}
                height={40}
                strokeWidth={2}
              />
              <div class="flex flex-col">
                <Text variant="heading-3" class="text-interactive">
                  {title}
                </Text>
                <Text tone="subdued" variant="caption">
                  {description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default FeatureHighlights;
