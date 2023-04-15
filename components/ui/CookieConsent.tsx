import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import { useId } from "preact/hooks";

const script = (id: string) => `
const callback = () => {
  const KEY = 'store-cookie-consent';
  const ACCEPTED = 'accepted';
  const HIDDEN = "translate-y-[200%]";
  
  const consent = localStorage.getItem(KEY);
  const elem = document.getElementById("${id}");
  
  if (consent !== ACCEPTED) {
    elem.querySelector('[data-button-cc-accept]').addEventListener('click', function () {
      localStorage.setItem(KEY, ACCEPTED);
      elem.classList.add(HIDDEN);
    });
    elem.classList.remove(HIDDEN);
  }
};

window.addEventListener('scroll', callback, { once: true });
`;

function CookieConsent() {
  const id = `cookie-consent-${useId()}`;

  return (
    <>
      <div
        id={id}
        class="transform-gpu translate-y-[200%] transition fixed bottom-0 sm:bottom-4 w-screen z-50 "
      >
        <Container class="px-4 py-4 rounded border border-default flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow bg-default ">
          <Text class="flex-grow " variant="caption">
            Utilizamos cookies para oferecer a melhor experiência e personalizar
            conteúdo. Ao seguir navegando, você concorda com a nossa Política de
            Privacidade e Termos de Uso.{" "}
            <a href="https://www.deco.cx">
              <Text class="underline text-interactive" variant="caption">
                Saiba mais
              </Text>
            </a>
          </Text>

          <div class="flex justify-end gap-2 w-full sm:w-[30%]">
            <Button data-button-cc-accept variant="primary" class="uppercase">
              Continuar e fechar
            </Button>
          </div>
        </Container>
      </div>
      <script type="module" dangerouslySetInnerHTML={{ __html: script(id) }} />
    </>
  );
}

export default CookieConsent;
