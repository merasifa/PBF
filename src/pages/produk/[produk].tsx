/* eslint-disable @typescript-eslint/no-unused-vars */
import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";
import { GetStaticPaths, GetStaticProps } from "next";

const HalamanProduk = ({ product }: { product: ProductType }) => {
	{
		/* digunakan client-side rendering
		// const Router = useRouter();
		// console.log(Router);
		// const { query } = useRouter();
		// const { data, error, isLoading } = useSWR(
		//   `/api/products/${query.produk}`,
		//   fetcher,
		// );

		// return (
		//   <div>
		//     <DetailProduk products={isLoading ? [] : data.data} />
		//   </div>
		// );
		*/
	}

	return (
		<div>
			<DetailProduk products={product} />
		</div>
	);
};

export default HalamanProduk;

// digunakan server-side rendering
// export async function getServerSideProps({ params }: { params: { produk: string } }) {
//   const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
//   const response = await res.json();
//   // console.log("Data produk yang diambil dari API:", response);
//   return {
//     props: {
//       product: response.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
//     },
//   };
// }

// digunakan static-site generation
export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch("http://localhost:3000/api/produk");
	const response = await res.json();

	const paths = response.data.map((product: ProductType) => ({
		params: { produk: product.id },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: { params?: { produk?: string } }) => {
	const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
	const response: { data: ProductType } = await res.json();

	return {
		props: {
			product: response.data,
		},
	};
};
