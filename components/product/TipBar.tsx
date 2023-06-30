import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
export interface TipBarProps {
  tips: Array<{
    text: string;
    href?: string;
    image: LiveImage;
  }>;
}
export default function TipBar({ tipBarProps }: { tipBarProps: TipBarProps }) {
  const { tips } = tipBarProps;
  console.log(tips);
  return (
    <div>
      <ul class="flex flex-wrap gap-2 items-center justify-around mt-6 text-subdued">
        {tips.map((tip) => (
          <li class="w-52">
            <a
              href={tip.href ? tip.href : "#"}
              class="w-52	 flex items-center cursor-pointer"
            >
              <img
                src={tip.image}
                alt={`Icone para ${tip.text}`}
                class="w-7 mr-2"
              />
              {tip.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

//teste
