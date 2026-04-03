import { useEffect } from "react";
import { useRouter } from "next/router";
import HeroSection from "./sections/HeroSection";
import MainSection from "./sections/MainSection";

const ProdukView = () => {
  const { push } = useRouter();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin") === "true";
    if (!loginStatus) {
      push("/auth/login");
    }
  }, [push]);

  return (
    <div className="min-h-screen w-full bg-slate-100 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <div className="w-full space-y-4">
        <HeroSection
          title="Produk User Page"
          subtitle="Temukan produk yang kamu butuhkan di sini"
        />
        <MainSection
          items={[
            { id: 1, name: "Produk 1" },
            { id: 2, name: "Produk 2" },
            { id: 3, name: "Produk 3" },
          ]}
        />
      </div>
    </div>
  );
};

export default ProdukView;
