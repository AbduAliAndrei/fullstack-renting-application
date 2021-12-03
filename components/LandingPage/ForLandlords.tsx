// import '../styles/App.css'
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import ArrowForwardTwoToneIcon from "@material-ui/icons/ArrowForwardTwoTone";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";
import Button from "@mui/material/Button";
export default function ForLandlords() {
  const forTenantsFeatures = [
    {
      title: "Real time messaging T",
      subFeatures: ["Notification center", "Email notifications"],
      bodyParagraph:
        "RLorem ipsum dolor, sit amet consectetur adipisicing elit. Provident laboriosam dolorem voluptates, voluptatibus eius vel explicabo qui optio quidem et suscipit maxime id magni fuga ullam reiciendis impedit accusantium accusamus.",
      image: "/DSC_2778.jpg",
    },
    {
      title: "Tenant blogs T",
      subFeatures: ["Useful info", "Shared experience"],
      bodyParagraph:
        "TLorem ipsum dolor, sit amet consectetur adipisicing elit. Provident laboriosam dolorem voluptates, voluptatibus eius vel explicabo qui optio quidem et suscipit maxime id magni fuga ullam reiciendis impedit accusantium accusamus.",
      image: "/budapest.jpg",
    },
    {
      title: "Offer sections T",
      subFeatures: [
        "Bookmark an offer",
        "Review & comment",
        "report offer/landlord",
      ],
      bodyParagraph:
        "OLorem ipsum dolor, sit amet consectetur adipisicing elit. Provident laboriosam dolorem voluptates, voluptatibus eius vel explicabo qui optio quidem et suscipit maxime id magni fuga ullam reiciendis impedit accusantium accusamus.",
      image: "/budapest2.jpg",
    },
  ];
  const forLandlordsFeatures = [
    {
      title: "Real time messaging L",
      subFeatures: ["Notification center", "Email notifications"],
      bodyParagraph:
        "LANDLORD RLorem ipsum dolor, sit amet consectetur adipisicing elit. Provident laboriosam dolorem voluptates, voluptatibus eius vel explicabo qui optio quidem et suscipit maxime id magni fuga ullam reiciendis impedit accusantium accusamus.",
      image: "/DSC_2778.jpg",
    },
    {
      title: "Tenant blogs L",
      subFeatures: ["Useful info", "Shared experience"],
      bodyParagraph:
        "LANDLORD TLorem ipsum dolor, sit amet consectetur adipisicing elit. Provident laboriosam dolorem voluptates, voluptatibus eius vel explicabo qui optio quidem et suscipit maxime id magni fuga ullam reiciendis impedit accusantium accusamus.",
      image: "/budapest.jpg",
    },
    {
      title: "Offer sections L",
      subFeatures: [
        "Bookmark an offer",
        "Review & comment",
        "report offer/landlord",
      ],
      bodyParagraph:
        "LANDLORD OLorem ipsum dolor, sit amet consectetur adipisicing elit. Provident laboriosam dolorem voluptates, voluptatibus eius vel explicabo qui optio quidem et suscipit maxime id magni fuga ullam reiciendis impedit accusantium accusamus.",
      image: "/budapest2.jpg",
    },
  ];

  const [forTenantsActive, setTenantsActive] = useState(true);
  const [forLandlordsActive, setForLandlordsActive] = useState(false);
  let [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  let currentTL = forLandlordsActive
    ? forLandlordsFeatures
    : forTenantsFeatures;
  return (
    <div className="ForLandlords">
      <div className="features">
        <div className="features-select">
          <Button className="features-select-title">Features</Button>
          <Button
            className="forTenantsSelect"
            style={{ color: forTenantsActive ? "#FF0067" : "black" }}
            onClick={() => {
              // const target = e.target as HTMLTextAreaElement;
              if (!forTenantsActive) {
                setTenantsActive(!forTenantsActive);
                setForLandlordsActive(!forLandlordsActive);
              }
            }}
          >
            For Tenants
          </Button>
          |
          <Button
            className="forLandlordsSelect"
            style={{ color: forLandlordsActive ? "#FF0067" : "black" }}
            onClick={() => {
              if (!forLandlordsActive) {
                setForLandlordsActive(!forLandlordsActive);
                setTenantsActive(!forTenantsActive);
              }
              console.log(currentTL);
            }}
          >
            For Landlords
          </Button>
        </div>
        {currentTL.map((feature) => (
          <div className="feature">
            <Typography className="feature-title" variant="h1" component="h1">
              {feature.title}
            </Typography>
            <Typography className="sub-features" variant="button" gutterBottom>
              {feature.subFeatures.map((subFeature) => (
                <span>{subFeature} | </span>
              ))}
            </Typography>
          </div>
        ))}
      </div>
      <div className="feature-view">
        <ArrowForwardTwoToneIcon
          className="right-btn"
          fontSize="large"
          onClick={() => {
            if (currentFeatureIndex == 2) {
              setCurrentFeatureIndex(0);
            } else {
              setCurrentFeatureIndex(currentFeatureIndex + 1);
            }
          }}
        />
        <Typography className="feature-view-title" variant="h3" component="h3">
          {currentTL[currentFeatureIndex].title}
        </Typography>
        <div className="feature-image-description">
          <div className="image-preview">
            <Image
              src={currentTL[currentFeatureIndex].image}
              alt="Landlord Image"
              className="ld-img"
              objectFit="cover"
              layout="fill"
              priority={true}
            />
          </div>
          <Typography
            className="feature-description"
            variant="body1"
            gutterBottom
          >
            {currentTL[currentFeatureIndex].bodyParagraph}
          </Typography>
        </div>
        <ArrowBackTwoToneIcon
          className="left-btn"
          fontSize="large"
          onClick={() => {
            if (currentFeatureIndex == 0) {
              setCurrentFeatureIndex(2);
            } else {
              setCurrentFeatureIndex(currentFeatureIndex - 1);
            }
          }}
        />
      </div>
    </div>
  );
}
