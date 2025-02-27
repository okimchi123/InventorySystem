export default function AuditTable(){
    return(
        <div class="w-full overflow-x-auto h-full border border-gray-300 rounded-lg shadow-md">
                  <table class="w-full bg-white">
                    <thead>
                      <tr class="bg-gray-200 border-b border-gray-400 text-sm text-left px-4">
                        <th class="py-3 px-4 whitespace-nowrap">
                          Date
                        </th>
                        <th class="py-3 px-4 whitespace-nowrap">User</th>
                        <th class="py-3 px-4 whitespace-nowrap">Time In</th>
                        <th class="py-3 px-4 whitespace-nowrap">Time Out</th>
                        <th class="py-3 px-4 whitespace-nowrap">Action</th>
                      </tr> 
                    </thead>
                    <tbody>
                      <tr class=" border-b">
                        <td class="py-5 px-4 whitespace-nowrap">10-23-2025</td>
                        <td class="py-5 px-4 whitespace-nowrap">
                          moderator@gmail.com
                        </td>
                        <td class="py-5 px-4 whitespace-nowrap">8:00 AM</td>
                        <td class="py-5 px-4 whitespace-nowrap">8:00 PM</td>
                        <td class="py-5 px-4 whitespace-nowrap">
                          Added new assets
                        </td>
                      </tr>
                      <tr class=" border-b">
                        <td class="py-5 px-4 whitespace-nowrap">10-23-2025</td>
                        <td class="py-5 px-4 whitespace-nowrap">
                          moderator@gmail.com
                        </td>
                        <td class="py-5 px-4 whitespace-nowrap">8:00 AM</td>
                        <td class="py-5 px-4 whitespace-nowrap">8:00 PM</td>
                        <td class="py-5 px-4 whitespace-nowrap">
                          Added new assets
                        </td>
                      </tr>
                      <tr class=" border-b">
                        <td class="py-5 px-4 whitespace-nowrap">10-23-2025</td>
                        <td class="py-5 px-4 whitespace-nowrap">
                          moderator@gmail.com
                        </td>
                        <td class="py-5 px-4 whitespace-nowrap">8:00 AM</td>
                        <td class="py-5 px-4 whitespace-nowrap">8:00 PM</td>
                        <td class="py-5 px-4 whitespace-nowrap">
                          Added new assets
                        </td>
                      </tr>
                      <tr>
                        <td class="py-5 px-4 whitespace-nowrap">10-23-2025</td>
                        <td class="py-5 px-4 whitespace-nowrap">
                          moderator@gmail.com
                        </td>
                        <td class="py-5 px-4 whitespace-nowrap">8:00 AM</td>
                        <td class="py-5 px-4 whitespace-nowrap">8:00 PM</td>
                        <td class="py-5 px-4 whitespace-nowrap">
                          Added new assets
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
    )
}