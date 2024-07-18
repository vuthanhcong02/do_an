import { alignment, defaultDataType } from "export-xlsx";

export const SETTINGS_FOR_EXPORT_COURSE = {
  // Table settings
  fileName: "Danh sách học viên",
  workSheets: [
    {
      sheetName: `Danh sách học viên`,
      startingRowNumber: 2,
      gapBetweenTwoTables: 2,
      tableSettings: {
        table1: {
          tableTitle: `Danh sách học viên: `,
          style: {
            alignment: alignment.CENTER,
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
              name: "Họ và tên",
              key: "fullName",
              dataType: defaultDataType.STRING,
              width: 40,
            },
            {
              name: "Giới tính",
              key: "gender",
              dataType: defaultDataType.STRING,
              width: 15,
            },
            {
              name: "Ngày sinh",
              key: "dateOfBirth",
              dataType: defaultDataType.DATE,
              width: 15,
            },
            {
              name: "Số CCCD",
              key: "identityNumber",
              dataType: defaultDataType.NUMBER,
              width: 15,
            },
            {
              name: "Email",
              key: "email",
              dataType: defaultDataType.STRING,
              alignment: alignment.CENTER,
              width: 20,
            },
            {
              name: "Số điện thoại",
              key: "phone",
              dataType: defaultDataType.NUMBER,
              alignment: alignment.CENTER,
              width: 20,
            },
            {
              name: "Địa chỉ",
              key: "address",
              dataType: defaultDataType.STRING,
              alignment: alignment.CENTER,
              width: 20,
            },
            {
              name: "Ngày đăng kí",
              key: "dateOfRegistration",
              dataType: defaultDataType.DATE,
              alignment: alignment.CENTER,
              width: 20,
            },
          ],
        },
      },
    },
  ],
};
