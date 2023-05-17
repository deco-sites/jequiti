import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import AlertDropdown from "deco-sites/jequiti/components/header/AlertDropdown.tsx";

// import AlertDropdown from "deco-sites/jequiti/components/header/AlertDropdown.tsx";
// import HeaderButton from "./Buttons";
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
      <div class="bg-[#efefef] lg:block hidden micro-header-hidden">
        <div class="w-full mx-auto flex gap-[1.5rem]">
          {alerts.map((alert) => {
            if (alert?.children?.length && alert?.children?.length > 0) {
              //@ts-ignore ignorei por que o erro está tratado no if acima
              return <AlertDropdown alert={alert} />;
            }
            if (!alert?.children?.length) {
              return (
                <a href={alert.href}>
                  <Text
                    class="flex items-center h-10"
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
      <div class="lg:hidden flex">
        <a
          href="/queroserumaconsultora"
          class="px-[15px] flex items-center h-[42px] bg-interactive w-[fit-content] "
        >
          <Text class="text-white text-[14px] font-bold">
            Quero ser Consultor(a)
          </Text>
        </a>
        <a
          href="/acesso-consultora"
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
