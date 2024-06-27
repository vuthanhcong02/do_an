import React, { useEffect, useState } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "./Userprofile.scss";
import { userInfo, updateProfile } from "../../services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrlImage } from "../../config";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && (file instanceof Blob || file instanceof File)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    } else {
      console.error("The selected file is not a valid Blob or File.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const { success, data } = await userInfo();
    if (success) {
      setUser(data);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("full_name", user?.full_name);
      setValue("phone", user?.phone);
      setValue("email", user?.email);
      setValue("address", user?.address);
      setValue("phone", user?.phone);
      setValue("id_card", user?.id_card);
      setValue("gender", user?.gender);
      setValue("object_type", user?.object_type);
      setValue("date_of_birthday", user?.date_of_birthday);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.avatar) {
      setImagePreview(`${baseUrlImage}${user.avatar}`);
    } else {
      setImagePreview(null);
    }
  }, [user, selectedImage]);
  const onSubmit = async (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("full_name", data?.full_name);
    formData.append("phone", data?.phone);
    formData.append("id_card", data?.id_card);
    formData.append("gender", data?.gender);
    formData.append("object_type", data?.object_type);
    formData.append("date_of_birthday", data?.date_of_birthday);
    formData.append("address", data?.address);
    formData.append("email", data?.email);
    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }

    try {
      const response = await axios.post(
        "http://api.ngoaingutinhoc.tech.com/api/auth/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Cập nhật user thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Cập nhật user thất bại");
    }
  };
  return (
    <div className="UserProfile-container container">
      <h4 className="UserProfile-title">Thông tin cá nhân</h4>
      <form
        className="col-12"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Form className="mt-4" as={Row}>
          <Col sm={6}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={3}>
                Họ và tên <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Họ và tên"
                  {...register("full_name", { required: true })}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Số CCCD <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Số CCCD"
                  {...register("id_card", { required: true })}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Địa chỉ <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Địa chỉ"
                  {...register("address", { required: true })}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Đối tượng <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  {...register("object_type", { required: true })}
                >
                  <option value="" disabled selected>
                    Chọn đối tượng
                  </option>
                  <option value="student">Học sinh/sinh viên</option>
                  <option value="worker">Người đi làm</option>
                  <option value="other">Khác</option>
                </select>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Email <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  readOnly
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Ngày sinh <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <input
                  className="form-control"
                  type="date"
                  placeholder="Ngày sinh"
                  {...register("date_of_birthday", { required: true })}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Giới tính <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <select
                  className="form-select "
                  {...register("gender", { required: true })}
                >
                  <option value="" disabled selected>
                    Select your gender
                  </option>
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                </select>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Số điện thoại <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Số điện thoại"
                  {...register("phone", { required: true })}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col
            sm={6}
            className="d-flex flex-column justify-content-start align-items-center"
          >
            <Image
              src={imagePreview ? imagePreview : `/_default-user.png`}
              roundedCircle
              height={220}
              width={220}
              className="object-fit-cover"
            />
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label className="mt-3 d-flex justify-content-center">
                Ảnh đại diện
              </Form.Label>
              <Form.Control
                type="file"
                size="sm"
                className="mt-3"
                {...register("avatar")}
                onChange={handleImageChange}
              />
            </Form.Group>
          </Col>

          <div className="d-flex justify-content-start align-items-center flex-column">
            <button className="btn_update" type="submit">
              Cập nhật
            </button>
          </div>
        </Form>
      </form>
    </div>
  );
}
