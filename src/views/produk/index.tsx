import Image from "next/image";
import styles from "./produk.module.scss";
import Link from "next/link";
import { ProductType } from "../../types/Product.type";

type ProdukProps = {
  products: ProductType[];
  isLoading?: boolean;
  isError?: boolean;
};

const TampilkanProduk = ({ products, isLoading, isError }: ProdukProps) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {isLoading ? (
          <div className={styles.produk__content__skeleton}>
            <div className={styles.produk__content__skeleton__image} />
            <div className={styles.produk__content__skeleton__name} />
            <div className={styles.produk__content__skeleton__category} />
            <div className={styles.produk__content__skeleton__price} />
          </div>
        ) : isError ? (
          <p className={styles.produk__message}>Terjadi kesalahan saat memuat produk.</p>
        ) : products.length > 0 ? (
          products.map((products: ProductType) => (
            <Link href={`/produk/${products.id}`} key={products.id} className={styles.produk__content__item}>
              <div className={styles.produk__content__item__image}>
                <Image
                  src={products.image}
                  alt={products.name}
                  width={400}
                  height={400}
                  unoptimized
                  sizes="(max-width: 768px) 50vw, 200px"
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
                />
              </div>
              <h4 className={styles.produk__content__item__name}>
                {products.name}
              </h4>
              <p className={styles.produk__content__item__category}>
                {products.category}
              </p>
              <p className={styles.produk__content__item__price}>
                Rp {products.price.toLocaleString("id-ID")}
              </p>
            </Link>
          ))
        ) : (
          <p className={styles.produk__message}>Data produk tidak tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default TampilkanProduk;
