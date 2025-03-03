export default function AssetManagement() {
  return (
    <>
      <div class="pt-22 py-6 laptop:px-12 phone:px-4">
        {/* <!-- contents --> */}
        <div class="flex flex-col gap-1 items-end justify-center w-full mx-auto">
          <div class="flex flex-col gap-3 mx-auto py-4 w-full">
            {/* <!-- Filter --> */}
            <div class="flex laptop:flex-row phone:flex-col gap-2 w-full">
              <div class="flex justify-start">
                <form method="" class="flex flex-row items-center">
                  <select
                    name="filter"
                    id="filterSelect"
                    class="px-4 py-2 h-10 w-48 text-sm border border-gray-700 rounded-l-lg outline-none"
                  ></select>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search"
                    value
                    class="w-full h-10 p-2 border border-gray-700 shadow-sm sm:text-sm outline-none rounded-r-lg"
                  />
                </form>
              </div>
              <div class="flex ml-auto gap-2">
                <div class="flex flex-row gap-2">
                  <a href="distribute.html">
                    <button class="border border-black bg-orange-950 text-white px-4 py-2 rounded-lg">
                      <i class="fa-regular fa-folder-open"></i>
                      Distribute Asset
                    </button>
                  </a>
                  <button
                    id="openModalBtn1"
                    class="border border-black bg-blue-950 text-white px-4 py-2 rounded-lg"
                  >
                    <i class="fa-solid fa-circle-plus"></i>
                    Add New Asset
                  </button>
                </div>
              </div>
            </div>

            {/* <!-- Audit trail table --> */}
            <div class="rounded-lg shadow-md">
              <div class="w-full overflow-x-auto h-full rounded-lg">
                <table class="w-full bg-white">
                  <thead class="bg-gray-200 ">
                    <tr class="bg-gray-200 border-b border-gray-400 text-sm text-left px-4">
                      <th class="py-3 px-4 border-b">
                        <input
                          type="checkbox"
                          onclick="toggleSelectAll(this)"
                        />
                      </th>
                      <th class="py-3 px-4 border-b">Product Name</th>
                      <th class="py-3 px-4 border-b">Serial Number</th>
                      <th class="py-3 px-4 border-b">Description</th>
                      <th class="py-3 px-4 border-b">Asset Status</th>
                      <th class="py-3 px-4 border-b">Status</th>
                      <th class="py-3 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b text-left">
                      <td class="py-2 px-4 whitespace-nowrap">
                        <input type="checkbox" />
                      </td>
                      <td class="py-2 px-4 flex items-center space-x-2">
                        <img
                          alt="Image of Acer Aspire E1-571"
                          class="w-12 h-12"
                          height="50"
                          src="https://contents.spin.ph/image/resize/image/2022/02/07/hp-pavilion14-j-1644233459.webp"
                          width="50"
                        />
                        <span>Acer Aspire E1-571</span>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">120295</td>
                      <td class="py-2 px-4 whitespace-nowrap">1293</td>
                      <td class="py-2 px-4 whitespace-nowrap">
                        <select class="border rounded-lg p-2">
                          <option>Good Item</option>
                          <option>Broken Item</option>
                          <option>Scrap Item</option>
                        </select>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">Pending</td>

                      <td class="text-center space-x-2">
                        <div class="flex flex-row py-2 px-4 gap-2">
                          <button
                            id="openModalBtn2"
                            class="flex flex-row gap-2 items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full"
                          >
                            <i class="fa-solid fa-pen"></i>
                            Edit
                          </button>
                          <button class="flex flex-row gap-2 items-center border border-white shadow-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full">
                            <i class="fa-solid fa-trash"></i>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr class="border-b text-left">
                      <td class="py-2 px-4 whitespace-nowrap">
                        <input type="checkbox" />
                      </td>
                      <td class="py-2 px-4 flex items-center space-x-2">
                        <img
                          alt="Image of Acer Aspire E1-571"
                          class="w-12 h-12"
                          height="50"
                          src="https://contents.spin.ph/image/resize/image/2022/02/07/hp-pavilion14-j-1644233459.webp"
                          width="50"
                        />
                        <span>Acer Aspire E1-571</span>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">120295</td>
                      <td class="py-2 px-4 whitespace-nowrap">1293</td>
                      <td class="py-2 px-4 whitespace-nowrap">
                        <select class="border rounded-lg p-2">
                          <option>Good Item</option>
                          <option>Broken Item</option>
                          <option>Scrap Item</option>
                        </select>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">Pending</td>

                      <td class="text-center space-x-2">
                        <div class="flex flex-row py-2 px-4 gap-2">
                          <button
                            id="openModalBtn2"
                            class="flex flex-row gap-2 items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full"
                          >
                            <i class="fa-solid fa-pen"></i>
                            Edit
                          </button>
                          <button class="flex flex-row gap-2 items-center border border-white shadow-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full">
                            <i class="fa-solid fa-trash"></i>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr class="border-b text-left">
                      <td class="py-2 px-4 whitespace-nowrap">
                        <input type="checkbox" />
                      </td>
                      <td class="py-2 px-4 flex items-center space-x-2">
                        <img
                          alt="Image of Acer Aspire E1-571"
                          class="w-12 h-12"
                          height="50"
                          src="https://contents.spin.ph/image/resize/image/2022/02/07/hp-pavilion14-j-1644233459.webp"
                          width="50"
                        />
                        <span>Acer Aspire E1-571</span>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">120295</td>
                      <td class="py-2 px-4 whitespace-nowrap">1293</td>
                      <td class="py-2 px-4 whitespace-nowrap">
                        <select class="border rounded-lg p-2">
                          <option>Good Item</option>
                          <option>Broken Item</option>
                          <option>Scrap Item</option>
                        </select>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">Pending</td>

                      <td class="text-center space-x-2">
                        <div class="flex flex-row py-2 px-4 gap-2">
                          <button
                            id="openModalBtn2"
                            class="flex flex-row gap-2 items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full"
                          >
                            <i class="fa-solid fa-pen"></i>
                            Edit
                          </button>
                          <button class="flex flex-row gap-2 items-center border border-white shadow-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full">
                            <i class="fa-solid fa-trash"></i>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr class="border-b text-left">
                      <td class="py-2 px-4 whitespace-nowrap">
                        <input type="checkbox" />
                      </td>
                      <td class="py-2 px-4 flex items-center space-x-2">
                        <img
                          alt="Image of Acer Aspire E1-571"
                          class="w-12 h-12"
                          height="50"
                          src="https://contents.spin.ph/image/resize/image/2022/02/07/hp-pavilion14-j-1644233459.webp"
                          width="50"
                        />
                        <span>Acer Aspire E1-571</span>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">120295</td>
                      <td class="py-2 px-4 whitespace-nowrap">1293</td>
                      <td class="py-2 px-4 whitespace-nowrap">
                        <select class="border rounded-lg p-2">
                          <option>Good Item</option>
                          <option>Broken Item</option>
                          <option>Scrap Item</option>
                        </select>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">Pending</td>

                      <td class="text-center space-x-2">
                        <div class="flex flex-row py-2 px-4 gap-2">
                          <button
                            id="openModalBtn2"
                            class="flex flex-row gap-2 items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full"
                          >
                            <i class="fa-solid fa-pen"></i>
                            Edit
                          </button>
                          <button class="flex flex-row gap-2 items-center border border-white shadow-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full">
                            <i class="fa-solid fa-trash"></i>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
