import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { baseUrl } from "../url";

const JobRequest = () => {
  const [data, setData] = useState([]);
  const [company, setCompany] = useState({});

  const { id } = useParams();
  const [dataItem, setDataItem] = useState({});
  const [addonId, setAddonId] = useState("");
  const [createAddOnItem, setCreateAddOnItem] = useState(false);
  const handleOpenItem = (id) => {
    setCreateAddOnItem(true);
    setAddonId(id);
  };
  const handleCloseItem = () => setCreateAddOnItem(false);

  const handleChangeItem = (event) => {
    setDataItem({ ...dataItem, [event.target.name]: event.target.value });
    console.log(dataItem);
  };

  console.log("job request id ", id);
  const createAddOnItemHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("dataItem", addonId);
      const res = await axios.patch(
        `${baseUrl}/api/v1/admin/rejected-job-request`,
        {
          ...dataItem,
          statusId: addonId,
        }
      );
      console.log("dataItem", dataItem);
      console.log("company res", res);
      setDataItem({});
      getAllInstructors();
      alert("Rejected job request");
      handleCloseItem();
      getAllInstructors();
    } catch (error) {
      console.log(error);
    }
  };

  const selectCandidate = async (id) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/api/v1/admin/accept-job-request/${id}`
      );
      console.log(res);
      getAllInstructors();
      alert("Job accepted");
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAllInstructors = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/admin/job-request/${id}`);

    setData(res.data.data.appliedCandidates);
    setCompany(res.data.data);
    console.log("All instructor", res);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInstructors();
  }, []);

  const textStyles = {
    // display: "flex",
    // justifyContent: "space-around",

    my: 5,
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Container>
        <Typography variant="h5" component="div">
          List of Company
        </Typography>
        <Grid container spacing={2} sx={textStyles}>
          <Box>
            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
              jobTitle : {company.jobTitle} | jobType : {company.jobType}
            </Typography>
            <Typography>
              minExperience : {company.minExperience} | salary :{" "}
              {company.salary}
            </Typography>
            <Typography>skills : {company.skills}</Typography>
            <Typography>
              {/* appliedCandidates : {company.appliedCandidates.length} */}
            </Typography>
            <Typography>description : {company.description}</Typography>
          </Box>

          {data.map((item, index) => (
            <Accordion key={item._id} sx={{ border: 1, width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}a-content`}
                id={`panel${index + 1}a-header`}
                sx={{ backgroundColor: "gray" }}
              >
                <Typography sx={{ mx: 2, fontWeight: "bold" }}>
                  Name:{item.fullName}
                </Typography>
                <Typography sx={{ mx: 2 }}>candidate:{item.email}</Typography>
                <Typography sx={{ mx: 2 }}>candidate:{item.gender}</Typography>
                <Typography sx={{ mx: 2 }}>candidate:{item.mobile}</Typography>

                <Typography sx={{ mx: 2 }}>
                  {/* candidate:{item.candidate.length} */}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item.appliedJobsStatus.map((addOnItem) => (
                  <Box key={addOnItem._id}>
                    <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                      job status : {addOnItem.status}
                    </Typography>
                    <Button
                      onClick={() => selectCandidate(addOnItem._id)}
                      variant="contained"
                    >
                      Select candidate
                    </Button>

                    <Button
                      onClick={() => handleOpenItem(addOnItem._id)}
                      variant="contained"
                    >
                      Reject candidate
                    </Button>
                    <Divider />
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Modal
          open={createAddOnItem}
          onClose={handleCloseItem}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container>
              <Grid
                item
                sx={12}
                component="form"
                onSubmit={createAddOnItemHandler}
              >
                <TextField
                  id="outlined-basic"
                  size="small"
                  fullWidth
                  label="Reason"
                  name="reason"
                  value={dataItem.reason}
                  required
                  variant="outlined"
                  onChange={handleChangeItem}
                />

                <Button variant="contained" type="submit">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default JobRequest;
