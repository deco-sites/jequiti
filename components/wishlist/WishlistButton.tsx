import { useComputed, useSignal } from "@preact/signals";
import Icon from "deco-sites/jequiti/components/ui/Icon.tsx";
import Button from "deco-sites/jequiti/components/ui/Button.tsx";
import { useWishlist } from "deco-sites/std/packs/vtex/hooks/useWishlist.ts";
import { useUser } from "deco-sites/std/packs/vtex/hooks/useUser.ts";
import type { WishlistItem } from "deco-sites/std/packs/vtex/types.ts";

interface Props extends Partial<WishlistItem> {
  variant?: "icon" | "full";
}

function WishlistButton({ variant = "icon", ...item }: Props) {
  const user = useUser();
  const { loading, addItem, removeItem, getItem } = useWishlist();
  const listItem = useComputed(() => getItem(item));
  const fetching = useSignal(false);

  const isUserLoggedIn = Boolean(user.value?.email);
  const isInsideWishlist = Boolean(listItem.value);

  return (
    <Button
      variant={variant === "icon" ? "icon" : "secondary"}
      aria-label="Favoritos"
      loading={fetching.value}
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          window.alert("Please log in before adding to your wishlist");

          return;
        }

        if (loading.value) {
          return;
        }

        try {
          fetching.value = true;
          isInsideWishlist
            ? await removeItem(listItem.value!.id)
            : await addItem(item);
        } finally {
          fetching.value = false;
        }
      }}
    >
      <Icon
        id="Heart"
        width={24}
        height={24}
        strokeWidth={2}
        fill={isInsideWishlist ? "#7a206c" : "none"}
      />
      {variant === "icon" ? null : isInsideWishlist ? "Remover" : "Favoritar"}
    </Button>
  );
}

export default WishlistButton;
