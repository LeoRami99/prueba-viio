"use client";
import Link from "next/link";
import { useIsLogin } from "@/app/states/isLogin";
import { useEffect } from "react";

export default function Home() {
	const { isLogin } = useIsLogin() as Boolean | any;
	useEffect(() => {
		if (isLogin) {
			window.location.href = "/home";
		}
	}, [isLogin]);
	return (
		<main className="h-screen w-full flex justify-center items-center flex-col space-y-10">
			<h1 className="text-4xl font-bold">Welcome to Products</h1>
			<div className="flex justify-between gap-3">
				<Link href={"/auth/login"} className="btn btn-primary">
					Log in
				</Link>
				<Link href={"/auth/sign-up"} className="btn btn-secondary">
					Sign up
				</Link>
			</div>
		</main>
	);
}
