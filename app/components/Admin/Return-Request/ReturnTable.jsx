import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 8;

export default function ReturnTable() {
   const [asset, setAsset] = useState([]);
   const [filteredAssets, setFilteredAssets] = useState(asset);
   const [searchQuery, setSearchQuery] = useState("");
   const [currentPage, setCurrentPage] = useState(0);

   const fetchAsset = useCallback(async () => {
     try {
       const token = localStorage.getItem("token");
       const res = await axios.get(
         "http://localhost:5000/api/distribute/returningAssets",
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       );
       setAsset(res.data);
     } catch (error) {
       console.error("Failed to fetch logs:", error);
     }
   }, []);

   const pageCount = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
   const paginatedLogs = filteredAssets.slice(
     currentPage * ITEMS_PER_PAGE,
     (currentPage + 1) * ITEMS_PER_PAGE
   );

   const handlePageClick = ({ selected }) => {
     setCurrentPage(selected);
   };
  
   useEffect(() => {
     fetchAsset();
   }, [fetchAsset]); 

   useEffect(() => {
    console.log("Updated asset:", asset);
  }, [asset]);

   useEffect(() => {
     const filtered = asset.filter((item) =>
       item.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.distributedToName.toLowerCase().includes(searchQuery.toLowerCase())
     );
     setFilteredAssets(filtered);
   }, [searchQuery, asset]);

  return (
      <div className="flex flex-col items-end justify-center w-full mx-auto">
        <div className="flex gap-3 mx-auto py-4 w-full">
          <input
            type="text"
            placeholder="Search product name or SN"
            className="py-2 px-3 w-[240px] border border-gray-700 shadow-sm sm:text-md outline-none rounded-2xl"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full overflow-x-auto h-full border border-gray-300 rounded-lg shadow-md">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-200 border-gray-400 text-md text-left px-4">
                <th className="py-3 px-4 whitespace-nowrap">Asset From</th>
                <th className="py-3 px-4 whitespace-nowrap">Product</th>
                <th className="py-3 px-4 whitespace-nowrap">
                  Product Serial Number
                </th>
                <th className="py-3 px-4 whitespace-nowrap text-center">Action</th>
                <th className="py-3 px-4 whitespace-nowrap">Request Date</th>                
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map((item) => (
                <tr
                 key={item._id}
                  className="text-left border-gray-300 border-b-[1px]"
                >
                  <td className="py-4 px-4 whitespace-nowrap">{item.distributedToName}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{item.productname}</td>
                  <td className="py-4 px-4">{item.serialnumber}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex flex-row justify-center py-2 gap-2">
                    <button
                        className="flex flex-row gap-2 cursor-pointer transition-all items-center border border-white  text-white px-4 py-2 rounded-full bg-green-400 hover:bg-green-600"      
                    >
                        Accept Request
                    </button>
                        <button
                        className="flex flex-row gap-2 cursor-pointer transition-all items-center border border-white  text-white px-4 py-2 rounded-full bg-red-400 hover:bg-red-600"      
                    >
                        Cancel
                    </button>
                  </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                     {moment(item.createdAt).format("MMMM D, YYYY h:mm A")} 
                  </td>
                </tr>
               ))} 
            </tbody>
          </table>
        </div>
         {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex items-center justify-center space-x-2 mt-3"
          pageClassName="rounded-md border text-blue-600 transition"
          pageLinkClassName="inline-block select-none px-3 py-2 w-full h-full cursor-pointer hover:bg-blue-500 hover:text-white rounded-md transition-all"
          activeClassName="bg-blue-500 text-white font-bold"
          previousClassName="rounded-md border-gray-400 font-semibold border select-none text-gray-600 transition"
          previousLinkClassName="inline-block select-none px-3 py-2 transition-all cursor-pointer hover:bg-gray-400 hover:text-white rounded-md"
          nextClassName="rounded-md border-gray-400 font-semibold border select-none text-gray-600 transition"
          nextLinkClassName="inline-block select-none px-3 py-2 transition-all cursor-pointer hover:bg-gray-400 hover:text-white rounded-md"
          breakClassName="text-gray-500"
          breakLinkClassName="inline-block px-3 py-2"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      )} 
      </div>
  );
}
