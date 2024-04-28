import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Prueba Técnica - Viio",
	description: "Prueba técnica para el puesto de desarrollador fullstack en Viio.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="light">
			<body className={inter.className}>
				<Toaster />
				{children}
			</body>
		</html>
	);
}
