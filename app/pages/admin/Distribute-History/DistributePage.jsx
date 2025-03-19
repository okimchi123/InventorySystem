import DistributeTable from "../../../components/Admin/audit/DistributeTable";
export default function DistributePage() {
  return (
    <div className="pt-22 py-6 flex flex-col gap-1 laptop:px-12 px-10 phone:px-4">
      <DistributeTable />
    </div>
  );
}