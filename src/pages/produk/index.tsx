import { useRouter } from "next/router";
import { useState } from "react";
import TampilanProduk from "../../views/produk";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

const Kategori = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { push } = useRouter();
  const [products, setProducts] = useState([]);
  // console.log("products:", products);

  const { data, error, isLoading } = useSWR("/api/produk", fetcher);
  // cek apakah data, error, dan isLoading sudah benar

  void isLogin;
  void setIsLogin;
  void push;
  void products;
  void setProducts;
  void error;

  return (
    <div>
      <TampilanProduk products={isLoading || !data ? [] : data.data} />
    </div>
  );
};

export default Kategori;
