const ExcelJS = require("exceljs");
const Asset = require("../models/Asset");
const XLSX = require("xlsx");

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

  const importAssets = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      const assetsToInsert = [];
      const duplicateSerials = [];
  
      for (const row of jsonData) {
        const serialnumber = row["Serial Number"];
        
        // Check if asset already exists
        const existingAsset = await Asset.findOne({ serialnumber });
  
        if (existingAsset) {
          duplicateSerials.push(serialnumber);
        } else {
          assetsToInsert.push({
            productname: row["Product Name"],
            producttype: row["Product Type"],
            serialnumber,
            description: row["Description"],
            condition: row["Condition"] || "Pending",
          });
        }
      }
  
      // Insert only new assets
      if (assetsToInsert.length > 0) {
        await Asset.insertMany(assetsToInsert);
      }
  
      if (duplicateSerials.length > 0) {
        return res.status(400).json({ 
          message: "Some serial numbers are already used",
          duplicates: duplicateSerials
        });
      }
  
      res.json({ 
        message: "Assets imported successfully", 
        imported: assetsToInsert.length 
      });
  
    } catch (error) {
      console.error("Import Error:", error.message, error.stack);
      res.status(500).json({ message: "Error importing assets", error: error.message });
    }
  };
  
  module.exports = { exportAssets, importAssets }