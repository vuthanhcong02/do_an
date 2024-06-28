import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  getContactById,
  updateContact,
} from "../../../services/ContactService";
import axios from "axios";
export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fetchContact();
  }, []);

  useEffect(() => {
    if (contact) {
      setValue("name", contact.name);
      setValue("email", contact.email);
      setValue("phone", contact.phone);
      setValue("address", contact.address);
      setValue("message", contact.message);
      setValue("subject", contact.subject);
      setValue("is_read", contact.is_read);
    }
  }, [contact]);
  const fetchContact = async () => {
    const { data } = await getContactById(id);
    setContact(data);
  };

  const onSubmit = async (data) => {
    const dataUpdate = {
      is_read: data.is_read,
    };

    try {
      const response = await axios.put(
        "http://api.ngoaingutinhoc.tech.com/api/contacts/" + id,
        dataUpdate
      );
      if (response.data.success) {
        navigate("/admin/contacts");
        toast.success("Cập nhật bản ghi thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Cập nhật bản ghi thất bại");
    }
  };
  return (
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
              <i className="pe-7s-ticket icon-gradient bg-mean-fruit"></i>
            </div>
            <div>
              Contacts
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
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Họ và tên
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      readOnly
                      {...register("name")}
                      placeholder="Họ và tên"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      readOnly
                      {...register("email")}
                      placeholder="Email"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Số điện thoại
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      readOnly
                      {...register("phone")}
                      placeholder="Số điện thoại"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Chủ đề
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      readOnly
                      {...register("subject")}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Nội dung
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <textarea
                      readOnly
                      {...register("message")}
                      className="form-control"
                      placeholder="Nội dung"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Trạng thái xử lí
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input type="checkbox" {...register("is_read")} />
                  </div>
                </div>
                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/contacts"
                      className="border-0 btn btn-outline-danger mr-1"
                    >
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Cancel</span>
                    </NavLink>

                    <button
                      type="submit"
                      className="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span className="btn-icon-wrapper pr-2 opacity-8">
                        <i className="fa fa-download fa-w-20"></i>
                      </span>
                      <span>Save</span>
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
