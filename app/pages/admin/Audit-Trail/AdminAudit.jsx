import AuditTable from "../../../components/Admin/audit/AuditTable"

export default function AuditTrail(){
    return(
        <div class="pt-22 py-6 laptop:px-12 px-10 phone:px-4">
          {/* <!-- contents --> */}
          <div class="flex flex-col gap-1 items-end justify-center w-full mx-auto">
            <div class="flex flex-col gap-3 mx-auto py-4 w-full">
              {/* <!-- Filter --> */}
              <div class="items-start w-full">
                <form method="GET" class="flex flex-row items-center">
                  <select
                    name="filter"
                    id="filterSelect"
                    class="px-4 py-2 h-10 w-48 text-sm border border-gray-700 rounded-l-lg outline-none"
                  ></select>
                  <input
                    type="text"
                    name="search"
                    id="searchInput"
                    placeholder="Search"
                    value
                    class="w-1/3 h-10 p-2 border border-gray-700 shadow-sm sm:text-sm outline-none rounded-r-lg"
                  />
                </form>
              </div>
             <AuditTable />
            {/* <!-- Pagination --> */}
            <div class="flex space-x-2">
              <button
                class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold"
              >
              <i class="fa-solid fa-angle-left"></i>
              </button>
              <button
                class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold"
              >
                1
              </button>
              <button
                class="border border-gray-300 rounded-lg px-4 py-2 hover:bg-blue-800 bg-blue-600 text-white font-medium"
              >
                2
              </button>
              <button
                class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold"
              >
                3
              </button>
              <button
                class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold"
              >
                4
              </button>
              <button
                class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold"
              >
                5
              </button>
              <button
                class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold"
              >
              <i class="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}