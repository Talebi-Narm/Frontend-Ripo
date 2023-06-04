import "./style.scss";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import showToast from "../../Components/Toast";

const currencies = [
  {
    value: "Associate",
    label: "Associate",
  },
  {
    value: "Bachelor",
    label: "Bachelor",
  },
  {
    value: "Master",
    label: "Master",
  },
  {
    value: "Doctoral",
    label: "Doctoral",
  },
];

export default function NewUser(props) {
  const [value, setValue] = React.useState(null);
  const initialPrimaryFormData = Object.freeze({
    id: "",
    type: "",
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
  });
  const initialSecondaryFormData = Object.freeze({
    id: "",
    id_code: "",
    is_online: "",
    rate: "",
    user: "",
    birth_date: "",
    degree: "",
    major: "",
    phone_number: "",
    about: "",
    address: "",
  });
  const [formData, updateFormData] = useState(initialPrimaryFormData);
  const [secondaryFormData, updateSecondaryFormData] = useState(
    initialSecondaryFormData
  );
  const [errorData, updateErrorData] = useState(initialPrimaryFormData);
  const [secondaryerrorData, updateSecondaryErrorData] = useState(
    initialSecondaryFormData
  );
  const [primaryConfirmation, setPrimaryConfirmation] = useState(false);
  const [primaryAccepted, setPrimaryAccepted] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(props.match.params.userId);
  }, []);

  useEffect(() => {
    if (userId !== "") {
      fetch(`http://127.0.0.1:8000/api/specialist/primary/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          updateFormData(data);
        });
      fetch(`http://127.0.0.1:8000/api/specialist/secondary/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          updateSecondaryFormData(data);
        });
    }
  }, [userId]);

  useEffect(() => {
    updateSecondaryErrorData({
      ...secondaryerrorData,
      birth_date: "",
    });
    updateSecondaryErrorData({
      ...secondaryerrorData,
      degree: "",
    });
    updateSecondaryErrorData({
      ...secondaryerrorData,
      major: "",
    });
    updateSecondaryErrorData({
      ...secondaryerrorData,
      phone_number: "",
    });
    updateSecondaryErrorData({
      ...secondaryerrorData,
      about: "",
    });
    updateSecondaryErrorData({
      ...secondaryerrorData,
      address: "",
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_code: "",
        is_online: true,
        rate: 0,
        birth_date: secondaryFormData.birth_date,
        degree: secondaryFormData.degree,
        major: secondaryFormData.major,
        phone_number: secondaryFormData.phone_number,
        about: secondaryFormData.about,
        address: secondaryFormData.address,
      }),
    };
    fetch(
      `http://127.0.0.1:8000/api/specialist/update-secondary/${userId}/`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          showToast("Specialist updated!", "success");
        } else {
          throw response;
        }
      })
      .catch((err) => {
        err.text().then((errorMessage) => {
          const errors = JSON.parse(errorMessage);

          if (errors.birth_date !== undefined) {
            updateSecondaryErrorData({
              ...secondaryerrorData,
              birth_date: errors.birth_date,
            });
            return;
          }

          if (errors.degree !== undefined) {
            updateSecondaryErrorData({
              ...secondaryerrorData,
              degree: errors.degree,
            });
            return;
          }

          if (errors.major !== undefined) {
            updateSecondaryErrorData({
              ...secondaryerrorData,
              major: errors.major,
            });
            return;
          }

          if (errors.phone_number !== undefined) {
            updateSecondaryErrorData({
              ...secondaryerrorData,
              phone_number: errors.phone_number,
            });
            return;
          }

          if (errors.about !== undefined) {
            updateSecondaryErrorData({
              ...secondaryerrorData,
              about: errors.about,
            });
            return;
          }

          if (errors.address !== undefined) {
            updateSecondaryErrorData({
              ...secondaryerrorData,
              address: errors.address,
            });
          }
        });
      });
  }, [primaryAccepted]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    updateErrorData({
      ...errorData,
      [e.target.name]: "",
    });
  };

  useEffect(() => {}, [secondaryFormData]);

  const handleChangeSecondary = (e) => {
    updateSecondaryFormData({
      ...secondaryFormData,
      [e.target.name]: e.target.value.trim(),
    });
    updateSecondaryErrorData({
      ...secondaryerrorData,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!primaryAccepted) {
      setPrimaryAccepted(true);
    } else {
      setPrimaryConfirmation(!primaryConfirmation);
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Edit Specialist</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <TextField
            id="standard-basic"
            name="email"
            label="Email"
            variant="standard"
            type="email"
            helperText={errorData.email !== "" ? errorData.email : ""}
            onChange={handleChange}
            value={formData.email}
            disabled
          />
        </div>
        <div className="newUserItem">
          <TextField
            name="user_name"
            id="standard-basic"
            label="user_name"
            variant="standard"
            type="text"
            helperText={errorData.user_name !== "" ? errorData.user_name : ""}
            onChange={handleChange}
            value={formData.user_name}
            disabled
          />
        </div>
        <div className="newUserItem">
          <TextField
            name="first_name"
            id="standard-basic"
            label="First Name"
            variant="standard"
            type="text"
            helperText={errorData.first_name !== "" ? errorData.first_name : ""}
            onChange={handleChange}
            value={formData.first_name}
            disabled
          />
        </div>
        <div className="newUserItem">
          <TextField
            name="last_name"
            id="standard-basic"
            label="Last Name"
            variant="standard"
            type="text"
            helperText={errorData.last_name !== "" ? errorData.last_name : ""}
            value={formData.last_name}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="newUserItem">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              name="birth_date"
              label="Birth Date"
              value={
                value === null ? new Date(secondaryFormData.birth_date) : value
              }
              onChange={(newValue) => {
                setValue(newValue);
                updateSecondaryFormData({
                  ...secondaryFormData,
                  birth_date: moment(newValue).format("YYYY-MM-DD"),
                });
              }}
              formatDate={(date) => moment(date).format("YYYY-MM-DD")}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  {...params}
                  name="birth_date"
                  helperText={
                    secondaryerrorData.birth_date !== ""
                      ? secondaryerrorData.birth_date
                      : ""
                  }
                  value={
                    value === null
                      ? new Date(secondaryFormData.birth_date)
                      : value
                  }
                  onChange={handleChangeSecondary}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="newUserItem">
          <TextField
            name="degree"
            id="standard-select-currency-native"
            select
            label="Degree"
            value={secondaryFormData.degree}
            onChange={handleChangeSecondary}
            SelectProps={{
              native: true,
            }}
            variant="standard"
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            onChange={handleChangeSecondary}
          </TextField>
        </div>
        <div className="newUserItem">
          <TextField
            name="major"
            id="standard-basic"
            label="Major"
            variant="standard"
            helperText={
              secondaryerrorData.major !== "" ? secondaryerrorData.major : ""
            }
            value={secondaryFormData.major}
            onChange={handleChangeSecondary}
          />
        </div>
        <div className="newUserItem">
          <TextField
            name="phone_number"
            id="standard-basic"
            label="Phone number"
            variant="standard"
            helperText={
              secondaryerrorData.phone_number !== ""
                ? secondaryerrorData.phone_number
                : ""
            }
            value={secondaryFormData.phone_number}
            onChange={handleChangeSecondary}
          />
        </div>
        <div className="newUserItem">
          <TextField
            name="about"
            id="standard-basic"
            label="About"
            variant="standard"
            helperText={
              secondaryerrorData.about !== "" ? secondaryerrorData.about : ""
            }
            value={secondaryFormData.about}
            onChange={handleChangeSecondary}
          />
        </div>
        <div className="newUserItem">
          <TextField
            name="address"
            id="standard-basic"
            label="Address"
            variant="standard"
            helperText={
              secondaryerrorData.address !== ""
                ? secondaryerrorData.address
                : ""
            }
            value={secondaryFormData.address}
            onChange={handleChangeSecondary}
          />
        </div>
      </form>
      <Link to="/AdminPage/specialist">
        <button type="button" className="newUserButton" onClick={handleSubmit}>
          Confirm
        </button>
      </Link>
      <Link to="/AdminPage/specialist">
        <button type="button" className="CancelEditBtn">
          Cancel
        </button>
      </Link>
    </div>
  );
}
