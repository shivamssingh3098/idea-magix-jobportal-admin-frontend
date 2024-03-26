import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import CourseCart from "./CourseCart";

const InstrructorCourse = () => {
  const [data, setData] = useState([]);

  const getAllInstructors = async () => {
    const res = await axios.get(`/api/v1/instructor/course-list`);
    setData(res.data.data[0].assignedCourse);

    console.log("All instructor with course", res.data.data[0].assignedCourse);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInstructors();
  }, []);

  const textStyles = {
    display: "flex",
    justifyContent: "space-around",
  };

  return (
    <Container>
      <Typography variant="h5" component="div">
        List of assigned courses
      </Typography>
      <Grid container spacing={2} sx={textStyles}>
        {data.map((data, i) => (
          <>
            <CourseCart key={i} course={data} />
          </>
        ))}
      </Grid>
    </Container>
  );
};

export default InstrructorCourse;
