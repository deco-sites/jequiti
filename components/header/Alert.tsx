import Text from "deco-sites/fashion/components/ui/Text.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
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
    <div class="bg-[#efefef] ">
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
  );
}

export default Alert;
