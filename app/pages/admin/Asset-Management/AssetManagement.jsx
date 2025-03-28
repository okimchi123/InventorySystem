import AssetTable from "../../../components/Admin/Asset-Management/AssetTable";
import TopStat from "../../../components/Admin/Asset-Management/TopStat";

export default function AssetManagement() {
  return (
    <>
      <div class="pt-22 px-10 py-6 laptop:px-8 phone:px-4">
        <TopStat />
        <AssetTable />
      </div>
    </>
  );
}
