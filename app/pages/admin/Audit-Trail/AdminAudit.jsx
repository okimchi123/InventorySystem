import AssetHistory from "../../../components/Admin/audit/AssetHistory";
export default function AuditTrail() {

  return (
    <div className="pt-1 py-6 flex flex-col gap-1 laptop:px-12 px-10 phone:px-4">
      <AssetHistory />
    </div>
  );
}
