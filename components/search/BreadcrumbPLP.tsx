import Container from "deco-sites/jequiti/components/ui/Container.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import Breadcrumb from "../ui/Breadcrumb.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function BreadcrumbPLP({
  page,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { breadcrumb } = page;
  if (!page) {
    return <></>;
  }
  return (
    <>
      {
        <Container>
          <div class="flex flex-row items-center sm:p-0 mb-2">
            <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
          </div>
        </Container>
      }
    </>
  );
}

function Bc({ page, ...props }: Props) {
  if (!page) {
    return <></>;
  }

  return <BreadcrumbPLP {...props} page={page} />;
}
export default Bc;
