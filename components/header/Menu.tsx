import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import Text from "deco-sites/jequiti/components/ui/Text.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item, level = 0 }: { item: INavItem; level?: number }) {
  const open = useSignal(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const title = (
    <Text
      class="flex-grow min-h-[40px] flex items-center justify-start"
      variant={level === 0 ? "menu" : "caption"}
    >
      {item.label}
    </Text>
  );

  return (
    <li>
      <div
        class={`flex justify-between items-center w-full py-2 ${
          level > 0 ? "pl-2" : ""
        }`}
        onClick={() => {
          if (hasChildren) open.value = !open.value;
        }}
      >
        {hasChildren
          ? title
          : <a class="w-full inline-block" href={item.href}>{title}</a>}

        {hasChildren && (
          <Button variant="icon">
            <Icon
              class={open.value === true ? "hidden" : "block"}
              id="ChevronRight"
              height={20}
              width={20}
              strokeWidth={1.5}
            />
            <Icon
              class={open.value === true ? "block" : "hidden"}
              id="ChevronLeft"
              height={20}
              width={20}
              strokeWidth={1.5}
            />
            <div class={open.value === true ? "block" : "hidden"}>Voltar</div>
          </Button>
        )}
      </div>

      {hasChildren && (
        <ul class={`flex-col ${open.value === true ? "flex" : "hidden"}`}>
          {item.children!.map((node) => (
            <MenuItem
              item={node}
              level={level + 1}
            />
          ))}
          <li>
            <a href={item.href} class="w-full py-2 pl-2 inline-block">
              <Text class="underline" variant="caption">
                Ver todos
              </Text>
            </a>
          </li>
        </ul>
      )}
    </li>
  );
}

function Menu({ items }: Props) {
  return (
    <>
      <ul class="flex flex-col py-2">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="User" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Minha conta</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="Heart" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Favoritos</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Pedidos</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Phone" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Cashback</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Text variant="caption">Consultor(a)</Text>
          </a>
        </li>
      </ul>
      <div>
        <h2>Categorias</h2>
        <ul class="px-4 flex-grow flex flex-col">
          {items.map((item) => <MenuItem item={item} />)}
        </ul>
      </div>
      <ul class="px-4 flex-grow flex flex-col">
        <li>
          <a href="">A Jequiti</a>
        </li>
        <li>
          <a href="">Baú da Felicidade</a>
        </li>
        <li>
          <a href="">Atendimento</a>
        </li>
        <li>
          <a href="">Blog</a>
        </li>
        <li>
          <a href="">Catálogo Digital</a>
        </li>
      </ul>
    </>
  );
}

export default Menu;
