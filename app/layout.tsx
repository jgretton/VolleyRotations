import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "VolleyRotations",
	description: "A web application to help volleyball players with rotations",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} antialiased`}>
				<header className="max-w-7xl mx-auto sticky top-5 px-4 z-50 flex justify-between">
					<Link
						href="/"
						className="text-2xl font-light hover:underline mix-blend-difference	"
					>
						VR
					</Link>
					<Link
						href="/rotation-builder"
						className="text-2xl font-light hover:underline mix-blend-difference	"
					>
						Rotation Builder
					</Link>
				</header>
				{children}
			</body>
		</html>
	);
}
