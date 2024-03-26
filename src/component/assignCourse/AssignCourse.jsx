import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const AssignCourse = () => {
  const [instructorId, setInstructorId] = useState("");
  const [courseId, setCourseId] = useState("");

  const [courseList, setCourseList] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const getCourseInstructors = async () => {
    const res = await axios.get(`/api/v1/admin/course-instructor`);

    setCourseList(res.data.data.courseList);
    setInstructors(res.data.data.instructorList);
    console.log("All instructor", res.data.data);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("instructorId", instructorId);
      console.log("courseId", courseId);

      const res = await axios.patch(`/api/v1/admin/assign-course`, {
        instructorId: instructorId,
        courseId: courseId,
      });
      console.log("res", res);
      alert("Course Added Successfully");
    } catch (error) {
      console.log(error);

      //   setLoading(false);
    }
  };

  useEffect(() => {
    getCourseInstructors();
  }, []);

  const handleChangeStartTime = (event) => {
    setInstructorId(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeEndTime = (event) => {
    setCourseId(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <Typography variant="h5" component="div">
        Assign Courses to instructor
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="start-time-select-label">
              Select Instructor
            </InputLabel>
            <Select
              labelId="start-time-select-label"
              id="start-time-select"
              value={instructorId}
              label="Select Instructor"
              onChange={handleChangeStartTime}
            >
              {instructors.map((instructor, index) => (
                <MenuItem key={index} value={instructor._id}>
                  {instructor.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 5 }}>
            <InputLabel id="end-time-select-label">Select Course</InputLabel>
            <Select
              labelId="end-time-select-label"
              id="end-time-select"
              value={courseId}
              label="Select Course"
              onChange={handleChangeEndTime}
            >
              {courseList.map((course, index) => (
                <MenuItem key={index} value={course._id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button sx={{ mt: 5 }} variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignCourse;
