import Text from "deco-sites/fashion/components/ui/Text.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col items-center gap-6">
      <div class="flex flex-col gap-2 max-w-[400px]">
        <Text
          variant="heading-2"
          tone="default"
          class="text-center uppercase"
        >
          Fique por dentro!
        </Text>
        <Text variant="caption" tone="default" class="text-center">
          Quer saber todas as novidades, lançamentos e ofertas exclusivas? Deixe
          seu e-mail com a gente.
        </Text>
      </div>
      <form class="flex flex-col sm:flex-row sm:items-center gap-[10px] font-body text-body w-full ">
        <input
          class="py-2 px-3 flex-grow bg-footer rounded-none text-default border-1 border-default"
          placeholder="Seu nome"
        />
        <input
          class="py-2 px-3 flex-grow bg-footer rounded-none text-default border-1 border-default"
          placeholder="Digite seu e-mail favorito"
        />
        <button
          class="py-2 px-3 bg-interactive-inverse rounded-none"
          type="bgutton" // prevent form's default behavior
        >
          Cadastrar
        </button>
      </form>
      <Text variant="caption" tone="default" class="text-center">
        Ao se cadastrar, você concorda com a nossa{" "}
        <a href="/politica-de-privacidade" class="underline ">
          política de privacidade
        </a>
      </Text>
    </div>
  );
}

export default Newsletter;
