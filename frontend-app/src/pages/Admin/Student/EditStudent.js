import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../services/UserService";
import { baseUrlImage } from "../../../config";
import { toast } from "react-toastify";
import axios from "axios";
export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    setSelectedImage(event.target.files[0]);
  };

  const fetchUser = async () => {
    const { success, data } = await getUser(id);
    if (success) {
      setUser(data);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("object_type", user.object_type);
      setValue("date_of_birthday", user.date_of_birthday);
      setValue("gender", user.gender);
      setValue("full_name", user.full_name);
      setValue("id_card", user.id_card);
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("address", user.address);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.avatar) {
      setImagePreview(`${baseUrlImage}${user?.avatar}`);
    } else {
      setImagePreview(`/_default-user.png`);
    }
  }, [user, selectedImage]);

  const onSubmit = async (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("_method", "PUT");
    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }
    formData.append("object_type", data.object_type);
    formData.append("date_of_birthday", data.date_of_birthday);
    formData.append("gender", data.gender);
    formData.append("full_name", data.full_name);
    formData.append("id_card", data.id_card);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    try {
      const response = await axios.post(
        `http://api.ngoaingutinhoc.tech.com/api/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Cập nhật user thành công");
        navigate("/admin/users");
      } else {
        toast.error("Cập nhật user thất bại");
      }
    } catch (error) {
      toast.error("Cập nhật user thất bại");
    }
  };
  return (
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
              <i className="pe-7s-ticket icon-gradient bg-mean-fruit" />
            </div>
            <div>
              User
              <div className="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="position-relative row form-group">
                  <label
                    htmlFor="image"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Hình ảnh
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <img
                      style={{ height: 200, cursor: "pointer" }}
                      className="thumbnail rounded-circle"
                      data-toggle="tooltip"
                      title="Click to change the image"
                      data-placement="bottom"
                      src={
                        imagePreview
                          ? imagePreview
                          : `${baseUrlImage}${user?.avatar}`
                      }
                      alt="Avatar"
                    />
                    <input
                      name="image"
                      type="file"
                      {...register("avatar")}
                      onChange={handleImageChange}
                      className="image form-control-file"
                    />

                    <small className="form-text text-muted">
                      Click on the image to change (required)
                    </small>
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="name"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Họ và tên
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      required
                      {...register("full_name", {
                        required: "Họ và tên bắt buộc phải nhập!",
                        minLength: {
                          value: 3,
                          message: "Họ và tên phải ít nhất 3 kí tự",
                        },
                        maxLength: {
                          value: 255,
                          message: "Họ và tên không quá 255 kí tự",
                        },
                      })}
                      placeholder="Họ và tên"
                      type="text"
                      className="form-control"
                    />

                    {errors.full_name && (
                      <span className="text-danger">
                        {errors.full_name.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="level"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Giới tính
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      required
                      {...register("gender", {
                        required: "Giới tính bắt buộc phải chọn!",
                      })}
                      className="form-control"
                    >
                      <option value>-- Chọn giới tính --</option>
                      <option value={1}>Nam</option>
                      <option value={0}>Nữ</option>
                      <option value={2}>Khác</option>
                    </select>

                    {errors.gender && (
                      <span className="text-danger">
                        {errors.gender.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="email"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      required
                      {...register("email", {
                        required: "Email bắt buộc phải nhập!",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email phải định dạng",
                        },
                        maxLength: {
                          value: 255,
                          message: "Email không vượt quá 255 kí tự",
                        },
                      })}
                      placeholder="Email"
                      type="email"
                      className="form-control"
                    />

                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="town_city"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Ngày sinh
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      required
                      {...register("date_of_birthday", {
                        required: "Ngày sinh bắt buộc phải nhập!",
                      })}
                      placeholder="Ngày sinh"
                      type="date"
                      className="form-control"
                    />

                    {errors.date_of_birthday && (
                      <span className="text-danger">
                        {errors.date_of_birthday.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="town_city"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Số CCCD
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      required
                      {...register("id_card", {
                        required: "Số CCCD bắt buộc phải nhập!",
                        minLength: {
                          value: 12,
                          message: "Số CCCD phải là 12 số",
                        },
                        number: {
                          value: true,
                          message: "Số CCCD phải là số",
                        },
                      })}
                      placeholder="Số CCCD"
                      type="text"
                      className="form-control"
                    />

                    {errors.id_card && (
                      <span className="text-danger">
                        {errors.id_card.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="town_city"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Địa chỉ
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      required
                      {...register("address", {
                        required: "Địa chỉ bắt buộc phải nhập!",
                      })}
                      placeholder="Địa chỉ"
                      type="text"
                      className="form-control"
                    />

                    {errors.address && (
                      <span className="text-danger">
                        {errors.address.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="phone"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Phone
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      required
                      {...register("phone", {
                        required: "Số điện thoại bắt buộc phải điền!",
                        pattern: {
                          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                          message: "Số điện thoại phải đúng định dạng",
                        },
                      })}
                      placeholder="Số điện thoại"
                      type="tel"
                      className="form-control"
                    />

                    {errors.phone && (
                      <span className="text-danger">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="level"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Đối tượng
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      required
                      {...register("object_type", {
                        required: "Đối tượng bắt buộc phải chọn!",
                      })}
                      className="form-control"
                    >
                      <option value>-- Chọn đối tượng --</option>
                      <option value="student">Học sinh/Sinh viên</option>
                      <option value="worker">Người đi làm</option>
                      <option value="other">Khác</option>
                    </select>

                    {errors.object_type && (
                      <span className="text-danger">
                        {errors.object_type.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      to="/admin/users"
                      // onClick={() => navigate(-1)}
                      className="border-0 btn btn-outline-danger mr-1"
                    >
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Hủy</span>
                    </NavLink>
                    <button
                      type="submit"
                      className="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span className="btn-icon-wrapper pr-2 opacity-8">
                        <i className="fa fa-download fa-w-20" />
                      </span>
                      <span>Lưu</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
