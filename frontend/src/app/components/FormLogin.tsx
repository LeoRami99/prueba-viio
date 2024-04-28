"use client";
import Link from "next/link";
import { login } from "../services/auth.services";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useIsLogin } from "@/app/states/isLogin";
const FormLogin = () => {
	const { setIsLogin } = useIsLogin() as Boolean | any;
	const router = useRouter();
	const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// validation for email
		if (e.target.name === "email") {
			if (!e.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
				setError("Please enter a valid email address");
			} else {
				setError("");
			}
		}
		// Validation for password
		if (e.target.name === "password") {
			if (e.target.value.length < 6) {
				setError("Password must be at least 6 characters");
			} else {
				setError("");
			}
		}
		setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
	};
	const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (error) {
			toast.error("Please enter valid data");
			return;
		}
		setLoading(true);
		toast.loading("Logging in...");
		login(dataLogin.email, dataLogin.password)
			.then((response) => {
				if (response.ok) {
					Cookie.set("token", response.token);
					setLoading(false);
					setIsLogin(true);
					toast.dismiss();
					toast.success("Logged in successfully");
					router.push("/home");
				} else {
					setLoading(false);
					toast.dismiss();
					setIsLogin(false);
					toast.error(response.message);
				}
			})
			.catch((error) => {
				setLoading(false);
				toast.dismiss();
				setIsLogin(false);
				toast.error("An error occurred");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<div className="card-body items-center text-center">
				<h2 className="card-title">Log In</h2>
				<form onSubmit={onSubmitLogin}>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Email</span>
						</div>
						<input type="text" placeholder="your@email.com" className="input input-bordered w-full max-w-xs" onChange={handleChange} name="email" />
					</label>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Password</span>
						</div>
						<input type="password" placeholder="Your password" className="input input-bordered w-full max-w-xs" onChange={handleChange} name="password" />
					</label>
					{error && (
						<div role="alert" className="alert alert-error shadow mt-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span>{error}</span>
						</div>
					)}
					<button className="btn btn-primary w-full mt-5" disabled={loading}>
						{loading ? (
							<>
								<span className="loading loading-spinner loading-xs"></span> Log In{" "}
							</>
						) : (
							<span>Log In</span>
						)}
					</button>
					<div className="divider">or</div>
					<div className="flex justify-center gap-3">
						<span>{"Don't have an account?"}</span>
						<Link href="/auth/sign-up" className="link">
							Sing Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
export default FormLogin;
