import Typography from "@mui/material/Typography";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//  "@mui/icons-material/ExpandMore";
export default function OfferDescription() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
  };
  return (
    <div className="OfferDescription">
      <div className="shortDescription">
        <Typography className="title" variant="h5" component="h5">
          Short Description
        </Typography>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          quidem hic, quod eligendi reiciendis praesentium harum adipisci
          eveniet vero, suscipit laudantium corporis velit ab cum facilis
          maiores itaque! Commodi, labore. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Est error atque, culpa laboriosam
          voluptate blanditiis eveniet praesentium rerum inventore, veritatis
          consectetur nobis quidem explicabo non eius rem doloremque mollitia
          tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Consequuntur facere omnis ex nobis aliquam odio, perferendis, mollitia
          aliquid eaque dolorum voluptatibus magni voluptates cum culpa
          veritatis adipisci sunt incidunt nesciunt.
        </p>
      </div>
      <div className="moreInfo">
        <Typography className="title" variant="h5" component="h5">
          More Information
        </Typography>
        <div className="dropDowns">
          <Accordion className="dropDown">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>1. Some Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Libero corporis magni incidunt. Eum quos nihil accusantium
                perspiciatis, facere tempore explicabo at repellat, ratione
                soluta accusamus culpa impedit, non dolor illo?
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="dropDown">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>2. Some Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere a similique iure consequatur soluta veniam nemo minus
                eveniet, dolorum at animi labore possimus libero harum molestiae
                quis dolore totam alias!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="dropDown">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="l" />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>3. Some Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere a similique iure consequatur soluta veniam nemo minus
                eveniet, dolorum at animi labore possimus libero harum molestiae
                quis dolore totam alias!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
