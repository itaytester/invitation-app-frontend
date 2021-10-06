import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
const {REACT_APP_API_URL} = process.env;

function AddUser() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const submitForm = async (data) => {
    try {
      await axios.post(`${REACT_APP_API_URL}/addUser`, data );
      history.push("/");
    } catch (e) {
      throw e;
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="user-form">
      <label className="custom-input-label">User Name</label>
      <input
        {...register("firstName")}
        className="custom-input"
        placeholder="Enter First Name"
        type="text"
      />
      <label className="custom-input-label">Last Name</label>
      <input
        {...register("lastName")}
        className="custom-input"
        placeholder="Enter Last Name"
        type="text"
      />
      <label className="custom-input-label">Email</label>
      <input
        {...register("email")}
        className="custom-input"
        placeholder="Enter Email"
        type="text"
      />
      <div className="button-container">
        <input className="custom-button" type="submit" value="Done" />
      </div>
    </form>
  );
}

export default AddUser;
