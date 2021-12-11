// import '../styles/App.css'
import React, { useState } from "react";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { fetchCall, RequestType } from "../api/data-fetcher";
import { AllowedFilterOfferKeys } from "../enums/allowed-offer-keys";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@mui/material";
import Search from "@material-ui/icons/Search";
import { FilterElement, Filters } from "../interfaces/filterElement";

export default function FilterTool(props) {
  const [searchByText, setSearchByText] = useState("");
  const filterOffers = async () => {
    const filterFromCurrentFilters = () => {
      const result = filters.map((filterObj) => {
        return filterObj.filters.filter((ob) => ob.checked);
      });
      const reqCities = result[0].map((city) => city.value);
      const reqPrice = result[1].map((price) => price.value);
      const reqDistrict = result[2].map((district) => district.value);
      const query: [string, any][] = [
        [`filter.${AllowedFilterOfferKeys.CITY}`, reqCities],
        [`filter.${AllowedFilterOfferKeys.PRICE}`, JSON.stringify(reqPrice)],
        [`filter.${AllowedFilterOfferKeys.DISTRICT}`, reqDistrict],
      ];
      return query.filter((query) => query[1].length > 0);
    };
    const query = filterFromCurrentFilters();
    if (query.length > 0) {
      const res = await fetchCall({
        type: RequestType.GET,
        path: "offers",
        query: query,
      });
      const offers = await res.json();
      props.updateOffers(offers.res);
    }
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
          name: "Debrecen",
          checked: false,
          value: "Debrecen",
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
          padding: "10px",
          border: "solid #000 1px",
        }}
        placeholder="Search by name"
        fullWidth
        variant="standard"
        value={searchByText}
        onInput={(e) => {
          const element = e.target as HTMLInputElement;
          const value = element.value;
          setSearchByText(value);
        }}
      />
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
              <FormControlLabel
                control={<Checkbox />}
                label="Under 50000ft"
                onInput={() => {
                  const temp = filters;
                  temp[1]["filters"][0]["checked"] =
                    !temp[1]["filters"][0]["checked"];
                  setFilters(temp);
                }}
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox />}
                label="50,000 - 100,000"
                onInput={() => {
                  const temp = filters;
                  temp[1]["filters"][1]["checked"] =
                    !temp[1]["filters"][1]["checked"];
                  setFilters(temp);
                }}
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox />}
                label="100,000 - 150,000"
                onInput={() => {
                  const temp = filters;
                  temp[1]["filters"][2]["checked"] =
                    !temp[1]["filters"][2]["checked"];
                  setFilters(temp);
                }}
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox />}
                label="150,000 - 250,000"
                onInput={() => {
                  const temp = filters;
                  temp[1]["filters"][3]["checked"] =
                    !temp[1]["filters"][3]["checked"];
                  setFilters(temp);
                }}
              />
            </div>
            <div className="all-included">
              <FormControlLabel
                control={<Checkbox />}
                label="All included"
                onInput={() => {
                  const temp = filters;
                  temp[1]["filters"][4]["checked"] =
                    !temp[1]["filters"][4]["checked"];
                  setFilters(temp);
                }}
              />
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
            <FormControlLabel
              control={<Checkbox />}
              label="Xll"
              onInput={() => {
                const temp = filters;
                temp[2]["filters"][0]["checked"] =
                  !temp[2]["filters"][0]["checked"];
                setFilters(temp);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="xlll"
              onInput={() => {
                const temp = filters;
                temp[2]["filters"][1]["checked"] =
                  !temp[2]["filters"][1]["checked"];
                setFilters(temp);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="lX"
              onInput={() => {
                const temp = filters;
                temp[2]["filters"][2]["checked"] =
                  !temp[2]["filters"][2]["checked"];
                setFilters(temp);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="lll"
              onInput={() => {
                const temp = filters;
                temp[2]["filters"][3]["checked"] =
                  !temp[2]["filters"][3]["checked"];
                setFilters(temp);
              }}
            />
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
            <FormControlLabel
              control={<Checkbox />}
              label="Budapest"
              onInput={() => {
                const temp = filters;
                temp[0]["filters"][0]["checked"] =
                  !temp[0]["filters"][0]["checked"];
                setFilters(temp);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Szeged"
              onInput={() => {
                const temp = filters;
                temp[0]["filters"][1]["checked"] =
                  !temp[0]["filters"][1]["checked"];
                setFilters(temp);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Debrecen"
              onInput={() => {
                const temp = filters;
                temp[0]["filters"][2]["checked"] =
                  !temp[0]["filters"][2]["checked"];
                setFilters(temp);
              }}
            />
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
              <FormControlLabel control={<Checkbox />} label="Studio" />
            </div>
            <div>
              <FormControlLabel control={<Checkbox />} label="Apartment" />
            </div>
            <div>
              <FormControlLabel control={<Checkbox />} label="House" />
            </div>
          </div>
        </div>
      </div>
      <Button
        disableElevation
        onClick={() => {
          filterOffers();
          // console.log(filters);
        }}
        className="action-btn-filter"
        variant="contained"
      >
        Filter
      </Button>
    </div>
  );
}
