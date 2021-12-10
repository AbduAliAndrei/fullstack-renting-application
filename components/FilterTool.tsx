// import '../styles/App.css'
import React from "react";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { fetchCall, RequestType } from "../api/data-fetcher";
import { AllowedFilterOfferKeys } from "../enums/allowed-offer-keys";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import { InputAdornment } from "@mui/material";

export default function FilterTool() {
  const filterOffers = async () => {
    await fetchCall({
      type: RequestType.GET,
      path: "offers",
      query: [
        [`filter.${AllowedFilterOfferKeys.CITY}`, ["Budapest"]],
        [`filter.${AllowedFilterOfferKeys.TITLE}`, ["Taken"]],
      ],
    });
  };

  return (
    <div className="FilterTool">
      <div className="options">
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          style={{
            borderRadius: "20px",
            padding: "10px ",
            border: "solid #000 1px",
          }}
          placeholder="Search by title"
          fullWidth
        />
        <div className="price">
          <div className="title-arrow">
            <div className="title">
              <p>Price</p>
            </div>
            <FontAwesomeIcon
              style={{ fontStyle: "normal" }}
              className="arrow-down"
              icon={faSortDown}
              size="2x"
              color="#fff"
            />
            <FontAwesomeIcon
              className="arrow-up"
              icon={faSortUp}
              size="2x"
              color="#fff"
            />
          </div>
          <div className="drop-down">
            <div>
              <FormControlLabel control={<Checkbox />} label="Under 50000ft" />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox />}
                label="50,000 - 100,000"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox />}
                label="100,000 - 150,000"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox />}
                label="150,000 - 250,000"
              />
            </div>
            <div className="all-included">
              <FormControlLabel control={<Checkbox />} label="All included" />
            </div>
          </div>
        </div>
        <div className="location">
          <div className="title-arrow">
            <div className="title">
              <p>District</p>
            </div>
            <FontAwesomeIcon
              className="arrow-down"
              icon={faSortDown}
              size="2x"
              color="#fff"
            />
            <FontAwesomeIcon
              className="arrow-up"
              icon={faSortUp}
              size="2x"
              color="#fff"
            />
          </div>
          <div className="drop-down">
            <FormControlLabel control={<Checkbox />} label="Xll" />
            <FormControlLabel control={<Checkbox />} label="xlll" />
            <FormControlLabel control={<Checkbox />} label="lX" />
            <FormControlLabel control={<Checkbox />} label="lll" />
          </div>
        </div>
        <div className="City">
          <div className="title-arrow">
            <div className="title">
              <p>City</p>
            </div>
            <FontAwesomeIcon
              className="arrow-down"
              icon={faSortDown}
              size="2x"
              color="#fff"
            />
            <FontAwesomeIcon
              className="arrow-up"
              icon={faSortUp}
              size="2x"
              color="#fff"
            />
          </div>

          <div className="drop-down">
            <FormControlLabel control={<Checkbox />} label="Budapest" />
            <FormControlLabel control={<Checkbox />} label="Debrecen" />
            <FormControlLabel control={<Checkbox />} label="Pech" />
            <FormControlLabel control={<Checkbox />} label="Siofok" />
          </div>
        </div>
        <div className="property-type">
          <div className="title-arrow">
            <div className="title">
              <p>Property type</p>
            </div>
            <FontAwesomeIcon
              className="arrow-down"
              icon={faSortDown}
              size="2x"
              color="#fff"
            />
            <FontAwesomeIcon
              className="arrow-up"
              icon={faSortUp}
              size="2x"
              color="#fff"
            />
          </div>
          <div className="drop-down">
            <div>
              <FormControlLabel control={<Checkbox />} label="Xll" />
            </div>
            <div>
              <FormControlLabel control={<Checkbox />} label="xlll" />
            </div>
            <div>
              <FormControlLabel control={<Checkbox />} label="lX" />
            </div>
            <div>
              <FormControlLabel control={<Checkbox />} label="lll" />
            </div>
          </div>
        </div>
      </div>
      <Button
        action-btn-filter
        disableElevation
        onClick={filterOffers}
        className="action-btn-filter"
        variant="contained"
      >
        Filter
      </Button>
    </div>
  );
}
