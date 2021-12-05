import Auth from "../components/Auth";
import React, { FormEvent, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import { styled } from "@mui/system";
import Switch from "@material-ui/core/Switch";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const Profile = () => {
  const [xsrfToken] = useCookies(["XSRF-TOKEN"]);
  const router = useRouter();

  const onLogout = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("logout");
      const res = await fetch("api/auth/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": xsrfToken["XSRF-Token"],
        },
      });
      if (res.status === 301) {
        await router.push("/login");
      }
      console.log(res.status);
    },
    [router, xsrfToken]
  );
  return (
    <Auth>
      <div className="Profile">
        <div className="controlBtns">
          <Button disableElevation className="controlBtn" variant="contained">
            General Info
          </Button>
          <Button disableElevation className="controlBtn" variant="contained">
            Password
          </Button>
          <Button disableElevation className="controlBtn" variant="contained">
            Email
          </Button>
          <Button disableElevation className="controlBtn" variant="contained">
            Role Change
          </Button>
          <form onSubmit={onLogout}>
            <button id="logoutBtn">Logout</button>
          </form>
        </div>
        <div className="profileImageContainer">
          <Typography className="profileImageTitle" variant="h5" component="h5">
            Profile image
          </Typography>
          <div className="profileImage-extraInfo">
            <div className="profileImage">
              <Image
                src="/DSC_2778.jpg"
                alt="Landlord Image"
                className="ld-img"
                objectFit="cover"
                layout="fill"
                priority={true}
              />
            </div>
            <div className="editBtns-note">
              <div className="editBtns">
                <Button
                  disableElevation
                  className="changeAvatar"
                  variant="contained"
                >
                  Change Avatar
                </Button>
                <Button
                  disableElevation
                  className="deleteAvatar"
                  variant="contained"
                >
                  delete Avatar
                </Button>
              </div>
              <Typography className="note" variant="h6" component="h6">
                *If you will delete your avatar you will lose your trusted
                status
              </Typography>
            </div>
          </div>
        </div>
        <div className="primaryInfo">
          <Typography className="title" variant="h5" component="h5">
            Primary Information
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            className="primaryInformationForm"
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="First name"
                className="infoInput"
                id="standard-size-normal"
                defaultValue="Normal"
                variant="standard"
                InputProps={{ disableUnderline: true }}
              />
              <TextField
                className="infoInput"
                label="Last Name"
                id="standard-size-normal"
                defaultValue="Normal"
                variant="standard"
                InputProps={{ disableUnderline: true }}
              />
            </div>
            <div>
              <TextField
                className="infoInput"
                label="Location"
                id="standard-size-normal"
                defaultValue="Normal"
                variant="standard"
                InputProps={{ disableUnderline: true }}
              />
            </div>
            <div>
              <Typography variant="h6" component="h6">
                Turn on GPS location
                <Switch color="primary" />
              </Typography>
            </div>
          </Box>
        </div>
        <div className="secondaryInfo">
          <Typography className="title" variant="h5" component="h5">
            Secondary Information
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            className="secondaryInformationForm"
          >
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={1}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Without label</FormHelperText>
              </FormControl>
            </div>
            <div>
              <TextField
                className="infoInput"
                label="Bio"
                id="standard-size-normal"
                defaultValue="Normal"
                variant="standard"
                InputProps={{ disableUnderline: true }}
              />
            </div>
            <div>
              <Button
                disableElevation
                className="deleteAvatar"
                variant="contained"
              >
                Save changes
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </Auth>
  );
};

export default Profile;
