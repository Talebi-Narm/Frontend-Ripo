import "./style.scss";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import TextField from '@mui/material/TextField';
import moment from "moment";

const currencies = [
  {
    value: 'Associate',
    label: 'Associate',
  },
  {
    value: 'Bachelor',
    label: 'Bachelor',
  },
  {
    value: 'Master',
    label: 'Master',
  },
  {
    value: 'Doctoral',
    label: 'Doctoral',
  },
];

export default function NewUser() {

  const [value, setValue] = React.useState(null);
  const initialPrimaryFormData = Object.freeze({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const initialSecondaryFormData = Object.freeze({
    birth_date: "",
    degree: "",
    major: "",
    phone_number: "",
    about: "",
    address:"",
  });
  const [formData, updateFormData] = useState(initialPrimaryFormData);
  const [secondaryFormData, updateSecondaryFormData] = useState(initialSecondaryFormData);
  const [errorData, updateErrorData] = useState(initialPrimaryFormData);
  const [secondaryerrorData, updateSecondaryErrorData] = useState(initialSecondaryFormData);
  const [primaryConfirmation, setPrimaryConfirmation] = useState(false);
  const [primaryAccepted, setPrimaryAccepted] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    if(id !== '')
    {
      updateSecondaryErrorData({
        ...errorData,
        birth_date: "",
      });
      updateSecondaryErrorData({
        ...errorData,
        degree: "",
      });
      updateSecondaryErrorData({
        ...errorData,
        major: "",
      });
      updateSecondaryErrorData({
        ...errorData,
        phone_number: "",
      });
      updateSecondaryErrorData({
        ...errorData,
        about: "",
      });
      updateSecondaryErrorData({
        ...errorData,
        address: "",
      });
  
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_code: '',
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
      fetch("http://127.0.0.1:8000/api/specialist/update-secondary/" + id + "/", requestOptions)
        .then((response) => {
          if (response.status === 200) {
            alert("Specialist registered!");
          } 
          else {
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
              return;
            }
          });
        });
    }
    
  }, [primaryConfirmation , id])

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

  useEffect(() => {
  }, [secondaryFormData])

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
    if(!primaryAccepted)
    {


      updateErrorData({
        ...errorData,
        name: "",
      });
      updateErrorData({
        ...errorData,
        lastName: "",
      });
      updateErrorData({
        ...errorData,
        userName: "",
      });
      updateErrorData({
        ...errorData,
        email: "",
      });
      updateErrorData({
        ...errorData,
        password: "",
      });

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          user_name: formData.userName,
          first_name: formData.name,
          last_name: formData.lastName,
          password: formData.password,
        }),
      };
      fetch("http://127.0.0.1:8000/api/specialist/register/", requestOptions)
        .then(async(response) => {
          if (response.status === 201) {
            let isJson = response.headers
            .get('content-type')
            ?.includes('application/json')
            let data = isJson ? await response.json() : null
            setId(data.id);
            
            setPrimaryConfirmation(primaryConfirmation ? false : true);
            setPrimaryAccepted(true);
          } 
          else {
            throw response;
          }
        })
        .catch((err) => {
          err.text().then((errorMessage) => {
            const errors = JSON.parse(errorMessage);

            if (errors.email !== undefined) {
              updateErrorData({
                ...errorData,
                email: errors.email,
              });
              return;
            }

            if (errors.user_name !== undefined) {
              updateErrorData({
                ...errorData,
                userName: errors.user_name,
              });
              return;
            }

            if (errors.first_name !== undefined) {
              updateErrorData({
                ...errorData,
                name: errors.first_name,
              });
              return;
            }

            if (errors.last_name !== undefined) {
              updateErrorData({
                ...errorData,
                lastName: errors.last_name,
              });
              return;
            }

            if (errors.password !== undefined) {
              updateErrorData({
                ...errorData,
                password: errors.password,
              });
              return;
            }
          });
        });
    }
    else{
      setPrimaryConfirmation(primaryConfirmation ? false : true);
    }
    
    
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Specialist</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <TextField
            id="standard-basic"
            name='email'
            label="Email"
            variant="standard"
            type="email"
            helperText={errorData.email !== '' ? errorData.email : ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <TextField
            name='userName'
            id="standard-basic"
            label="Username"
            variant="standard"
            type="text"
            helperText={errorData.userName !== '' ? errorData.userName : ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <TextField
            name='name'
            id="standard-basic"
            label="Fisrt Name"
            variant="standard"
            type="text"
            helperText={errorData.name !== '' ? errorData.name : ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <TextField
            name='lastName'
            id="standard-basic"
            label="Last Name"
            variant="standard"
            type="text"
            helperText={errorData.lastName !== '' ? errorData.lastName : ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <TextField
            id="outlined-password-input"
            name='password'
            label="Password"
            variant="standard"
            type="password"
            autoComplete="current-password"
            helperText={errorData.password !== '' ? errorData.password : ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              name="birth_date"
              label="Birth Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
                updateSecondaryFormData({
                  ...secondaryFormData,
                  ["birth_date"]: moment(newValue).format('YYYY-MM-DD'),
                });
              }}
              formatDate={(date) => moment(date).format('YYYY-MM-DD')}
              renderInput={(params) => (
                <TextField 
                variant="standard" 
                {...params} 
                name="birth_date"
                helperText={secondaryerrorData.birth_date !== '' ? secondaryerrorData.birth_date : ''}
                onChange={handleChangeSecondary}/>
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
          helperText={secondaryerrorData.major !== '' ? secondaryerrorData.major : ''}
          onChange={handleChangeSecondary}/>
        </div>
        <div className="newUserItem">
          <TextField
            name="phone_number"
            id="standard-basic"
            label="Phone number"
            variant="standard"
            helperText={secondaryerrorData.phone_number !== '' ? secondaryerrorData.phone_number : ''}
            onChange={handleChangeSecondary}
          />
        </div>
        <div className="newUserItem">
          <TextField 
          name="about" 
          id="standard-basic" 
          label="About" 
          variant="standard" 
          helperText={secondaryerrorData.about !== '' ? secondaryerrorData.about : ''}
          onChange={handleChangeSecondary}/>
        </div>
        <div className="newUserItem">
          <TextField 
          name="address" 
          id="standard-basic" 
          label="Address" 
          variant="standard" 
          helperText={secondaryerrorData.address !== '' ? secondaryerrorData.address : ''}
          onChange={handleChangeSecondary}/>
        </div>
      </form>
      <Link to="/AdminPage/specialist">
        <button className="newUserButton" onClick={handleSubmit}>Confirm</button>
      </Link>
      <Link to="/AdminPage/specialist">
        <button className="CancelEditBtn">Cancel</button>
      </Link>
    </div>
  );
}
