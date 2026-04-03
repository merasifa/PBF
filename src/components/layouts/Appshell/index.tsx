import { useRouter } from "next/router";
import Navbar from "../../layouts/Navbar";

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

type AppShellProps = {
	children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
	const { children } = props;
	const { pathname } = useRouter();

	return (
		<main className="app-shell">
			{!disableNavbar.includes(pathname) && <Navbar />}
			<section className="app-content">{children}</section>
			<footer className="app-footer">footer</footer>
		</main>
	);
};

export default AppShell;
