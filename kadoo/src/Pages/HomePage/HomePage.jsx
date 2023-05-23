import { Box, Grid } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useInView } from "react-intersection-observer";

import CommentsBar from "../../Components/CommentsBar";
import HeroSection from "../../Components/HeroSection";
import LeadProducts from "../../Components/LeadProducts";

function ScrollAnimation({ children }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transition: "opacity 500ms ease-in-out",
      }}
    >
      {children}
    </Box>
  );
}

export default function HomePageRefactored() {
  const [heightImage, setHeightImage] = useState(0);

  const ref = useRef(null);
  const styles = {
    maeginFixer: {
      height: {
        xs: `calc(${heightImage}px + 50px)`,
        md: `calc(${heightImage}px - 200px)`,
        lg: `calc(${heightImage}px - 150px)`,
        xl: `calc(${heightImage}px - 150px)`,
      },
    },
  };
  useEffect(() => {
    setTimeout(() => setHeightImage(ref.current.clientHeight), 1000);
  });

  return (
    <Grid container>
      <Grid container item sx={styles.maeginFixer}>
        <HeroSection
          ref={ref}
          heightImage={heightImage}
          setHeightImage={setHeightImage}
        />
      </Grid>
      <ScrollAnimation>
        <Grid container item>
          {heightImage !== 0 && <LeadProducts heightImage={heightImage} />}
        </Grid>
      </ScrollAnimation>
      <ScrollAnimation>
        <Grid container item>
          {heightImage !== 0 && <CommentsBar />}
        </Grid>
      </ScrollAnimation>
    </Grid>
  );
}
