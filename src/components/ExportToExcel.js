import React from 'react'
import * as FileSaver from "file-saver";
import * as xlsx from "xlsx";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = xlsx.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button className="btn btn-warning" onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
  );
};