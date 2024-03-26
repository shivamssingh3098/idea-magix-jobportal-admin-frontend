import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CourseCart = (props) => {
  const cardStyle = {
    width: "300px",
    mt: 2,
  };
  console.log("props", props);
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
          Batch: {props.course.batch[0].batchName}
        </Typography>

        {/* <Typography variant="body2" color="text.secondary" gutterBottom>
          Total lecture: {props.course.courseVideos.length}
        </Typography> */}

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Description: {props.course.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCart;
