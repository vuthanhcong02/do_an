import React from "react";
import Table from "react-bootstrap/Table";
import "./TableSchedule.scss";
export default function TableSchedule({ course, schedules }) {
  return (
    <div className="TableSchedule-container">
      <h5 className="TableSchedule-title">Lịch khai giảng </h5>
      <div className="TableSchedule-content">
        <div className="TableSchedule-content-title">
          <span className="p-2 name_course">
            {course?.name} - Thời gian {course?.duration}
          </span>
        </div>
        <div className="TableSchedule-content-description p-2">
          <span className="fw-bold">Học phí:</span>
          <span> {course?.price}</span>
          <ul className="mt-2">
            <li>
              <span className="text-red">
                <b>Ưu đãi hiện hành:</b>
              </span>
              <ul>
                <li>
                  <strong>
                    Tặng 20% cho HV mới tham gia, học phí còn{" "}
                    <span className="price_discount">
                      10.800.000đ/trọn khoá
                    </span>
                  </strong>
                </li>
                <li>
                  <strong>
                    Tặng 25% cho HV đã từng học tại TT, học phí&nbsp;còn
                    <span className="price_discount">
                      10.100.000đ/trọn khoá
                    </span>
                  </strong>
                </li>
                <li>
                  <b className="price_discount">
                    Đăng ký nhóm từ 3 bạn giảm thêm 50.000đ/ HV
                  </b>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <strong className="course_level">Cấp độ:&nbsp;</strong>Dành cho
              người mới bắt đầu{" "}
              <em>(Yc:&nbsp;chỉ cần có&nbsp;kiến thức tin học cơ bản)</em>
            </li>
            <li>
              <strong>Các môn học trong chương trình:</strong>&nbsp;
              <a
                href="https://csc.edu.vn/data-analysis/Xu-ly-du-lieu-voi-bang-tinh-Excel_74"
                target="_blank"
              >
                <strong>Excel Fundamental for Data Analysis&nbsp;</strong>
              </a>
              (Xử lý dữ liệu với Excel) +&nbsp;
              <a
                href="https://csc.edu.vn/data-analysis/Phan-tich-du-lieu-voi-Excel_219"
                target="_blank"
              >
                <strong>
                  Data Analysis &amp; Visualization with Excel&nbsp;
                </strong>
              </a>
              (Phân tích và trực quan hóa dữ liệu với Excel) +&nbsp;
              <a
                href="https://csc.edu.vn/data-analysis/Phan-tich-va-truc-quan-hoa-du-lieu-voi-Power-BI-co-ban_220"
                target="_blank"
              >
                <strong>
                  Data Analysis &amp; Visualization with Power BI&nbsp;
                </strong>
              </a>
              (Phân tích và Trực quan hóa Dữ liệu với PowerBI cơ bản) +&nbsp;
              <a
                href="https://csc.edu.vn/data-analysis/Phan-tich-va-truc-quan-hoa-du-lieu-voi-Power-BI-nang-cao_222"
                target="_blank"
              >
                <strong>
                  Advanced Data Analysis with Power BI &amp; SQL&nbsp;
                </strong>
              </a>
              (Phân tích nâng cao với Power BI và SQL)
            </li>
          </ul>
        </div>
      </div>
      <Table bordered>
        <thead className="Schedule_header">
          <tr>
            <th>Lớp</th>
            <th>Thời gian</th>
            <th>Ngày khai giảng</th>
            <th>Địa điểm</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((item, index) => (
            <tr key={index}>
              <td>{item?.class?.name}</td>
              <td>
                Thứ {item?.day_of_week}({item?.start_end_time})
              </td>
              <td>{item?.course?.start_date}</td>
              <td>{item?.classroom?.name}</td>
              <td className="text-center">
                <button className="btn_register_course">Đăng kí</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
