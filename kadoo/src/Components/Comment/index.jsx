import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Rating,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import axiosInstance from "../../Utils/axios";

function Comments({ id, tool }) {
  const [comments, setComments] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    axiosInstance
      .get(
        tool
          ? `v1/store/tools/${id}/comments/`
          : `v1/store/plants/${id}/comments/`
      )
      .then((response) => {
        console.log("response: ", response);
        setComments(
          response.data.map((x) => ({
            text: x.text,
            rating: x.rate,
            profileImg: "",
            username: x.owner_detail.username,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  const fetchUserInfo = async () => {
    axiosInstance
      .get(`v1/user/me/`)
      .then((response) => {
        console.log("User Info: ", response);
        setUserInfo(response.data.user);
      })
      .catch((error) => {
        console.error("Error User Info:", error);
      });
  };

  const postComment = async () => {
    if (userInfo) {
      setIsSubmitting(true);

      const newCommentObj = tool
        ? {
            text: newComment,
            owner: userInfo.id,
            tool: id,
            rate: rating,
          }
        : {
            text: newComment,
            owner: userInfo.id,
            plant: id,
            rate: rating,
          };

      axiosInstance
        .post(
          tool ? `v1/store/tool-comments/` : `v1/store/plant-comments/`,
          JSON.stringify(newCommentObj)
        )
        .then((response) => {
          console.log("Post response: ", response);
          if (response.status === 200 || response.status === 201) {
            setNewComment("");
            setRating(1);
            fetchComments();
            setIsSubmitting(false);
          }
        })
        .catch((error) => {
          console.error("Error posting comment:", error);
        });
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      fetchComments();
    }
  }, [userInfo]);

  useEffect(() => {
    console.log("rating:", rating);
  }, [rating]);

  return (
    <Box sx={{ width: "100%" }}>
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
            <Typography variant="caption" component="div">
              {comment.username}
            </Typography>
            <Rating value={comment.rating} readOnly />
            <Typography variant="body1">{comment.text}</Typography>
          </Box>
        </Box>
      ))}

      <Typography variant="h6">Write a Comment</Typography>
      <Box display="flex" alignItems="center" my={2}>
        <Box sx={{ width: "100%", pr: 2 }}>
          <TextField
            label="Your Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifySelf: "flex-end",
          }}
        >
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              if (newValue === 0 || !newValue) {
                setRating(1);
              } else {
                setRating(newValue);
              }
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
    </Box>
  );
}

export default Comments;
