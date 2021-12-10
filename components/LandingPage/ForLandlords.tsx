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
      title: "Real time messaging",
      subFeatures: ["Message with owner", "Notification center"],
      bodyParagraph:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident laboriosam dolorem voluptates, voluptatibus eius vel explicabo qui optio quidem et suscipit maxime id magni fuga ullam reiciendis impedit accusantium accusamus.",
      image: "/DSC_2778.jpg",
    },
    {
      title: "Effective filtering tool",
      subFeatures: ["Search by different variables", "Fast filtering"],
      bodyParagraph:
        "dolorum quod eum, corporis libero placeat autem earum molestiae non. Explicabo pariatur ab adipisci nam aut suscipit illum, ea reiciendis deleniti aliquam! Laboriosam repellat nihil nesciunt consectetur et, ut dolor doloribus fugiat incidunt beatae. Atque sit ullam delectus? Animi erro",
      image: "/budapest.jpg",
    },
    {
      title: "Best offers on the web",
      subFeatures: [
        "More than 1000 landlords",
        "More than 300 successful deals",
        "More than 200 agencies",
      ],
      bodyParagraph:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident laboriosam dolorem voluptates, voluptatibus eius vel explicabo qui optio quidem et suscipit maxime id magni fuga ullam reiciendis impedit accusantium accusamus.",
      image: "/budapest2.jpg",
    },
  ];
  const forLandlordsFeatures = [
    {
      title: "High traffic",
      subFeatures: [
        "More than 10,000 visiters / day",
        "More than 300 successful deals",
      ],
      bodyParagraph:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident laboriosam dolorem voluptates, voluptatibus eius vel explicabo qui optio quidem et suscipit maxime id magni fuga ullam reiciendis impedit accusantium accusamus.",
      image: "/budapest3.jpg",
    },
    {
      title: "Flexibility",
      subFeatures: [
        "You can create up to 4 offers.",
        "You can have extra offers by paying small fee.",
      ],
      bodyParagraph:
        "laudantium consequuntur facilis, reiciendis fuga quae id veritatis quos sed officia. Ea reprehenderit, modi aut ipsa quibusdam sit ducimus itaque ipsam maxime aliquid voluptatem, omnis repellendus recusandae quidem repudiandae perspiciatis voluptate ducimus nam est corrupti. ",
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
        "autem natus quo incidunt atque impedit numquam. Pariatur iusto facilis explicab neque consequuntur quidem quis vel quos provident sequi voluptates tenetur? Culpa aspernatur ut facere a tempor dignissimos deleniti aliquid, ipsum porro! Error autem placeat",
      image: "/budapest2.jpg",
    },
  ];

  const [forTenantsActive, setTenantsActive] = useState(true);
  const [forLandlordsActive, setForLandlordsActive] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const currentTL = forLandlordsActive
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
        {currentTL.map((feature, index) => (
          <div className="feature" key={index}>
            <Typography className="feature-title" variant="h1" component="h1">
              {feature.title}
            </Typography>
            <Typography className="sub-features" variant="button" gutterBottom>
              {feature.subFeatures.map((subFeature, index2) => (
                <span key={index2}>{subFeature} | </span>
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
        <Typography className="feature-view-title" variant="h4" component="h4">
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
