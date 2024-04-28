"use client";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "../services/auth.services";
import toast from "react-hot-toast";

const FormSignUp = () => {
	const [dataSignUp, setDataSignUp] = useState({ name: "", email: "", password: "" });
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
		setDataSignUp({ ...dataSignUp, [e.target.name]: e.target.value });
	};
	const onSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (error) {
			toast.error("Please enter valid data");
			return;
		}
		setLoading(true);
		toast.loading("Signing up...");
		signUp(dataSignUp.name, dataSignUp.email, dataSignUp.password).then((response) => {
			if (response.ok) {
				setLoading(false);
				toast.dismiss();
				toast.success("Signed up successfully");
				toast.loading("Redirecting to login...");
				setTimeout(() => {
					window.location.href = "/auth/login";
				}, 3000);
			} else {
				setLoading(false);
				toast.dismiss();
				toast.error(response.message);
			}
		});
	};

	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<div className="card-body items-center text-center">
				<h2 className="card-title">Sign Up</h2>
				<form onSubmit={onSubmitSignUp}>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Name</span>
						</div>
						<input type="text" placeholder="Your name" className="input input-bordered w-full max-w-xs" onChange={handleChange} name="name" />
					</label>
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
					<button className="btn btn-primary w-full mt-5">
						{loading ? (
							<>
								<span className="loading loading-spinner loading-xs"></span> Sign Up{" "}
							</>
						) : (
							<span>Sign Up</span>
						)}
					</button>
					<div className="divider">or</div>
					<div className="flex justify-center gap-3">
						<span>{"Have an account?"}</span>
						<Link href="/auth/login" className="link">
							Log In
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FormSignUp;
