interface ProductsProps {
	product: {} | any;
}
const Products = ({ product }: ProductsProps) => {
	return (
		<>
			<div className="card w-96 h-[400px] bg-base-100 shadow-xl border hover:shadow-2xl hover:scale-105 transform transition-transform">
				<figure className="px-10 pt-10">
					<img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">{product.title}</h2>
					<div className="badge badge-success text-white">${product.price}</div>
					<div className="card-actions justify-end">
						<button className="btn btn-primary btn-sm ">Buy Now</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default Products;
