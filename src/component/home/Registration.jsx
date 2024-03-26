import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import DatePicker from "@mui/lab/DatePicker";
// import TimePicker from "@mui/lab/TimePicker";
import Stack from "@mui/material/Stack";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../url";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    loginType: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(`${baseUrl}/api/v1/admin/register`, {
        ...formData,
      });

      console.log(res);
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        gender: "",
        loginType: "",
        password: "",
      });
      alert("Signed up Successfully");
    } catch (error) {
      console.log(error);

      //   setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <Container>
        <Typography variant="h5" component="div">
          Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              size="small"
              fullWidth
              label="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              size="small"
              fullWidth
              label="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              size="small"
              fullWidth
              label="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="dropdown-label">Gender</InputLabel>
              <Select
                labelId="dropdown-label"
                id="dropdown"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
                <MenuItem value="other">other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              fullWidth
              label="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </div>
  );
};

export default Registration;
