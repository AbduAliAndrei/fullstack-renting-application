import Typography from "@material-ui/core/Typography";
import React from "react";
export default function Footer() {
  return (
    <div className="Footer">
      <div className="footerHeader-contact">
        <div className="footerHeader">
          <Typography className="footerHeaderH4" variant="h4" component="h4">
            Explore viaRent
          </Typography>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            earum repudiandae voluptate architecto, illum atque perspiciatis
            accusantium reprehenderit debitis voluptas quibusdam, beatae ipsum
            velit laborum, officiis molestiae sunt quis impedit!
          </p>
        </div>
        <div className="contact">
          <ul>
            <Typography className="contacts" variant="h5" component="h5">
              Contacts:
            </Typography>
            <li>+ 36 70 778 7568</li>
            <li>johndoe@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="pagesDetailContainer">
        <div className="landing">
          <ul>
            <div className="title">Landing</div>
            <li>Real time proposals</li>
            <li>Features for Landlord</li>
            <li>Features for Tenant</li>
            <li>Best Offers</li>
          </ul>
        </div>
        <div className="rentOffers">
          <ul>
            <div className="title">Rent Offers</div>
            <li>Rent Offers</li>
            <li>Cheapest on market</li>
            <li>For students filter</li>
            <li>Tenants Pages</li>
          </ul>
        </div>
        <div className="contactsPageDetails">
          <ul>
            <div className="title">Contact</div>
            <li>FAQ</li>
            <li>ChatBot</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
