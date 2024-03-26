import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CreateLectureModal from "./Lectures";
import { Button } from "@mui/material";
import axios from "axios";

const CourseCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState({
    title: "",
    description: "",
  });
  const cardStyle = {
    width: "300px",
    mt: 2,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`/api/v1/admin/create-class`, {
      ...data,
      courseId: props.course._id,
    });
    console.log("res", res);
    handleClose();
    props.getAllCourse();
    alert("Lecture created Successfully");
    console.log(data); // Do something with form data
  };
  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Level: {props.course.level}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Instructor assigned:{" "}
          {props.course.isInstructorAssigned ? "true" : "false"}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Total lecture: {props.course.courseVideos.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Description: {props.course.description}
        </Typography>

        <Button variant="contained" onClick={handleOpen}>
          Add Lecture
        </Button>
      </CardContent>
      <CreateLectureModal
        handleClose={handleClose}
        data={data}
        open={open}
        setData={setData}
        handleSubmit={handleSubmit}
      />
    </Card>
  );
};

export default CourseCard;
