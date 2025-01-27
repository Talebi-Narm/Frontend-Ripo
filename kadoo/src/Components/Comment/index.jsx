import CloseIcon from "@mui/icons-material/Close";
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
  const [replyComment, setReplyComment] = useState(null);
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
    setReplyComment(
      replyComment ? (replyComment.id === comment.id ? null : comment) : comment
    );
  };

  const handleReplySecond = (comment) => {
    setComments(
      comments.map((x) => ({
        ...x,
        selected: false,
        replies: x.replies.map((y) =>
          y.id === comment.id
            ? { ...y, selected: !y.selected }
            : { ...y, selected: false }
        ),
      }))
    );
    setReplyComment(
      replyComment ? (replyComment.id === comment.id ? null : comment) : comment
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
        setComments(
          response.data
            .filter((z) => !z.reply_to)
            .map((x) => ({
              id: x.id,
              text: x.text,
              rating: x.rate,
              profileImg: "",
              username: x.owner_detail.username,
              selected: false,
              replies: response.data
                .filter((y) => y.reply_to === x.id)
                .map((z) => ({
                  id: z.id,
                  text: z.text,
                  rating: z.rate,
                  profileImg: "",
                  username: z.owner_detail.username,
                  selected: false,
                  replies: response.data.filter((k) => k.reply_to === z.id),
                })),
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
      let newCommentObj = {};
      if (tool) {
        if (replyComment) {
          newCommentObj = {
            text: newComment,
            owner: userInfo.id,
            tool: id,
            rate: rating,
            reply_to: replyComment.id,
          };
        } else {
          newCommentObj = {
            text: newComment,
            owner: userInfo.id,
            tool: id,
            rate: rating,
          };
        }
      } else if (replyComment) {
        newCommentObj = {
          text: newComment,
          owner: userInfo.id,
          plant: id,
          rate: rating,
          reply_to: replyComment.id,
        };
      } else {
        newCommentObj = {
          text: newComment,
          owner: userInfo.id,
          plant: id,
          rate: rating,
        };
      }

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
            setReplyComment(null);
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
    console.log("comments: ", comments);
  }, [comments]);

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

          {comment.replies.map((x) => (
            <Box
              sx={{
                width: "100%",
                backgroundColor: x.selected ? "whitesmoke" : "transparent",
                borderRadius: "12px",
                pl: 2,
                pt: 0,
                pb: 0,
              }}
            >
              <Box
                key={x.id}
                display="flex"
                alignItems="center"
                sx={{
                  opacity: isSubmitting ? 0.5 : 1,
                  transition: "opacity 0.3s ease",
                  pb: 2,
                }}
              >
                <Box ml={2} sx={{ height: "100%" }} />
                <Avatar src={x.profileImg} alt={x.username} />
                <Box ml={2} sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" component="div">
                    {x.username}
                  </Typography>
                  <Rating value={x.rating} readOnly />
                  <Typography variant="body1">{x.text}</Typography>
                </Box>
                <Box sx={{ alignSelf: "flex-end" }}>
                  <IconButton>
                    <ReplyIcon onClick={() => handleReplySecond(x)} small />
                  </IconButton>
                </Box>
              </Box>
              {x.replies.map((y) => (
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: "12px",
                    pl: 2,
                    pt: 0,
                    pb: 0,
                  }}
                >
                  <Box
                    key={y.id}
                    display="flex"
                    alignItems="center"
                    sx={{
                      opacity: isSubmitting ? 0.5 : 1,
                      transition: "opacity 0.3s ease",
                      pb: 2,
                    }}
                  >
                    <Box ml={4} sx={{ height: "100%" }} />
                    <Avatar src={y.profileImg} alt={y.owner_detail.username} />
                    <Box ml={2} sx={{ flexGrow: 1 }}>
                      <Typography variant="caption" component="div">
                        {y.owner_detail.username}
                      </Typography>
                      <Rating value={y.rate} readOnly />
                      <Typography variant="body1">{y.text}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
          <Box ml={2} sx={{ width: "100%" }}>
            <Divider sx={{ flexGrow: 1, mr: 4 }} />
          </Box>
        </Box>
      ))}

      <Typography variant="body1" sx={{ mt: 2 }}>
        Write a Comment
      </Typography>
      {replyComment && (
        <Box
          key={replyComment.id}
          display="flex"
          alignItems="center"
          sx={{
            opacity: 0.5,
            transition: "opacity 0.3s ease",
            pt: 1,
            pb: 0,
          }}
        >
          <Avatar src={replyComment.profileImg} alt={replyComment.username} />
          <Box ml={2} sx={{ flexGrow: 1 }}>
            <Typography variant="caption" component="div">
              {replyComment.username}
            </Typography>
            <Rating value={replyComment.rating} readOnly />
            <Typography variant="body1">{replyComment.text}</Typography>
          </Box>
          <Box sx={{ alignSelf: "flex-start" }}>
            <IconButton>
              <CloseIcon onClick={() => setReplyComment(null)} small />
            </IconButton>
          </Box>
        </Box>
      )}

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
