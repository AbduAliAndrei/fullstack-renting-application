// import Grid from "@mui/material/Grid";
import React, { BaseSyntheticEvent, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Dropzone, { useDropzone } from "react-dropzone";
import Typography from "@mui/material/Typography";
import Input from "@material-ui/core/Input";
// import AddIcon from "@mui/icons-material/Add";
import { Environment, Feature } from "../../interfaces/offer";
import AddIcon from "@material-ui/icons/AddCircle";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import logoutService from "../../server/models/services/user/logout.service";
const CreateOffer = () => {
  let newOffer = {};
  const handelFormSubmission = (e: BaseSyntheticEvent) => {
    let features: Feature = {
      kitchen: false,
      wifi: false,
      heating: false,
      smoking: false,
      furnished: false,
      elevator: false,
      fridge: false,
      microwave: false,
    };
    e.preventDefault();
    newOffer["title"] = e.target[0].value;
    newOffer["description"] = e.target[1].value;
    newOffer["price"] = e.target[2].value;
    newOffer["utilities"] = e.target[3].value;
    newOffer["extras"] = e.target[4].value;
    newOffer["currency"] = e.target[6].checked
      ? e.target[6].value
      : e.target[7].checked
      ? e.target[7].value
      : e.target[8].value;

    newOffer["streetName"] = e.target[9].value;
    newOffer["houseNumber"] = e.target[10].value;
    newOffer["postalCode"] = e.target[11].value;
    newOffer["city"] = e.target[12].value;
    newOffer["district"] = e.target[13].value;
    newOffer["mapLink"] = e.target[14].value;
    newOffer["roomsNum"] = e.target[15].value;
    newOffer["floor"] = e.target[16].value;
    for (let i = 16; i < 16 + 19; i++) {
      if (e.target[i].checked) {
        features[e.target[i].id] = true;
      }
    }
    newOffer["features"] = features;
    console.log(newOffer);
  };
  const defaultValues = {
    name: "",
    age: 0,
    gender: "",
    os: "",
    favoriteNumber: 0,
  };
  const ariaLabel = { "aria-label": "description" };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [tempEnvironmentType, setTempEnvironmentType] = useState("");
  const [environments, setEnvironments] = useState([]);
  // const [environments, setEnvironments] = useState({
  //   transport: [],
  //   universities: [],
  //   hotspots: [],
  // });
  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));
  return (
    <div className="CreateOffer">
      <Typography className="title" variant="h4" component="h4">
        Please fill the required fields to create an offer
      </Typography>
      <form onSubmit={handelFormSubmission}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
          item
          className="main-container"
        >
          <Box className="basic-cost-location">
            <Typography className="title" variant="h5" component="h5">
              Basic data
            </Typography>
            <Input
              style={{ margin: "20px 0" }}
              placeholder="Title"
              inputProps={ariaLabel}
              required
            />
            <br />
            <textarea
              name="message"
              id="msg"
              placeholder="Description"
              minLength={300}
              maxLength={1000}
              required
            />

            <Typography className="title" variant="h5" component="h5">
              Cost
            </Typography>
            <Input
              required
              placeholder="Price"
              type="number"
              inputProps={ariaLabel}
            />
            <Input
              required
              placeholder="Utilities"
              type="number"
              inputProps={ariaLabel}
            />
            <Input
              required
              placeholder="extras"
              type="number"
              inputProps={ariaLabel}
            />

            <FormControl component="fieldset">
              <RadioGroup
                aria-label="currency"
                defaultValue="USD"
                name="radio-buttons-group"
              >
                <FormControlLabel value="USD" control={<Radio />} label="USD" />
                <FormControlLabel value="HUF" control={<Radio />} label="HUF" />
                <FormControlLabel value="EUR" control={<Radio />} label="EUR" />
              </RadioGroup>
            </FormControl>
            <Typography className="title" variant="h5" component="h5">
              Location
            </Typography>
            <Input required placeholder="Street name" inputProps={ariaLabel} />
            <br />
            <Input placeholder="House number" inputProps={ariaLabel} />
            <br />
            <Input required placeholder="Postal code" inputProps={ariaLabel} />
            <br />
            <Input required placeholder="City" inputProps={ariaLabel} />
            <br />
            <Input required placeholder="District" inputProps={ariaLabel} />
            <br />
            <Input placeholder="Map link" inputProps={ariaLabel} />
            <br />
          </Box>
          <Box className="additionalInfo">
            <Typography className="title" variant="h5" component="h5">
              Additional Information
            </Typography>
            <Input
              placeholder="Rooms number"
              type="number"
              inputProps={ariaLabel}
              required
            />
            <Input placeholder="Floor" type="number" inputProps={ariaLabel} />
            <FormGroup className="featuresContainer">
              <FormControlLabel
                control={<Checkbox id="Kitchen" />}
                className="featureCheckBox"
                label="Kitchen"
              />
              <FormControlLabel
                control={<Checkbox id="Wifi" />}
                className="featureCheckBox"
                label="Wifi"
              />
              <FormControlLabel
                control={<Checkbox id="heating" />}
                className="featureCheckBox"
                label="Heating"
              />
              <FormControlLabel
                control={<Checkbox id="smoking" />}
                className="featureCheckBox"
                label="Smoking"
              />
              <FormControlLabel
                control={<Checkbox id="furnished" />}
                className="featureCheckBox"
                label="Furnished"
              />
              <FormControlLabel
                control={<Checkbox id="elevator" />}
                className="featureCheckBox"
                label="Elevator"
              />
              <FormControlLabel
                control={<Checkbox id="fridge" />}
                className="featureCheckBox"
                label="Fridge"
              />
              <FormControlLabel
                control={<Checkbox id="microwave" />}
                className="featureCheckBox"
                label="Microwave"
              />
              <FormControlLabel
                control={<Checkbox id="houseCleaning" />}
                className="featureCheckBox"
                label="House cleaning"
              />
              <FormControlLabel
                control={<Checkbox id="parking" />}
                className="featureCheckBox"
                label="Parking"
              />

              <FormControlLabel
                control={<Checkbox id="pool" />}
                className="featureCheckBox"
                label="Pool"
              />
              <FormControlLabel
                control={<Checkbox id="petFriendly" />}
                className="featureCheckBox"
                label="Pet friendly"
              />
              <FormControlLabel
                control={<Checkbox id="hasTv" />}
                className="featureCheckBox"
                label="TV"
              />
              <FormControlLabel
                control={<Checkbox id="balcony" />}
                className="featureCheckBox"
                label="balcony"
              />
              <FormControlLabel
                control={<Checkbox id="quietNeighborhood" />}
                className="featureCheckBox"
                label="Quiet"
              />
              <FormControlLabel
                control={<Checkbox id="security" />}
                className="featureCheckBox"
                label="Security"
              />
              <FormControlLabel
                control={<Checkbox id="gym" />}
                className="featureCheckBox"
                label="Gym"
              />
              <FormControlLabel
                control={<Checkbox id="garden" />}
                className="featureCheckBox"
                label="Garden"
              />
              <FormControlLabel
                control={<Checkbox id="washingMachine" />}
                label="Washing machine"
                className="featureCheckBox"
              />
            </FormGroup>

            {/* <Typography className="title" variant="h5" component="h5">
              Surroundings
            </Typography>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                startIcon={<AddIcon />}
                color="secondary"
                variant="contained"
                onClick={() => {
                  setTempEnvironmentType("transportation");
                  setEnvironments([...environments, "transport"]);
                }}
              >
                Transportation
              </Button>
              <Button
                startIcon={<AddIcon />}
                color="secondary"
                variant="contained"
              >
                Universities
              </Button>
              <Button
                startIcon={<AddIcon />}
                color="secondary"
                variant="contained"
              >
                Hotspots
              </Button>
            </ButtonGroup>
            <div className="environmentContainer">
              {environments.map((environment, index) => (
                <div key={index} className={environment}>
                  <Input placeholder="name" inputProps={ariaLabel} />
                  <br />
                  <Input placeholder="distanceTo" inputProps={ariaLabel} />
                </div>
              ))}
            </div> */}
          </Box>
          <Box className="dropZoneContainer">
            {/* <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag n drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone> */}
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Grid>
      </form>
    </div>
  );
};

export default CreateOffer;
