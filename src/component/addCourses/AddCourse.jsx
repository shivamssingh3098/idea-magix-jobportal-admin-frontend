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
// import Stack from "@mui/material/Stack";

const timeArray = [
  { label: "00:00" },
  { label: "00:30" },
  { label: "01:00" },
  { label: "01:30" },
  { label: "02:00" },
  { label: "02:30" },
  { label: "03:00" },
  { label: "03:30" },
  { label: "04:00" },
  { label: "04:30" },
  { label: "05:00" },
  { label: "05:30" },
  { label: "04:00" },
  { label: "04:30" },
  { label: "05:00" },
  { label: "05:30" },
  { label: "06:00" },
  { label: "06:30" },
  { label: "07:00" },
  { label: "07:30" },
  { label: "08:00" },
  { label: "08:30" },
  { label: "09:00" },
  { label: "09:30" },
  { label: "10:00" },
  { label: "10:30" },
  { label: "11:00" },
  { label: "11:30" },
  { label: "12:00" },
  { label: "12:30" },
  { label: "13:00" },
  { label: "13:30" },
  { label: "14:00" },
  { label: "14:30" },
  { label: "15:00" },
  { label: "15:30" },
  { label: "14:00" },
  { label: "14:30" },
  { label: "15:00" },
  { label: "15:30" },
  { label: "16:00" },
  { label: "16:30" },
  { label: "17:00" },
  { label: "17:30" },
  { label: "18:00" },
  { label: "18:30" },
  { label: "19:00" },
  { label: "19:30" },
  { label: "20:00" },
  { label: "20:30" },
  { label: "21:00" },
  { label: "21:30" },
  { label: "22:00" },
  { label: "22:30" },
  { label: "23:00" },
  { label: "23:30" },
];
const AddCourse = () => {
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
    level: "",
    description: "",
    batchName: "",
    max_student: "",
    date: null,
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

      let formDatas = new FormData();
      formDatas.append("file", file);

      const res = await axios.post(`/api/v1/admin/create-course`, {
        ...formData,
        ...formData,
        startTime: startTime,
        endTime: endTime,
      });

      const res2 = await axios.post(
        `/api/v1/admin/upload-course-image/${res.data.data.course._id}`,
        formDatas
      );

      console.log(res);
      console.log("IMage", res2);

      setFormData({
        name: "",
        level: "",
        description: "",
        batchName: "",
        max_student: "",
        date: null,
        startTime: null,
        endTime: null,
        image: null,
      });
      alert("Course Added Successfully");
    } catch (error) {
      console.log(error);

      //   setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h5" component="div">
        Add courses
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
            label="Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={5}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Batch Name"
            name="batchName"
            value={formData.batchName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            type="number"
            label="Max Students"
            name="max_student"
            value={formData.max_student}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel id="time-select-label">Select Time</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              value={startTime}
              label="Select Time"
              onChange={handleChangeStartTime}
            >
              {timeArray.map((time, index) => (
                <MenuItem key={index} value={time.label}>
                  {time.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="time-select-label">Select Time</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              value={endTime}
              label="Select Time"
              onChange={handleChangeEndTime}
            >
              {timeArray.map((time, index) => (
                <MenuItem key={index} value={time.label}>
                  {time.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="outlined"
            required
            inputProps={{ accept: "image/*,.pdf" }}
            type="file"
            size="small"
            onChange={(e) => uploadImage(e)}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default AddCourse;
