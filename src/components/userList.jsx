import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useFetchUsers from "./useFetchUsers";
import UserListItem from "./userListItem";
const {REACT_APP_API_URL} = process.env;


function UserList() {
  const [execute, users] = useFetchUsers(`${REACT_APP_API_URL}/users`);
  const [usersForDeletion, setUsersForDeletion] = useState([]);
  const history = useHistory();
  const checkUser = (id) => {
    setUsersForDeletion([...usersForDeletion, id]);
  };

  const uncheckUser = (index) => {
    const newArr = usersForDeletion.splice(index, 1);
    setUsersForDeletion(newArr);
  };

  const updateStatus = async (id, status) => {
    try {
      return await axios.post(
        `${REACT_APP_API_URL}/setUserStatus/${id}/${status}`
      );
    } catch (e) {
      throw e;
    }
  };

  const deleteUsers = async () => {
    try {
      if (usersForDeletion.length > 0) {
        await axios.delete(`${REACT_APP_API_URL}/deleteUsers`, {
          data: {
            ids: usersForDeletion,
          },
        });
        execute();
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="user-list">
      {users &&
        users.map((user, index) => {
          return (
            <UserListItem
              key={user._id}
              user={user}
              checkUser={checkUser}
              uncheckUser={uncheckUser}
              index={index}
              updateStatus={updateStatus}
            />
          );
        })}
      <div className="button-container">
        <button onClick={deleteUsers} className="custom-button">
          Delete
        </button>
        <button className="custom-button" onClick={()=> history.push("/add")}>Add User</button>
      </div>
    </div>
  );
}

export default UserList;
