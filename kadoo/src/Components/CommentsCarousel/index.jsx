import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Typography, Avatar, Box, Slide, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./style.scss";

const comments = [
  {
    id: 1,
    comment:
      "I just wanted to say how delighted I am with the plant I purchased from your store. It's been a few weeks since I brought it home, and it has surpassed my expectations in every way. The plant is healthy, well-groomed, and has adapted seamlessly to its new environment. Thank you for providing such high-quality plants!",
    profile: "Navid",
  },
  {
    id: 2,
    comment:
      "I couldn't be happier with the plant I bought from your nursery. It's evident that you take great care in selecting and nurturing your plants. The one I chose is thriving and has become the focal point of my living room. Your attention to detail and commitment to customer satisfaction truly sets you apart. I'll definitely be returning for more green additions to my home!",
    profile: "Narges",
  },
  {
    id: 3,
    comment:
      "I wanted to express my gratitude for the exceptional service and the incredible plant I purchased from your store. From the moment I walked in, the staff was knowledgeable, friendly, and eager to assist. The plant I chose is not only visually stunning, but it's also healthy and vibrant. It's clear that you prioritize quality and customer satisfaction. I'll be recommending your store to all my friends and family!",
    profile: "Deniz",
  },
  // Add more comments here
];

function CustomerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const containerRef = React.useRef(null);

  const handlePrev = () => {
    setDirection("left");
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? comments.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection("right");
    setActiveIndex((prevIndex) =>
      prevIndex === comments.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight={200}
      position="relative"
      ref={containerRef}
    >
      <IconButton
        aria-label="Previous"
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "0%",
          transform: "translateY(-50%)",
        }}
      >
        <ChevronLeft />
      </IconButton>
      {comments.map((comment, index) => (
        <Slide
          container={containerRef.current}
          key={comment.id}
          direction={direction}
          in={index === activeIndex}
          sx={{ display: index !== activeIndex ? "none" : "flex" }}
          className="fade"
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="80%"
            marginLeft={1}
            marginRight={1}
          >
            <Avatar
              alt={comment.profile}
              src=""
              sx={{ width: 80, height: 80, marginBottom: 2 }}
            />
            <Typography variant="body1" align="center">
              {comment.comment}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
            >
              - {comment.profile}
            </Typography>
          </Box>
        </Slide>
      ))}
      <IconButton
        aria-label="Next"
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "0%",
          transform: "translateY(-50%)",
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
}

export default CustomerCarousel;
