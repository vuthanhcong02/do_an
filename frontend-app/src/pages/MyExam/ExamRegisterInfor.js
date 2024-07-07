import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";
import { baseUrlImage } from "../../config";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "/fonts/Roboto-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },

  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },

  titleContainer: { flexDirection: "row", marginTop: 44 },

  logo: { width: 280 },
  avatar: { width: 120, height: 120, border: "1px solid #dee2e6" },
  reportTitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#3E3E3E",
  },

  titleCard: {
    fontFamily: "Roboto",
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  information: { flex: 1, justifyContent: "start", marginLeft: 50 },
  addressTitle: { fontSize: 11, fontStyle: "bold" },
  name: {
    fontFamily: "Roboto",
    flexDirection: "row",
    fontSize: 11,
    justifyContent: "start",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    width: 120, // Cố định chiều rộng cho các nhãn
  },

  text: { fontSize: 12 },

  address: { fontWeight: 400, fontSize: 10 },
});

export const ExamRegister = ({ exam }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <View style={styles.spaceBetween}>
            <Image style={styles.logo} src="/logo2.png" />
          </View>
        </View>
        <View style={styles.titleCard}>
          <Text style={styles.reportTitle}>THẺ DỰ THI</Text>
        </View>
        <View style={styles.titleContainer}>
          <View>
            <Image
              style={styles.avatar}
              src={`${baseUrlImage}${exam?.user?.avatar}`}
            />
          </View>
          <View style={styles.information}>
            <View style={styles.name}>
              <Text style={styles.label}>Họ và tên:</Text>
              <Text style={styles.text}>{exam?.user?.full_name}</Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.label}>Số báo danh:</Text>
              <Text style={styles.text}>{exam?.registration_number}</Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.label}>Ngày sinh:</Text>
              <Text style={styles.text}>
                {moment(exam?.user?.date_of_birthday).format("DD-MM-YYYY")}
              </Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.label}>Phòng thi:</Text>
              <Text style={styles.text}>{exam?.exam?.classroom?.name}</Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.label}>Thời gian:</Text>
              <Text style={styles.text}>
                {exam?.exam?.start_at}-{exam?.exam?.end_at}
              </Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.label}>Ngày thi:</Text>
              <Text style={styles.text}>
                {moment(exam?.exam?.date).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const ExamRegisterInfor = ({ exam }) => {
  return (
    <PDFViewer width="1000" height="650">
      <ExamRegister exam={exam} />
    </PDFViewer>
  );
};
