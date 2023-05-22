import { Grid } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

import HeroSection from "../../Components/HeroSection";
import LeadProducts from "../../Components/LeadProducts";

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
      <Grid container item>
        {heightImage !== 0 && <LeadProducts heightImage={heightImage} />}
      </Grid>
    </Grid>
  );
}
