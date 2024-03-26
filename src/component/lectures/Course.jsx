import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import CourseCard from "./Card";

const Course = () => {
  const [data, setData] = useState([]);
  const getAllCourse = async () => {
    const res = await axios.get(`/api/v1/admin/get-all-course`);
    setData(res.data.data.allCourses);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourse();
  }, []);

  const textStyles = {
    display: "flex",
    justifyContent: "space-around",
  };
  console.log("All allCourses", data);
  return (
    <div>
      {" "}
      <Container>
        <Typography variant="h5" component="div">
          Courses list
        </Typography>
        <Grid container spacing={2} sx={textStyles}>
          {data.map((data, i) => (
            <>
              <CourseCard key={i} course={data} getAllCourse={getAllCourse} />
            </>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Course;
