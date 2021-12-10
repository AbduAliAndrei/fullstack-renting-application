// import '../styles/App.css'
import React, { useState } from "react";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { fetchCall, RequestType } from "../api/data-fetcher";
import { AllowedFilterOfferKeys } from "../enums/allowed-offer-keys";
import { FilterElement, Filters } from "../interfaces/filterElement";

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

  const [filters, setFilters] = useState<Filters[]>([
    {
      name: "City",
      filters: [
        {
          name: "Budapest",
          checked: false,
          value: "Budapest",
        },
        {
          name: "Szeged",
          checked: false,
          value: "Szeged",
        },
        {
          name: "Szeged",
          checked: false,
          value: "Szeged",
        },
      ],
    },
    {
      name: "Price",
      filters: [
        {
          name: "Under 50,000ft",
          checked: false,
          value: { lowerBound: 0, upperBound: 50000 },
        },
        {
          name: "50,000 - 100,000ft",
          checked: false,
          value: { lowerBound: 50000, upperBound: 100000 },
        },
        {
          name: "100,000 - 150,000ft",
          checked: false,
          value: { lowerBound: 100000, upperBound: 150000 },
        },
        {
          name: "150,000 - 250,000ft",
          checked: false,
          value: { lowerBound: 150000, upperBound: 2150000 },
        },
        {
          name: "All included",
          checked: false,
          value: { lowerBound: -Infinity, upperBound: +Infinity },
        },
      ],
    },
    {
      name: "District",
      filters: [
        {
          name: "XII",
          checked: false,
          value: "XII",
        },
        {
          name: "XIII",
          checked: false,
          value: "XIII",
        },
        {
          name: "IX",
          checked: false,
          value: "IX",
        },
        {
          name: "III",
          checked: false,
          value: "III",
        },
      ],
    },
  ]);

  return (
    <div className="FilterTool">
      <div className="options">
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
        <div className="date">
          <div className="title-arrow">
            <div className="title">
              <p>Date</p>
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
