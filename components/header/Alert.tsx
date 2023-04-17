import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import SliderControllerJS from "deco-sites/jequiti/islands/SliderJS.tsx";
import { Slider } from "deco-sites/jequiti/components/ui/Slider.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  return (
    <>
      <div class="bg-[#efefef] sm:block hidden">
        <div class="max-w-[1336px] w-full mx-auto ">
          {alerts.map((alert) => (
            <Text
              class="flex items-center h-[44px]"
              variant="caption"
              tone="default"
            >
              {alert}
            </Text>
          ))}
        </div>
      </div>
      <div class="sm:hidden flex">
        <a
          href=""
          class="px-[15px] flex items-center h-[42px] bg-interactive w-[fit-content] "
        >
          <Text class="text-white text-[14px] font-bold">
            Quero ser Consultor(a)
          </Text>
        </a>
        <a
          href=""
          class="px-[15px] flex items-center h-[42px] bg-white w-[fit-content] "
        >
          <Text class="text-default text-[14px] font-bold">
            Ja ser Consultor(a)
          </Text>
        </a>
      </div>
    </>
  );
}

export default Alert;
