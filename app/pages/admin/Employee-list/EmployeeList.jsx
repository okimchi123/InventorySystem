import EmployeeTable from "../../../components/Admin/Employee-List/EmployeeTable";

export default function EmployeeList() {
  return (
    <div className="pt-1 py-6 flex flex-col gap-1 laptop:px-12 px-10 phone:px-4">
      <EmployeeTable />
    </div>
  );
}