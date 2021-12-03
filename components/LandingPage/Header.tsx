import React from "react";
import Image from "next/image";
import { InputAdornment, TextField } from "@material-ui/core";
import Search from "@material-ui/icons/Search";

export default function Header() {
  return (
    <div className="Header">
      <div className="text">
        <div className="hd-title">
          <h1>Let’s choose best apartment in Budapest</h1>
        </div>
        <div className="hd-description">
          <p>
            Type down the search area to start exploring right away new
            solutions for you
          </p>
        </div>
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
            padding: "20px 40px ",
            border: "solid #000 1px",
          }}
          placeholder="Type a location"
          fullWidth
        />
      </div>
      <div className="vector-img-container">
        <Image
          src="/budapest.jpg"
          alt="Landlord Image"
          className="ld-img"
          objectFit="cover"
          layout="fill"
          priority={true}
        />
      </div>
    </div>
  );
}
