import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function FAQsPage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            Which indoor plants are the easiest to care for?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pothos, Aglaonema, Sansevieria, Dracaena Lisa, Spider, Corn, Iron,
            ZZ plants, Bird’s Nest fern, Cacti, Succulents.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>
            Which plants are hardy and can take some level of neglect?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Iron plant is the toughest. Sansevieria, ZZ, Aglaonema, Dracaena
            Lisa, Dracaena Art, Yucca, Jade plants, Ponytail Palm, Succulents
            and Cacti can deal well with some degree of neglect.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            What is the difference between bright, medium and low light plants?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Bright light plants will do well in direct or strong sunlight for
            the most part of a day. Medium light plants should stay out of the
            direct sunlight. They should be placed in a bright room and will
            enjoy partial or filtered sunlight. Low light plants prefer to stay
            in the shade or to be displayed under fluorescent light. Read our
            Light Guide that will help you to determine the light environment in
            your space before choosing a plant.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            I don't have much light in my home. Which plants should I try?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Iron, Aglaonema, Dracaena Lisa, Sansevieria plants. Note: if you
            can’t read a book as it is too dark in certain areas then it is too
            dark for any plant as well.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            I have a lot of sun in my space. Which plants should I choose?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ponytail and Bella palm, Bird of Paradise, Yucca, Jade plant,
            Majesty palm. Note: make sure to rotate your plants to assure equal
            light exposure to all sides and avoid leaf burning.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default FAQsPage;
