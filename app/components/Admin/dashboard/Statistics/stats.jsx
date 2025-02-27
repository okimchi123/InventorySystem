function TotalAssets() {
    return (
        <div class="flex flex-col gap-8 bg-white p-6 rounded-lg text-start border border-gray-200 shadow-lg">
            <div class="flex items-center space-x-2 justify-between">
                <div>
                    <h4 class="text-xl font-bold">Total Assets</h4>
                </div>
                <div>
                    <div class="relative inline-block w-48">
                        <button id="selectButton" class="flex items-center bg-amber-400 border border-black hover:bg-amber-600 shadow-md shadow-gray-400 text-black font-medium py-2 px-5 rounded w-full text-left">
                            Select an option
                            <i class="fa-solid fa-angle-down fa-sm pl-3"></i>
                        </button>
                        <div id="selectDropdown" class="absolute hidden bg-white text-gray-700 rounded shadow-lg mt-2 w-full z-10 border border-gray-300">
                            <a href="#" data-value="option1" class="block px-4 py-2 hover:bg-gray-100">Laptop</a>
                            <a href="#" data-value="option2" class="block px-4 py-2 hover:bg-gray-100">Cellphone</a>
                            <a href="#" data-value="option3" class="block px-4 py-2 hover:bg-gray-100">Monitor</a>
                        </div>
                        <input type="hidden" id="selectedValue" name="selectedValue" value="" />
                    </div>
                </div>
            </div>
            <div>
                <div class="container mx-auto">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </div>
    )
}
function InventoryChart() {
    return (
        <div class="bg-white p-6 rounded-lg text-start border border-gray-200 shadow-lg">
            <h4 class="text-xl font-bold mb-4">Inventory Chart</h4>
            <div class="font-sans leading-normal tracking-normal">
                <canvas id="invetorycpiechart"></canvas>
            </div>
        </div>
    )
}

export { TotalAssets, InventoryChart };