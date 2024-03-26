import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const instructorCard = (props) => {
  const cardStyle = {
    width: "300px",
    mt: 2,
  };

  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.instructor.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Email: {props.instructor.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Gender: {props.instructor.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          City: {props.instructor.city}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Mobile: {props.instructor.mobile}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Qualification: {props.instructor.qualification}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Assigned Courses:{" "}
          {props.instructor.assignedCourse.map((course) => `${course.name}, `)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default instructorCard;
