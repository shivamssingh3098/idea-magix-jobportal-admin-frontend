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
import Card from "./Card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../url";
const Home = () => {
  const [data, setData] = useState([]);
  const handleCloseItem = () => setCreateAddOnItem(false);
  const [dataItem, setDataItem] = useState({});
  const [addonId, setAddonId] = useState("");
  const [createAddOnItem, setCreateAddOnItem] = useState(false);
  const handleOpenItem = (id) => {
    setCreateAddOnItem(true);
    setAddonId(id);
  };
  const navigate = useNavigate();

  const handleChangeItem = (event) => {
    setDataItem({ ...dataItem, [event.target.name]: event.target.value });
  };
  const createAddOnItemHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("dataItem", addonId);
      const res = await axios.post(`${baseUrl}/api/v1/admin/create-job`, {
        ...dataItem,
        company: addonId,
      });
      console.log("dataItem", dataItem);
      console.log("company res", res);
      setDataItem({});

      handleCloseItem();
      getAllInstructors();
    } catch (error) {
      console.log(error);
    }
  };
  const getAllInstructors = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/admin/all-company`);
    setData(res.data.data.company);

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
    <Container>
      <Typography variant="h5" component="div">
        List of Company
      </Typography>
      <Grid container spacing={2} sx={textStyles}>
        {data.map((item, index) => (
          <Accordion key={item._id} sx={{ border: 1, width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}a-content`}
              id={`panel${index + 1}a-header`}
              sx={{ backgroundColor: "gray" }}
            >
              <Typography sx={{ mx: 2, fontWeight: "bold" }}>
                Name:{item.name}
              </Typography>
              <Typography sx={{ mx: 2 }}>Jobs:{item.job.length}</Typography>
              {/* <Typography sx={{ mx: 2 }}>
                candidate:{item.candidate.length}
              </Typography> */}
              <Button
                onClick={() => handleOpenItem(item._id)}
                variant="contained"
              >
                Create Job
              </Button>
            </AccordionSummary>
            <AccordionDetails>
              {item.job.map((addOnItem) => (
                <Box key={addOnItem._id}>
                  <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                    jobTitle : {addOnItem.jobTitle} | jobType :{" "}
                    {addOnItem.jobType}
                  </Typography>
                  <Typography>
                    minExperience : {addOnItem.minExperience} | salary :{" "}
                    {addOnItem.salary}
                  </Typography>
                  <Typography>skills : {addOnItem.skills}</Typography>
                  <Typography>
                    appliedCandidates : {addOnItem.appliedCandidates.length}
                  </Typography>
                  <Typography>description : {addOnItem.description}</Typography>

                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(`/jobjequest/${addOnItem._id}`);
                    }}
                  >
                    View job request
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
                label="Title"
                name="jobTitle"
                value={dataItem.jobTitle}
                required
                variant="outlined"
                onChange={handleChangeItem}
              />
              <TextField
                size="small"
                id="outlined-basic"
                fullWidth
                label="skills"
                name="skills"
                value={dataItem.skills}
                required
                variant="outlined"
                onChange={handleChangeItem}
              />

              <FormControl fullWidth size="small">
                <InputLabel id="dropdown-label">jobCategory</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  name="jobCategory"
                  value={dataItem.jobCategory}
                  onChange={handleChangeItem}
                >
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Non-IT">Non-IT</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel id="dropdown-label">jobType</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  name="jobType"
                  value={dataItem.jobType}
                  onChange={handleChangeItem}
                >
                  <MenuItem value="full-time">full-time</MenuItem>
                  <MenuItem value="part-time">part-time</MenuItem>
                  <MenuItem value="work-from-home">work-from-home</MenuItem>
                </Select>
              </FormControl>

              <TextField
                size="small"
                id="outlined-basic"
                fullWidth
                type="number"
                label="minExperience"
                name="minExperience"
                value={dataItem.minExperience}
                required
                variant="outlined"
                onChange={handleChangeItem}
              />
              <TextField
                size="small"
                id="outlined-basic"
                fullWidth
                type="number"
                label="salary"
                name="salary"
                value={dataItem.salary}
                required
                variant="outlined"
                onChange={handleChangeItem}
              />
              <TextField
                size="small"
                id="outlined-basic"
                fullWidth
                label="description"
                name="description"
                value={dataItem.description}
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
  );
};

export default Home;
