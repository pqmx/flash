"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const links = [
		{ name: "Dashboard", href: "/" },
		{ name: "Create New", href: "/create-new" },
		{ name: "Logout", href: "/Logout" },
	];

	return (
		<header className="top-0 left-0 w-full bg-white shadow-md z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Left: Brand (optional) */}
					<div className="shrink-0 font-bold text-xl">Brand</div>

					{/* Desktop Links */}
					<nav className="hidden md:flex space-x-8">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
							>
								<div className="text-gray-800 hover:text-blue-600 font-medium">
									{link.name}
								</div>
							</Link>
						))}
					</nav>

					{/* Mobile Hamburger */}
					<div className="md:hidden">
						<button
							onClick={() => setMobileOpen(!mobileOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
						>
							<span className="sr-only">Open main menu</span>
							<div className="flex flex-col justify-between w-6 h-5">
								<span
									className={`block h-0.5 bg-gray-800 transform transition duration-300 ${
										mobileOpen ? "rotate-45 translate-y-2" : ""
									}`}
								/>
								<span
									className={`block h-0.5 bg-gray-800 transition-opacity duration-300 ${
										mobileOpen ? "opacity-0" : "opacity-100"
									}`}
								/>
								<span
									className={`block h-0.5 bg-gray-800 transform transition duration-300 ${
										mobileOpen ? "-rotate-45 -translate-y-2" : ""
									}`}
								/>
							</div>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`md:hidden bg-white shadow-md transform transition-transform duration-300 origin-top ${
					mobileOpen ? "scale-y-100" : "scale-y-0"
				}`}
			>
				<nav className="px-2 pt-2 pb-4 space-y-1">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
						>
							<div
								onClick={() => setMobileOpen(false)}
								className="block px-3 py-2 rounded-md text-gray-800 hover:bg-blue-100 hover:text-blue-600 font-medium"
							>
								{link.name}
							</div>
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
