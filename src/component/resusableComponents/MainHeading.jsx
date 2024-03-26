import { Box, Typography } from "@mui/material";
import React from "react";

const MainHeading = (props) => {
  return (
    <div>
      {" "}
      <Box
        sx={{
          width: "100%",
          //   border: 1,
          py: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">{props.heading}</Typography>
      </Box>
    </div>
  );
};

export default MainHeading;
