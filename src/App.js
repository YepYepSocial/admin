import React from "react";
import Excel from "exceljs";


function readFile(fileRes) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(fileRes)
    reader.onload = () => {
      resolve(reader.result)
    }
  })
}


function App() {
  const onChange = async (e) => {
    const buffer = await readFile(e.target.files[0])
    const workbook = new Excel.Workbook()
    const file = await workbook.xlsx.load(buffer)
    const sheet = await file.getWorksheet(1)

    for (let row = 1; row <= sheet.rowCount; row++) {
      for (let column = 1; column <= sheet.columnCount; column++) {
        const cellValue =  sheet.getCell(row, column).value

        if (typeof cellValue === "string" && cellValue.toLowerCase()?.includes('класс') && cellValue !== sheet.getCell(row, column - 1).value) {
          console.log({
            gradeName: sheet.getCell(row, column).value,
            classes: [
              {
                subject: sheet.getCell(row + 1, column).value,
                classRoom: sheet.getCell(row + 1, column + 1).value,
              },
              {
                subject: sheet.getCell(row + 2, column).value,
                classRoom: sheet.getCell(row + 2, column + 1).value,
              },
              {
                subject: sheet.getCell(row + 3, column).value,
                classRoom: sheet.getCell(row + 3, column + 1).value,
              },
              {
                subject: sheet.getCell(row + 4, column).value,
                classRoom: sheet.getCell(row + 4, column + 1).value,
              },
              {
                subject: sheet.getCell(row + 5, column).value,
                classRoom: sheet.getCell(row + 5, column + 1).value,
              },              {
                subject: sheet.getCell(row + 6, column).value,
                classRoom: sheet.getCell(row + 6, column + 1).value,
              },
              {
                subject: sheet.getCell(row + 7, column).value,
                classRoom: sheet.getCell(row + 7, column + 1).value,
              },
            ]
          })
        }
      }
    }
  }

  return (
    <div>
      <input type="file" onChange={onChange} />
    </div>
  );
}

export default App;
