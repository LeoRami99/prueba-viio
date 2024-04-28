/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "@/app/components/Footer";
import LayoutContainer from "@/app/components/LayoutContainer";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
const { getProducts } = require("@/app/services/products.service");
import Products from "@/app/components/Products";
import Pagination from "@/app/components/Pagination";

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filterByTitle, setFilterByTitle] = useState("");
	const [filterByPrice, setFilterByPrice] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const productsPerPage = 8;

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await getProducts();
				const allProducts = response.products.flatMap((productGroup: any) => productGroup.products);
				setProducts(allProducts);
			} catch (err) {
				setError("Failed to load products.");
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	useEffect(() => {
		const filtered = products.filter((product: any) => product.title.toLowerCase().includes(filterByTitle.toLowerCase()) && (filterByPrice ? product.price >= filterByPrice : true));
		setFilteredProducts(filtered);
		setTotalPages(Math.ceil(filtered.length / productsPerPage));
	}, [filterByTitle, filterByPrice, products]);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleFilterByTitle = (e: any) => {
		setFilterByTitle(e.target.value);
	};

	const handleFilterByPrice = (e: any) => {
		setFilterByPrice(e.target.value);
	};

	return (
		<>
			<Navbar />
			<LayoutContainer classNames="flex flex-col min-h-screen justify-center mt-10 relative">
				<div className="absolute inset-0 -z-[1]">
					<img src="/assets/waves.svg" alt="Waves" className="object-cover w-full h-full" />
				</div>
				<div className="w-auto justify-center items-center flex flex-col gap-4">
					<h1 className="text-[30px] font-bold text-center lg:text-4xl">Welcome to the Home Page</h1>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-4 lg:flex-row justify-between">
							<label className="input input-bordered flex items-center gap-2">
								<input type="text" className="grow" placeholder="Search by title" value={filterByTitle} onChange={handleFilterByTitle} />
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
									<path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
								</svg>
							</label>

							<select className="select select-bordered" value={filterByPrice} onChange={handleFilterByPrice}>
								<option value="">All prices</option>
								<option value="100">Up to $50</option>
								<option value="100">Up to $100</option>
								<option value="200">Up to $200</option>
								<option value="300">Up to $300</option>
								<option value="400">Up to $400</option>
								<option value="500">Up to $500</option>
							</select>
						</div>
						<p className="text-sm text-gray-500">Total products found: {filteredProducts.length}</p>
					</div>
				</div>
				{error && <p className="text-red-500">{error}</p>}
				<div className="flex flex-wrap justify-center gap-4 m-8 min-h-screen">
					{loading ? (
						<div className="flex flex-col gap-4 w-52">
							<div className="skeleton h-32 w-full"></div>
							<div className="skeleton h-4 w-28"></div>
							<div className="skeleton h-4 w-full"></div>
							<div className="skeleton h-4 w-full"></div>
						</div>
					) : (
						<>
							{currentProducts.length === 0 && (
								<div className="flex  items-center flex-col">
									<img src="assets/not-found.svg" alt="No products found" className="w-96 h-96" />
									<h2 className="text-xl text-gray-500">No products found</h2>
								</div>
							)}
							{currentProducts.map((product, index) => (
								<Products key={index} product={product} />
							))}
						</>
					)}
				</div>
				<Pagination currentPage={currentPage} totalPages={totalPages} onNext={handleNextPage} onPrevious={handlePreviousPage} />
			</LayoutContainer>
			<Footer />
		</>
	);
};

export default HomePage;
