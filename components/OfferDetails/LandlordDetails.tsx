import Image from "next/image";
import Button from "@material-ui/core/Button";
import React from "react";
import Typography from "@mui/material/Typography";
export default function LandlordDetails() {
  return (
    <div className="LandlordDetails">
      <div className="landlord-details">
        <div className="image-name-viewProfileBtn">
          <div className="img">
            <Image
              src="/DSC_2778.jpg"
              alt="Landlord Image"
              className="ld-img"
              objectFit="cover"
              layout="fill"
            />
          </div>
          <span>
            <Typography className="name" variant="h6" component="h6">
              Abdulla Alkhulaqui
            </Typography>
            <Button variant="text" size="small" color="primary">
              View Profile
            </Button>
          </span>
        </div>
        <Typography className="contact-title" variant="h5" component="h5">
          Contact
        </Typography>
        <div className="contacts">
          <div className="">
            <div className="phone">
              <Typography variant="h5" component="h5">
                Phone
              </Typography>
              <Typography variant="h6" component="h6">
                +36 34 345 2343
              </Typography>
            </div>
            <div className="email">
              <Typography variant="h5" component="h5">
                Email
              </Typography>
              <Typography variant="h6" component="h6">
                abdulla@gmail.com
              </Typography>
            </div>
          </div>
          <div className="social-media">
            <Typography variant="h5" component="h5">
              Social Media
            </Typography>
            <Typography variant="h6" component="h6">
              F G H
            </Typography>
          </div>
        </div>
        <div className="message-form">
          <Typography className="message-title" variant="h5" component="h5">
            Send a message to Abdulla
          </Typography>
          <form className="message">
            <textarea
              name="message"
              id="msg"
              placeholder="Write your message here..."
            />
            <div className="sendMSGBTN-favBTN">
              <Button id="sendMessageBtn" variant="contained">
                Send Message
              </Button>
              <Button id="favBtn" variant="contained">
                Add to favorite
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
