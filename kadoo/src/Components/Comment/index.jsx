import ReplyIcon from "@mui/icons-material/Reply";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Rating,
  Divider,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import axiosInstance from "../../Utils/axios";

function Comments({ id, tool }) {
  const [comments, setComments] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = (comment) => {
    setComments(
      comments.map((x) =>
        x.id === comment.id
          ? { ...x, selected: !x.selected }
          : { ...x, selected: false }
      )
    );
  };

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
            id: x.id,
            text: x.text,
            rating: x.rate,
            profileImg: "",
            username: x.owner_detail.username,
            selected: false,
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
          sx={{
            width: "100%",
            backgroundColor: comment.selected ? "whitesmoke" : "transparent",
            borderRadius: "12px",
            px: 2,
            pt: 2,
            pb: 0,
          }}
        >
          <Box
            key={comment.id}
            display="flex"
            alignItems="center"
            sx={{
              opacity: isSubmitting ? 0.5 : 1,
              transition: "opacity 0.3s ease",
              pb: 2,
            }}
          >
            <Avatar src={comment.profileImg} alt={comment.username} />
            <Box ml={2} sx={{ flexGrow: 1 }}>
              <Typography variant="caption" component="div">
                {comment.username}
              </Typography>
              <Rating value={comment.rating} readOnly />
              <Typography variant="body1">{comment.text}</Typography>
            </Box>
            <Box sx={{ alignSelf: "flex-end" }}>
              <IconButton>
                <ReplyIcon onClick={() => handleReply(comment)} small />
              </IconButton>
            </Box>
          </Box>
          <Box ml={2} sx={{ width: "100%" }}>
            <Divider sx={{ flexGrow: 1, mr: 4 }} />
          </Box>
        </Box>
      ))}

      <Typography variant="body1" sx={{ mt: 2 }}>
        Write a Comment
      </Typography>
      {comments.find((x) => x.selected) &&
        comments
          .filter((x) => x.selected)
          .map((comment) => (
            <Box
              key={comment.id}
              display="flex"
              alignItems="center"
              sx={{
                opacity: 0.5,
                transition: "opacity 0.3s ease",
                pt: 1,
                pb: 0,
              }}
            >
              <Avatar src={comment.profileImg} alt={comment.username} />
              <Box ml={2} sx={{ flexGrow: 1 }}>
                <Typography variant="caption" component="div">
                  {comment.username}
                </Typography>
                <Rating value={comment.rating} readOnly />
                <Typography variant="body1">{comment.text}</Typography>
              </Box>
            </Box>
          ))}

      <Box display="flex" alignItems="center" mt={1} mb={2}>
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
