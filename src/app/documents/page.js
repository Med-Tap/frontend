"use client";
import { useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	TransitionChild,
} from "@headlessui/react";
import {
	Bars3Icon,
	CalendarIcon,
	ChartPieIcon,
	DocumentDuplicateIcon,
	UsersIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
export default function dashboard(props) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isPersonalInformation, setIsPersonalInformation] = useState(false);
	const [isHistory, setIsHistory] = useState(false);
	const [isDocuments, setIsDocuments] = useState(true);
	const [isReports, setIsReports] = useState(false);

	const navigation = [
		{
			name: "Personal Information",
			href: "/dashboard",
			icon: UsersIcon,
			current: isPersonalInformation,
		},
		{
			name: "History",
			href: "/history",
			icon: CalendarIcon,
			current: isHistory,
		},
		{
			name: "Documents",
			href: "/documents",
			icon: DocumentDuplicateIcon,
			current: isDocuments,
		},
		{ name: "Reports", href: "#", icon: ChartPieIcon, current: isReports },
	];

	const documents = [
		{
			name: "Sample Document #1",
      type: "Immunization Form",
			href: "/documents/sample-document-1",
		},
		{
			name: "Sample Document #2",
      type: "Consent Form",
			href: "/documents/sample-document-2",
		},
		{
			name: "Sample Document #3",
      type: "DNR Form",
			href: "/documents/sample-document-3",
		},
	];

	return (
		<div>
			<Dialog
				open={sidebarOpen}
				onClose={setSidebarOpen}
				className="relative z-50 lg:hidden"
			>
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
				/>

				<div className="fixed inset-0 flex">
					<DialogPanel
						transition
						className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
					>
						<TransitionChild>
							<div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
								<button
									type="button"
									onClick={() => setSidebarOpen(false)}
									className="-m-2.5 p-2.5"
								>
									<span className="sr-only">Close sidebar</span>
									<XMarkIcon
										aria-hidden="true"
										className="h-6 w-6 text-white"
									/>
								</button>
							</div>
						</TransitionChild>
						{/* Sidebar component, swap this element with another sidebar if you like */}
						<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
							<div className="flex h-16 shrink-0 items-center">
								<img
									alt="Your Company"
									src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
									className="h-8 w-auto"
								/>
							</div>
							<nav className="flex flex-1 flex-col">
								<ul role="list" className="flex flex-1 flex-col gap-y-7">
									<li>
										<ul role="list" className="-mx-2 space-y-1">
											{navigation.map((item) => (
												<li key={item.name}>
													<a
														href={item.href}
														className={classNames(
															item.current
																? "bg-gray-50 text-indigo-600"
																: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
															"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
														)}
													>
														<item.icon
															aria-hidden="true"
															className={classNames(
																item.current
																	? "text-indigo-600"
																	: "text-gray-400 group-hover:text-indigo-600",
																"h-6 w-6 shrink-0"
															)}
														/>
														{item.name}
													</a>
												</li>
											))}
										</ul>
									</li>
								</ul>
							</nav>
						</div>
					</DialogPanel>
				</div>
			</Dialog>

			{/* Static sidebar for desktop */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
					<div className="flex h-16 shrink-0 items-center">
						<img
							alt="Your Company"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							className="h-8 w-auto"
						/>
					</div>
					<nav className="flex flex-1 flex-col">
						<ul role="list" className="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" className="-mx-2 space-y-1">
									{navigation.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className={classNames(
													item.current
														? "bg-gray-50 text-indigo-600"
														: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
													"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
												)}
											>
												<item.icon
													aria-hidden="true"
													className={classNames(
														item.current
															? "text-indigo-600"
															: "text-gray-400 group-hover:text-indigo-600",
														"h-6 w-6 shrink-0"
													)}
												/>
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
				<button
					type="button"
					onClick={() => setSidebarOpen(true)}
					className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
				>
					<span className="sr-only">Open sidebar</span>
					<Bars3Icon aria-hidden="true" className="h-6 w-6" />
				</button>
				<div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
					Dashboard
				</div>
			</div>

			<main className="lg:pl-72">
				<div className="xl:pr-96">
					<div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
						{/* Main area */}

						<div className="border rounded-t-lg border-gray-200 bg-white px-4 py-5 sm:px-6">
							<h3 className="text-lg font-semibold leading-6 text-gray-900">
								Documents
							</h3>
						</div>
						<div className="text-md flex flex-col font-semibold">
							{documents.map((document) => (
								<div className="border py-8 pl-4 sm:pl-6 border-gray-200">
									<h1 className="text-purple-900">
										{document.name}
									</h1>
									<div className="flex items-center">
										<h1 className="text-sm text-gray-500">
											{document.type}
										</h1>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
