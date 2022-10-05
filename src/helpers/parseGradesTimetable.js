import {readFile} from "./readFile";
import Excel from "exceljs";

export const parseGradesTimetable = async (file) => {
  const buffer = await readFile(file)
  const workbook = new Excel.Workbook()
  const _file = await workbook.xlsx.load(buffer)
  const sheet = await _file.getWorksheet(1)

  const grades = []

  for (let row = 1; row <= sheet.rowCount; row++) {
    for (let column = 1; column <= sheet.columnCount; column++) {
      if (!sheet.getCell(row, column)?.text) {
        return;
      }

      const cellValue = sheet.getCell(row, column)?.text

      if (typeof cellValue === "string" && cellValue?.toLowerCase()?.includes(' класс') && cellValue !== sheet.getCell(row, column - 1)?.text) {
        grades.push({
          name: cellValue,
          timetable: Array.from({ length: 7 }).map((_, index) => (
            {
              subject: sheet.getCell(row + index + 1, column)?.text,
              classRoom: sheet.getCell(row + index + 1, column + 1)?.text,
            }
          ))
        })
      }
    }
  }

  return grades
}
