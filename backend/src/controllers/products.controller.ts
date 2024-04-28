import { Request, Response } from "express";

class Products {
	public getProducts = async (req: Request, res: Response) => {
		try {
			const products = await fetch("https://dummyjson.com/carts").then((res) => res.json());
			return res.status(200).json({
				ok: true,
				products: products.carts,
			});
		} catch (error: any) {
			return res.status(500).json({
				ok: false,
				message: error.message,
			});
		}
	};
}

export default Products;
