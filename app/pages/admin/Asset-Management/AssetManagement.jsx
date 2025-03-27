import AssetTable from "../../../components/Admin/Asset-Management/AssetTable";
import TopStat from "../../../components/Admin/Asset-Management/TopStat";

export default function AssetManagement() {
  return (
    <>
      <div class="pt-22 py-6 flex overflow-hidden flex-col gap-1 laptop:px-12 phone:px-4">
        <TopStat />
        <AssetTable />
      </div>
    </>
  );
}
