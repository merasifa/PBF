import Link from "next/link";
import styles from "./Register.module.css";

const HalamanRegister = () => {
	return (
		<div className={styles.register}>
			<h1 className={styles.title}>Halaman Register</h1>
			<form className={styles.form}>
				<input type="text" placeholder="Nama" className={styles.input} />
				<input type="email" placeholder="Email" className={styles.input} />
				<input type="password" placeholder="Password" className={styles.input} />
				<button type="submit" className={styles.button}>Register</button>
			</form>
			<Link href="/auth/login" className={styles.link}>Ke Halaman Login</Link>
		</div>
	);
};

export default HalamanRegister;
