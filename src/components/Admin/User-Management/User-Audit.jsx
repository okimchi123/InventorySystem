export default function UserAudit(){
    return(
        <div class="rounded-lg shadow-md">
                      <div class="w-full overflow-x-auto h-full rounded-lg">
                        <table class="w-full bg-white">
                          <thead class="bg-gray-200 ">
                            <tr class="bg-gray-200 border-b border-gray-400 text-sm text-left px-4">
                              <th class="py-3 px-4 border-b whitespace-nowrap">ID</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">First Name</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">Last Name</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">Position</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">Email</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">Contact Number</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">Status</th>
                              <th class="py-3 px-4 border-b"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="border-b text-left">
                                <td class="py-2 px-4 whitespace-nowrap">0001</td>
                                <td class="py-2 px-4 whitespace-nowrap">Miko</td>
                                <td class="py-2 px-4 whitespace-nowrap">Basilio</td>
                                <td class="py-2 px-4 whitespace-nowrap">IT Assistant</td>
                                <td class="py-2 px-4 whitespace-nowrap">Miko@gmail.com</td>
                                <td class="py-2 px-4 whitespace-nowrap">09990874663</td>
                                <td class="py-2 px-4 whitespace-nowrap">
                                    <span class="text-green-800 bg-green-200 rounded-lg bg-opacity-100 p-2 font-medium">Active</span>
                                </td>
                                <td class="text-center space-x-2">
                                    <div class="flex flex-row py-2 px-4 gap-1">
                                        <button class="flex flex-row gap-2 items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full">
                                            <i class="fa-solid fa-pen"></i>Edit
                                        </button>
                                        <button class="flex flex-row gap-2 items-center border border-white shadow-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full">
                                            <i class="fa-solid fa-trash"></i>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b text-left">
                                <td class="py-2 px-4 whitespace-nowrap">0001</td>
                                <td class="py-2 px-4 whitespace-nowrap">Miko</td>
                                <td class="py-2 px-4 whitespace-nowrap">Basilio</td>
                                <td class="py-2 px-4 whitespace-nowrap">IT Assistant</td>
                                <td class="py-2 px-4 whitespace-nowrap">Miko@gmail.com</td>
                                <td class="py-2 px-4 whitespace-nowrap">09990874663</td>
                                <td class="py-2 px-4 whitespace-nowrap">
                                    <span class="text-red-900 bg-red-100 rounded-lg bg-opacity-100 p-2 font-medium">Inactive</span>
                                </td>
                                <td class="text-center space-x-2">
                                    <div class="flex flex-row py-2 px-4 gap-1">
                                        <button class="flex flex-row gap-2 items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full">
                                            <i class="fa-solid fa-pen"></i>Edit
                                        </button>
                                        <button class="flex flex-row gap-2 items-center border border-white shadow-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full">
                                            <i class="fa-solid fa-trash"></i>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b text-left">
                                <td class="py-2 px-4 whitespace-nowrap">0001</td>
                                <td class="py-2 px-4 whitespace-nowrap">Miko</td>
                                <td class="py-2 px-4 whitespace-nowrap">Basilio</td>
                                <td class="py-2 px-4 whitespace-nowrap">IT Assistant</td>
                                <td class="py-2 px-4 whitespace-nowrap">Miko@gmail.com</td>
                                <td class="py-2 px-4 whitespace-nowrap">09990874663</td>
                                <td class="py-2 px-4 whitespace-nowrap">
                                    <span class="text-gray-900 bg-gray-200 rounded-lg bg-opacity-100 p-2 font-medium">Deactivated</span>
                                </td>
                                <td class="text-center space-x-2">
                                    <div class="flex flex-row py-2 px-4 gap-1">
                                        <button class="flex flex-row gap-2 items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full">
                                            <i class="fa-solid fa-pen"></i>Edit
                                        </button>
                                        <button class="flex flex-row gap-2 items-center border border-white shadow-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full">
                                            <i class="fa-solid fa-trash"></i>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b text-left">
                                <td class="py-2 px-4 whitespace-nowrap">0001</td>
                                <td class="py-2 px-4 whitespace-nowrap">Miko</td>
                                <td class="py-2 px-4 whitespace-nowrap">Basilio</td>
                                <td class="py-2 px-4 whitespace-nowrap">IT Assistant</td>
                                <td class="py-2 px-4 whitespace-nowrap">Miko@gmail.com</td>
                                <td class="py-2 px-4 whitespace-nowrap">09990874663</td>
                                <td class="py-2 px-4 whitespace-nowrap">
                                    <span class="text-green-800 bg-green-200 rounded-lg bg-opacity-100 p-2 font-medium">Active</span>
                                </td>
                                <td class="text-center space-x-2">
                                    <div class="flex flex-row py-2 px-4 gap-1">
                                        <button class="flex flex-row gap-2 items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full">
                                            <i class="fa-solid fa-pen"></i>Edit
                                        </button>
                                        <button class="flex flex-row gap-2 items-center border border-white shadow-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full">
                                            <i class="fa-solid fa-trash"></i>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
    )
}