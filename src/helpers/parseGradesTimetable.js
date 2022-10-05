import {readFile} from "./readFile";
import Excel from "exceljs";

const getCellText = (cell) => {
  return cell.value !== null ? cell.text : '-'
}

export const parseGradesTimetable = async (file) => {
  const buffer = await readFile(file)
  const workbook = new Excel.Workbook()
  const _file = await workbook.xlsx.load(buffer)
  const sheet = await _file.getWorksheet(1)

  const grades = []

  for (let row = 1; row <= sheet.rowCount; row++) {
    for (let column = 1; column <= sheet.columnCount; column++) {
      try {
        const cellValue = getCellText(sheet.getCell(row, column))

        if (grades.find((grade) => grade.name === cellValue)) {
          continue
        }

        if (cellValue?.toLowerCase()?.includes(' класс')) {
          grades.push({
            name: cellValue,
            timetable: Array.from({ length: 7 }).map((_, index) => {
              return {
                subject: getCellText(sheet.getCell(row + index + 1, column)),
                classRoom: getCellText(sheet.getCell(row + index + 1, column + 1)),
              }
            })
          })
        }
      } catch {
        continue
      }
    }
  }

  return grades
}
