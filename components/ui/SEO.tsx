import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";

export interface Props {
  title?: string;
  /**
   * @description Default is 1 for mobile and all for desktop
   */
  text?: string;
}

export default function BannerGrid({
  title,
  text,
}: Props) {
  return (
    <Container>
      <section class="w-full px-4 md:px-0 mx-auto">
        {title &&
          (
            <div class="py-6 md:py-0 md:pb-[40px] flex items-center justify-center mt-6">
              <h1
                class={"text-lg font-semibold uppercase text-[32px] text-center"}
              >
                {title}
              </h1>
            </div>
          )}
        <div class="max-w-[675px] mx-auto text-center">
          <Text class=" text-[24px]">{text}</Text>
        </div>
      </section>
    </Container>
  );
}
