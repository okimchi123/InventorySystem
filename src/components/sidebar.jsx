import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SideBar() {
    return (
        <div class="w-1/5 bg-blue-600 text-white h-screen p-4 fixed">
            <h1 class="text-4xl mb-6 mt-2 font-medium font-russo">E-Inventory</h1>
            <ul>
                <li class="mb-4">
                    <a
                        class="flex items-center hover:bg-blue-700 p-2 text-base font-medium rounded-lg"
                        href=""
                    >
                        <FontAwesomeIcon icon="tachometer-alt" className="mr-3" />
                        Dashboard
                    </a>
                </li>
                <li class="mb-4">
                    <a
                        class="flex items-center hover:bg-blue-700 p-2 text-base font-medium rounded-lg"
                        href=""
                    >
                        <FontAwesomeIcon icon="list-alt" className="mr-3" />
                        Audit Trail
                    </a>
                </li>
                <li class="mb-4">
                    <a
                        class="flex items-center hover:bg-blue-700 p-2 text-base font-medium rounded-lg"
                        href=""
                    >
                        <FontAwesomeIcon icon="warehouse" className="mr-3" />
                        Inventory Management
                    </a>
                </li>
                <li class="mb-4">
                    <a
                        class="flex items-center hover:bg-blue-700 p-2 text-base font-medium rounded-lg"
                        href=""
                    >
                        <FontAwesomeIcon icon="tools" className="mr-3" />
                        Asset Management
                    </a>
                </li>
                <li class="mb-4">
                    <a
                        class="flex items-center hover:bg-blue-700 p-2 text-base font-medium rounded-lg"
                        href=""
                    >
                        <FontAwesomeIcon icon="exclamation-triangle" className="mr-3" />
                        Broken Item List
                    </a>
                </li>
                <li class="mb-4">
                    <a
                        class="flex items-center hover:bg-blue-700 p-2 text-base font-medium rounded-lg"
                        href=""
                    >
                        <FontAwesomeIcon icon="recycle" className="mr-3" />
                        Scrap Item List
                    </a>
                </li>
                <li class="mb-4">
                    <a
                        class="flex items-center hover:bg-blue-700 p-2 text-base font-medium rounded-lg"
                        href=""
                    >
                        <FontAwesomeIcon icon="users" className="mr-3" />
                        User Management
                    </a>
                </li>
                <li class="mb-4">
                    <a
                        class="flex items-center hover:bg-blue-700 p-2 text-base font-medium rounded-lg"
                        href=""
                    >
                        <FontAwesomeIcon icon="user-tie" className="mr-3" />
                        Employee
                    </a>
                </li>
            </ul>
        </div>
    )
}