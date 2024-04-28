import Cookies from "js-cookie";
import { useIsLogin } from "../states/isLogin";

const Navbar = () => {
	const { setIsLogin } = useIsLogin() as Boolean | any;
	const logout = () => {
		setIsLogin(false);
		Cookies.remove("token");
		if (window) {
			window.location.href = "/auth/login";
		}
	};

	return (
		<div className="navbar bg-base-100 shadow-md mb-">
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl">Test</a>
			</div>
			<div className="navbar-center"></div>
			<div className="navbar-end">
				<button className="btn btn-secondary" onClick={logout}>
					Log out
				</button>
			</div>
		</div>
	);
};
export default Navbar;
