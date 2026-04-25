import Link from "next/link";
import style from "./register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { push } = useRouter();
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setIsLoading(true);
		const form = event.currentTarget;
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const fullname = formData.get("Fullname") as string;
		const password = formData.get("Password") as string;
		const response = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, fullname, password }),
		});
		const result = await response.json();
		if (response.status === 200) {
			form.reset();
			// event.currentTarget.reset();
			setIsLoading(false);
			push("/auth/login");
		} else {
			setIsLoading(false);
			setError(result.name || "An error occurred");
		}
	};

	return (
		<div className={style.register}>
			{error && <p className={style.register__error}>{error}</p>}
			<h1 className={style.register__title}>Halaman Register</h1>
			<form onSubmit={handleSubmit} className={style.register__form}>
				<div className={style.register__form__item}>
					<label
						htmlFor="email"
						className={style.register__form__item__label}
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Email"
						required
						className={style.register__form__item__input}
					/>
				</div>

				<div className={style.register__form__item}>
					<label
						htmlFor="Fullname"
						className={style.register__form__item__label}
					>
						Fullname
					</label>
					<input
						type="text"
						id="Fullname"
						name="Fullname"
						placeholder="Fullname"
						className={style.register__form__item__input}
					/>
				</div>

				<div className={style.register__form__item}>
					<label
						htmlFor="Password"
						className={style.register__form__item__label}
					>
						Password
					</label>
					<input
						type="password"
						id="Password"
						name="Password"
						placeholder="Password"
						minLength={6}
						required
						className={style.register__form__item__input}
					/>
					<button
						type="submit"
						className={style.register__form__item__button}
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Register"}
					</button>
					<br />
					<p className={style.register__form__item__text}>
						Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default TampilanRegister;
