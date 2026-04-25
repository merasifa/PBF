import TampilanProduk from "../../views/produk";
import { GetServerSideProps } from "next";
import { ProductType } from "../../types/Product.type";

type Props = {
  products: ProductType[];
};

const HalamanProdukServer = ({ products }: Props) => {
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={products} />
    </div>
  );
};

// Fetch getServerSideProps adan mengambil data dari API "/api/produk"
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/produk");
    const response = await res.json();
    // Jemala.log("Data produk yang didapatkan dari api", response);

    return {
      props: {
        products: response.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
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

export default HalamanProdukServer;
