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
import ImmunizationTable from "../components/ImmunizationTable";
import hash from "../hash";
import { useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function dashboard(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPersonalInformation, setIsPersonalInformation] = useState(false);
  const [isEmergencyContact, setIsEmergencyContact] = useState(false);
  const [isAllergy, setIsAllergy] = useState(false);
  const [isImmunization, setIsImmunization] = useState(true);
  const [userRole, setUserRole] = useState("")

  const navigation = [
    {
      name: "Personal Information",
      href: "/dashboard",
      icon: UsersIcon,
      current: isPersonalInformation,
      roles: ["FIRST_RESPONDER", "MEDICAL_PROFESSIONAL", "PATIENT"],
    },
    {
      name: "Emergency Contact",
      href: "/emergency",
      icon: CalendarIcon,
      current: isEmergencyContact,
      roles: ["FIRST_RESPONDER", "MEDICAL_PROFESSIONAL", "PATIENT"],
    },
    {
      name: "Allergy",
      href: "/allergy",
      icon: DocumentDuplicateIcon,
      current: isAllergy,
      roles: ["FIRST_RESPONDER", "MEDICAL_PROFESSIONAL", "PATIENT"],
    },
    {
      name: "Immunizations",
      href: "/immunizations",
      icon: ChartPieIcon,
      current: isImmunization,
      roles: ["MEDICAL_PROFESSIONAL", "PATIENT"],
    },
  ];

  useEffect(() => {
    // Fetch the user role
    async function fetchHashId() {
        try {
           await fetch(`http://localhost:8080/user/hash/${hash.hashId}`)
           .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(`API error: ${errorData.message || 'Unknown error'}`);
                });
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
          // Extract `hashId` from the response data
          console.log("user in use-effect: ",data)
          const role = data.role; // Access the `hashId` property
          setUserRole(role)
      })
            
        } catch (error) {
            console.error("Failed to fetch hashId:", error);
        }
    }

    fetchHashId();
}, []); //

  const filteredNavigation = navigation.filter(item =>
    item.roles.includes(userRole) // Ensure the user has one of the roles specified for each item
  );


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
                  <div className="pb-2 flex items-center space-x-2">
                    <input
                      id="hashID"
                      name="hashID"
                      type="text"
                      placeholder="Enter the User NFC Key"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Search
                    </button>
                  </div>
                    <ul role="list" className="-mx-2 space-y-1">
                      {filteredNavigation.map((item) => (
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
                  <div className="flex items-center space-x-2">
                    <input
                      id="hashID"
                      name="hashID"
                      type="text"
                      placeholder="Enter the User NFC Key"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Search
                    </button>
                  </div>
                  {filteredNavigation.map((item) => (
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
              <li className="mt-auto pb-10">
                <a
                  href="/api/auth/logout"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-400 group-hover:text-indigo-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Log out
                </a>
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
            {<ImmunizationTable></ImmunizationTable>}
          </div>
        </div>
      </main>
    </div>
  );
}
