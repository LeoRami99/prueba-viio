import FormSignUp from "@/app/components/FormSignUp";
import LayoutContainer from "@/app/components/LayoutContainer";

const SignUpPage = () => {
	return (
		<LayoutContainer classNames="flex items-center justify-center h-screen relative overflow-hidden">
			<div className="absolute inset-0 z-0">
				<img src="/assets/waves.svg" alt="Waves" className="object-cover w-full h-full" />
			</div>
			<FormSignUp />
		</LayoutContainer>
	);
};
export default SignUpPage;
