export default function UserAudit(){
    return(
        <div class="rounded-lg shadow-md">
                      <div class="w-full overflow-x-auto h-full rounded-lg">
                        <table class="w-full bg-white">
                          <thead class="bg-gray-200 ">
                            <tr class="bg-gray-200 border-b border-gray-400 text-sm text-left px-4">
                              <th class="py-3 px-4 border-b whitespace-nowrap">User</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">Performed By</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">Role</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">Status</th>
                              <th class="py-3 px-4 border-b whitespace-nowrap">Action</th>
                              <th class="py-3 px-4 border-b"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="border-b text-left">
                                <td class="py-2 px-4 whitespace-nowrap">user@gmail.com</td>
                                <td class="py-2 px-4 whitespace-nowrap">admin@gmail.com</td>
                                <td class="py-2 px-4 whitespace-nowrap">User</td>
                                <td class="py-2 px-4 whitespace-nowrap">
                                    <span class="text-red-800 bg-red-200 rounded-lg bg-opacity-100 p-2 font-medium">Inactive</span>
                                </td>
                                <td class="py-2 px-4 whitespace-nowrap">admin@gmail.com created user firstname lastname</td>
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