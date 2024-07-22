import React from "react";
import "./Contact.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createContact } from "../../services/ContactService";
import { toast } from "react-toastify";
export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const dataCreate = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      message: data.message,
      subject: data.subject,
    };
    const { success } = await createContact(dataCreate);
    console.log(success);
    if (success) {
      toast.success("Gửi liên hệ thành công");
      reset();
    } else {
      toast.error("Gửi liên hệ thất bại");
    }
  };
  return (
    <div className="Contact-container">
      <div className="Contact-content">
        <div className="Contact-content-title">
          <span>Liên hệ</span>
        </div>
        <div className="Contact-content-main">
          <div className="Contact-content-main-item ">
            <span>
              Trung tâm Ngoại ngữ và Tin học - Trường Đại học Thủy Lợi
            </span>
            <span>Địa chỉ: 175 Tây Sơn, Đống Đa, Hà Nội</span>
            <span>Điện thoại: 096 123 4567</span>
          </div>
          <div className="Contact-content-main-item ">
            <span className="title">
              Liên hệ đăng kí kiểm tra năng lực ngoại ngữ-tin học
            </span>
            <span>Di động: 096 123 4567</span>
          </div>
          <div className="Contact-content-main-item">
            <span className="title">
              Thời gian làm việc (từ thứ 2 đến thứ 6)
            </span>
            <span>Sáng: 8h30 - 11h30</span>
            <span>Chiều: 13h - 17h30</span>
          </div>
          <div
            className="Contact-content-main-item"
            style={{ width: "100%", borderBottom: "1px solid #d9d9d9" }}
          >
            <iframe
              srcDoc={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4830.248889734316!2d105.82241378878874!3d21.007421095669034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac8109765ba5%3A0xd84740ece05680ee!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaOG7p3kgbOG7o2k!5e0!3m2!1svi!2s!4v1715501630092!5m2!1svi!2s" width="100%" height="400" style="border:0;"  loading="lazy" ></iframe>`}
              width="100%"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="Contact-content-main-form p-2">
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3 col-6">
                <label className="col" htmlFor="formGroupExampleInput">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập họ tên"
                  {...register("name", {
                    required: "Họ và tên là bắt buộc",
                    minLength: {
                      value: 3,
                      message: "Họ và tên phải có ít nhất 3 ký tự",
                    },
                  })}
                />
                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>
              <div className="form-group mb-3 col-6">
                <label className="col" htmlFor="formGroupExampleInput">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Nhập địa chỉ"
                  {...register("address", {
                    required: "Địa chỉ là bắt buộc",
                    minLength: {
                      value: 3,
                      message: "Địa chỉ phải có ít nhất 3 ký tự",
                    },
                  })}
                />
                {errors.address && (
                  <span className="text-danger">{errors.address.message}</span>
                )}
              </div>
              <div className="form-group mb-3 col-6">
                <label htmlFor="formGroupExampleInput">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email không hợp lệ",
                    },
                    maxLength: {
                      value: 30,
                      message: "Email tối đa 30 ký tự",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>
              <div className="form-group mb-3 col-6">
                <label htmlFor="formGroupExampleInput">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Số điện thoại"
                  {...register("phone", {
                    required: "Số điện thoại là bắt buộc",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-danger">{errors.phone.message}</span>
                )}
              </div>
              <div className="form-group mb-3 col-12">
                <label htmlFor="formGroupExampleInput">Tiêu đề</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tiêu đề"
                  {...register("subject", {
                    required: "Tiêu đề là bắt buộc",
                    minLength: {
                      value: 3,
                      message: "Tiêu đề phải có nhất 3 ký tự",
                    },
                  })}
                />
                {errors.subject && (
                  <span className="text-danger">{errors.subject.message}</span>
                )}
              </div>
              <div className="form-group mb-3 col-12">
                <label htmlFor="formGroupExampleInput">Nội dung</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  {...register("message", {
                    required: "Nội dung là bắt buộc",
                    minLength: {
                      value: 3,
                      message: "Nội dung phải có nhất 3 ký tự",
                    },
                  })}
                ></textarea>
                {errors.message && (
                  <span className="text-danger">{errors.message.message}</span>
                )}
              </div>
              <div className="form-group mb-3 col-12 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "150px",
                    backgroundColor: "#273272",
                    color: "white",
                  }}
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
