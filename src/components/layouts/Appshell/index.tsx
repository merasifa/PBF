import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";

const disableNavbar = ["/auth/login", "/auth/register", "/404"];
const Navbar = dynamic(() => import("../../layouts/Navbar"), {
	ssr: false,
});

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

type AppShellProps = {
	children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
	const { children } = props;
	const { pathname } = useRouter();

	return (
		<main className={roboto.className}>
			{!disableNavbar.includes(pathname) && <Navbar />}
			<section className="app-content">{children}</section>
		</main>
	);
};

export default AppShell;
