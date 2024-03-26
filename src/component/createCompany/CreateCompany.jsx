import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import DatePicker from "@mui/lab/DatePicker";
// import TimePicker from "@mui/lab/TimePicker";
import Stack from "@mui/material/Stack";
import { Container, Typography } from "@mui/material";

// import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { baseUrl } from "../url";
// import Stack from "@mui/material/Stack";

const CreateCompany = () => {
  const [startTime, setStarTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const handleChangeStartTime = (event) => {
    setStarTime(event.target.value);
  };
  const handleChangeEndTime = (event) => {
    setEndTime(event.target.value);
  };
  const [file, setFile] = useState("");
  const uploadImage = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
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

      const res = await axios.post(`${baseUrl}/api/v1/admin/create-company`, {
        ...formData,
      });

      console.log(res);
      setFormData({
        name: "",
        address: "",
        city: "",
      });
      alert("Company Added Successfully");
    } catch (error) {
      console.log(error);

      //   setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h5" component="div">
        Add Company
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={5}
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default CreateCompany;
