import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import type { Image } from "deco-sites/std/components/types.ts";

interface Props {
  socials?: Array<{ href: string; image: Image; alt: string }>;
}

function Newsletter({ socials }: Props) {
  return (
    <div class="flex flex-col items-center gap-6 max-w-[997px] mx-auto">
      <div class="flex flex-col gap-2 max-w-[400px]">
        <Text
          variant="heading-2"
          tone="default"
          class="text-center uppercase text-[26px] lg:text-[37px]"
        >
          Fique por dentro!
        </Text>
        <Text
          variant="caption"
          tone="default"
          class="text-center text-base mt-2 text-grey "
        >
          Quer saber todas as novidades, lançamentos e ofertas exclusivas? Deixe
          seu e-mail com a gente.
        </Text>
      </div>
      <form class="flex flex-col lg:flex-row lg:items-center gap-[10px] font-body text-body w-full ">
        <input
          class="py-3 px-3 flex-grow bg-footer rounded-none border-1 border-grey text-grey placeholder-gray-700 box-border"
          placeholder="Seu nome"
        />
        <input
          class="py-3 px-3 flex-grow bg-footer rounded-none text-1-500 border-1 border-grey placeholder-gray-700 box-border"
          placeholder="Digite seu e-mail favorito"
        />
        <Button
          class="py-4 px-3 rounded-none w-full lg:max-w-[282px] uppercase border-4 text-brand-primary"
          type="bgutton" // prevent form's default behavior
          variant="secondary"
        >
          Cadastrar
        </Button>
      </form>
      <Text variant="caption" tone="default" class="text-center">
        Ao se cadastrar, você concorda com a nossa{" "}
        <a href="/politica-de-privacidade" class="underline ">
          política de privacidade
        </a>
      </Text>
      <div>
        {socials?.map((social) => (
          <a href={social.href}>
            <img src={social.image} alt={social.alt} width={40} height={40} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Newsletter;
