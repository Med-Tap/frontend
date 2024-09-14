import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EmergencyInfo() {
  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    userEmail: "",
    userAddress: "",
    userZipCode: "",
    userState: "",
    userCountry: "",
    userRelationship: "",
  });

  // Handle initially loading the form
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/personal");
        setFormData({
          userName: response.data.userName,
          userPhone: response.data.userPhone,
          userEmail: response.data.userEmail,
          relationship: response.data.relationship,
          userAddress: response.data.userAddress,
          userCity: response.data.userZipCode,
          userZipCode: response.data.userZipCode,
          userState: response.data.userState,
          userCountry: response.data.userCountry,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      console.log(updatedData); // Print the updated form data
      return updatedData;
    });
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Emergency Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="userPhone"
                  name="userPhone"
                  type="tel"
                  autoComplete="tel"
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="userEmail"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="userEmail"
                      name="userEmail"
                      type="userEmail"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="relationship"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Relationship
              </label>
              <div className="mt-2">
                <select
                  id="relationship"
                  name="relationship"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                >
                  <option>Partner/Spouse</option>
                  <option>Parent/Guardian</option>
                  <option>Sibling</option>
                  <option>Friend</option>
                  <option>Colleague</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="userAddress"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="userAddress"
                  name="userAddress"
                  type="text"
                  autoComplete="userAddress"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="userCity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="userCity"
                  name="userCity"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="userState"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="userState"
                  name="userState"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="userZipCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="userZipCode"
                  name="userZipCode"
                  type="text"
                  autoComplete="userZipCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="userCountry"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="userCountry"
                  name="userCountry"
                  autoComplete="userCountry-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
