import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";
import React from "react";

export default function Contact() {
  return (
    <div className="Contact">
      <Typography className="contactUs-title" variant="h2" component="h2">
        Contact Us
      </Typography>
      <div className="img-contactForm">
        <div className="bc-img"></div>

        <div className="contact-info">
          <div className="info">
            <Typography className="sub-title" variant="h5" component="h5">
              Contact Information
            </Typography>
            <div className="phone">
              <FontAwesomeIcon icon={faPhoneAlt} size="2x" color="#ff0067" />

              <p>Phone: +36 70 657 8093</p>
            </div>
            <div className="email">
              <FontAwesomeIcon icon={faEnvelope} size="2x" color="#ff0067" />

              <p>Email: abdullahjaberalk@gmail.com</p>
            </div>
            <div className="address">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size="2x"
                color="#ff0067"
              />

              <p>Address: Budapest, Hungary</p>
            </div>
          </div>
          <form
            name="contact"
            className="contact-form"
            data-netlify="true"
            method="POST"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="text" name="name" placeholder="name" />
            <input type="email" name="email" placeholder="Email" />
            <textarea
              name="Message"
              placeholder="Message"
              id="message"
              cols={30}
              rows={10}
            ></textarea>
            <button type="submit">send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
