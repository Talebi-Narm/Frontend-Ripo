import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Typography, Avatar, Box, Slide, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./style.scss";

const comments = [
  {
    id: 1,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    profile: "John Doe",
  },
  {
    id: 2,
    comment: "Aenean lacinia bibendum nulla sed consectetur.",
    profile: "Jane Smith",
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
              src={`https://example.com/profiles/${comment.id}.jpg`}
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
