/* eslint-disable @next/next/no-img-element */
"use client";
import LayoutContainer from "@/app/components/LayoutContainer";
import FormLogin from "@/app/components/FormLogin";
import { useIsLogin } from "@/app/states/isLogin";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const { isLogin } = useIsLogin() as Boolean | any;
	const router = useRouter();
	useEffect(() => {
		if (isLogin) {
			router.push("/home");
		}
	}, [isLogin, router]);

	return (
		<LayoutContainer classNames="flex items-center justify-center h-screen relative overflow-hidden">
			<div className="absolute inset-0 z-0">
				<img src="/assets/waves.svg" alt="Waves" className="object-cover w-full h-full" />
			</div>
			<div className="z-10">
				<FormLogin />
			</div>
		</LayoutContainer>
	);
};

export default LoginPage;
