import EmployeeTable from "../../../components/Admin/Employee-List/EmployeeTable";

export default function EmployeeList() {
  return (
    <div className="pt-22 py-6 flex flex-col gap-1 laptop:px-8 px-8 phone:px-4">
      <EmployeeTable /> 
    </div>
  );
}