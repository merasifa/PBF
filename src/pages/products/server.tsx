import TampilanProduk from "../../views/produk";
import { GetServerSideProps } from "next";
import { ProductType } from "../../types/Product.type";

type Props = {
  products: ProductType[];
};

const ProductsServer = ({ products }: Props) => {
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={products} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/produk");
    const response = await res.json();

    return {
      props: {
        products: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default ProductsServer;
