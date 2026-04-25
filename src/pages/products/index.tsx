import TampilanProduk from "../../views/produk";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import { ProductType } from "../../types/Product.type";

type ProdukApiResponse = {
  status: boolean;
  status_code: number;
  data: ProductType[];
};

const Products = () => {
  const { data, error, isLoading } = useSWR<ProdukApiResponse>("/api/produk", fetcher);

  const products: ProductType[] = data?.data ?? [];

  return (
    <div>
      <TampilanProduk products={products} isLoading={isLoading} isError={Boolean(error)} />
    </div>
  );
};

export default Products;
