const ExcelJS = require("exceljs");
const Asset = require("../models/Asset");

const exportAssets = async (req, res) => {
    try {
      const assets = await Asset.find().select("productname serialnumber producttype createdAt");
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Assets");
  
      worksheet.columns = [
        { header: "Product Name", key: "productname", width: 20 },
        { header: "Serial Number", key: "serialnumber", width: 20 },
        { header: "Product Type", key: "producttype", width: 20 },
        { header: "Created At", key: "createdAt", width: 25 },
      ];
  
      assets.forEach((asset) => {
        worksheet.addRow({
          productname: asset.productname,
          serialnumber: asset.serialnumber,
          producttype: asset.producttype,
          createdAt: new Date(asset.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
        });
      });
  
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attachment; filename=assets.xlsx");
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error("Error exporting assets:", error);
      res.status(500).json({ message: "Error exporting assets" });
    }
  };

  module.exports = { exportAssets }