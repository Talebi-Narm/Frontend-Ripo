import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Rating,
} from "@mui/material";
import React, { useState, useEffect } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await fetch("https://api.example.com/comments");
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const postComment = async () => {
    try {
      setIsSubmitting(true);

      const newCommentObj = {
        text: newComment,
        username: "JohnDoe",
        profileImg: "https://example.com/profile.jpg",
        rating,
      };

      const response = await fetch("https://api.example.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentObj),
      });

      if (response.ok) {
        setNewComment("");
        setRating(0);
        fetchComments();
      } else {
        console.error("Error posting comment:", response.statusText);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error posting comment:", error);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">Old Comments</Typography>
      {comments.map((comment) => (
        <Box
          key={comment.id}
          display="flex"
          alignItems="center"
          my={2}
          style={{
            opacity: isSubmitting ? 0.5 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <Avatar src={comment.profileImg} alt={comment.username} />
          <Box ml={2}>
            <Typography variant="subtitle1">{comment.username}</Typography>
            <Rating value={comment.rating} readOnly />
            <Typography variant="body1">{comment.text}</Typography>
          </Box>
        </Box>
      ))}

      <Typography variant="h6">Write a Comment</Typography>
      <Box display="flex" alignItems="center" my={2}>
        <TextField
          label="Your Comment"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          onClick={postComment}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </Box>
    </Box>
  );
}

export default Comments;
