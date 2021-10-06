import React, { useEffect, useState } from "react";
import useToggle from './useToggle';
import { Checkbox, Grid, MenuItem, Menu, Select } from "@mui/material";
import { Edit } from "@mui/icons-material";

function UserListItem(props) {
  const { user, checkUser, uncheckUser, index, updateStatus } = props;
  const [stateUser, setStateUser] = useState(user);
  const [editMode, setEditMode] = useToggle(false);
  const [checked, setChecked] = useState(false);
  const [showPen, setShowPen] = useToggle(false);
  const options = ["Active", "Disabled", "Invited"];
  const optionsColors = {
    Active: "#68b667",
    Disabled: "#4881b0",
    Invited: "#4881b0",
  };
  const handleClickStatus = async (e) => {
    const status = e.target.value;
    updateStatus(stateUser._id, status);
    setStateUser({...stateUser, status });
    setEditMode(false);
  };

  const handleCheckForUser = (e) => {
    const state = e.target.checked;
    setChecked(state);
    if (state) checkUser(stateUser._id);
    else uncheckUser(index);
  };

  return (
    <Grid onMouseEnter={setShowPen} onMouseLeave={setShowPen} container className="user-list-item">
      <Grid className="user-list-delete" xs={1}>
        <Checkbox onChange={handleCheckForUser} checked={checked} />
      </Grid>
      <Grid className="user-list-name" xs={8}>
        <h4>{`${stateUser.firstName} ${stateUser.lastName}`}</h4>
      </Grid>
      <Grid className="user-list-status" xs={2}>
        <h4 style={{color: optionsColors[stateUser.status]}} hidden={editMode}>{stateUser.status}</h4>
        {editMode && (
          <Select
            hidden={false}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={stateUser.status}
            label="Age"
            onChange={handleClickStatus}
          >
            {options.map((option, index) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      </Grid>
      <Grid onClick={setEditMode} className="user-list-edit" xs={1}>
        {showPen && <Edit />}
      </Grid>
    </Grid>
  );
}

export default UserListItem;
