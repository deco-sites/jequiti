import Text from "deco-sites/jequiti/components/ui/Text.tsx";
export interface Props {
  alerts?: Array<{
    text: string;
    href: string;
    children?: Array<{ text: string; href: string }>;
  }>;
}

function Alert({ alerts = [] }: Props) {
  return (
    <>
      <div class="bg-[#efefef] sm:block hidden">
        <div class="max-w-[1336px] w-full mx-auto flex gap-[1.5rem]">
          {alerts.map((alert) => {
            if (!alert?.children?.length) {
              return (
                <a href={alert.href}>
                  <Text
                    class="flex items-center h-[44px]"
                    variant="caption"
                    tone="default"
                  >
                    {alert.text}
                  </Text>
                </a>
              );
            }
            return <a href=""></a>;
          })}
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
