import { TotalAssets, InventoryChart } from "./Statistics/stats"

export default function AdminMain(){
    return(
        <div class="pt-22 py-6 px-14">
          <h3 class="text-xl font-semibold mb-4">Overview</h3>
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-white p-6 rounded-lg text-start border border-gray-200 shadow-lg">
              <h4 class="text-4xl font-lg font-russo ">1234</h4>
              <p class="text-base font-medium">Total Assets</p>
            </div>
            <div class="bg-white p-6 rounded-lg text-start border border-gray-200 shadow-lg">
              <h4 class="text-4xl font-lg font-russo ">5 item(s)</h4>
              <p class="text-base font-medium">Available Stock</p>
            </div>
            <div class="bg-white p-6 rounded-lg text-start border border-gray-200 shadow-lg">
              <h4 class="text-4xl font-lg font-russo ">5243</h4>
              <p class="text-base font-medium">Deployed Stock</p>
            </div>
            <div class="bg-white p-6 rounded-lg text-start border border-gray-200 shadow-lg">
              <h4 class="text-4xl font-lg font-russo ">5243</h4>
              <p class="text-base font-medium">Broken and Scrap Items</p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 p-2">
                <TotalAssets />
            </div>
            <div class="w-full md:w-1/2 p-2">
                 <InventoryChart />
            </div>
          </div>
      </div>
    )
}