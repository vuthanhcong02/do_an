import { alignment, defaultDataType } from "export-xlsx";

export const SETTINGS_FOR_EXPORT_EXAM = {
  // Table settings
  fileName: "Danh sách thí sinh",
  workSheets: [
    {
      sheetName: `Danh sách thí sinh thi`,
      startingRowNumber: 2,
      gapBetweenTwoTables: 2,
      tableSettings: {
        table1: {
          tableTitle: `Danh sách thí sinh thi: `,
          style: {
            alignment: "CENTER",
            bold: true,
            margin: { top: 10, bottom: 10 },
          },
          headerDefinition: [
            {
              name: "#",
              key: "number",
              dataType: defaultDataType.NUMBER,
              alignment: alignment.CENTER,
              width: 5,
            },
            {
              name: "Số báo danh",
              key: "candidateNumber",
              dataType: defaultDataType.STRING,
              alignment: alignment.CENTER,
              width: 20,
            },
            {
              name: "Họ và tên",
              key: "fullName",
              dataType: defaultDataType.STRING,
              width: 40,
            },
            {
              name: "Email",
              key: "email",
              alignment: alignment.CENTER,
              width: 20,
            },
            {
              name: "Số điện thoại",
              key: "phone",
              dataType: defaultDataType.STRING,
              alignment: alignment.CENTER,
              width: 20,
            },
          ],
        },
      },
    },
  ],
};
