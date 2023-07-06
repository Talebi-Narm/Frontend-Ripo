import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send as SendIcon } from "@material-ui/icons";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, IconButton, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import axiosInstance, { baseURL } from "../../Utils/axios";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(7),
  },
  message: {
    display: "flex",
    marginBottom: theme.spacing(2),
    flexDirection: "row-reverse",
    alignItems: "center",
    "&.received": {
      flexDirection: "row",
    },
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  bubble: {
    display: "inline-block",
    maxWidth: "80%",
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(2),
    color: "#fff",
    wordWrap: "break-word",
  },
  sentBubble: {
    backgroundColor: "#00c85390",
    animation: `$sentBubbleEnter 0.5s ${theme.transitions.easing.easeInOut}`,
  },
  receivedBubble: {
    backgroundColor: "#00504650",
    animation: `$receivedBubbleEnter 0.5s ${theme.transitions.easing.easeInOut}`,
  },
  sendContainer: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),
    borderTop: "1px solid #ccc",
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: theme.spacing(2),
    border: "none",
    outline: "none",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  sendButton: {
    backgroundColor: "#00c85390",
    color: "#fff",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#00c853",
    },
  },
  "@keyframes sentBubbleEnter": {
    "0%": {
      opacity: 0,
      transform: "translateX(100%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  "@keyframes receivedBubbleEnter": {
    "0%": {
      opacity: 0,
      transform: "translateX(-100%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
}));

function ChatUI() {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [socket, setSocket] = useState(null);
  const [specialistSocket, setSpecialistSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [role, setRole] = useState("user_message");

  const theme = useTheme();

  const toggleConversation = (index) => {
    setOpenIndex(index);
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

  useEffect(() => {
    if (userInfo) {
      setSocket(
        new WebSocket(
          `ws://${baseURL
            .replace("https://", "")
            .replace("http://", "")
            .replace("api/", "")}ws/v1/support/chat/${
            userInfo.id
          }/?token=${localStorage.getItem("access_token")}`
        )
      );
      setSpecialistSocket(
        new WebSocket(
          `ws://${baseURL
            .replace("https://", "")
            .replace("http://", "")
            .replace(
              "api/",
              ""
            )}ws/v1/support/ticket/notifications/?token=${localStorage.getItem(
            "access_token"
          )}`
        )
      );
    }
  }, [userInfo]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (openIndex !== null) {
      setSocket(
        new WebSocket(
          `ws://${baseURL
            .replace("https://", "")
            .replace("http://", "")
            .replace("api/", "")}ws/v1/support/chat/${
            conversations[openIndex].user_id
          }/?token=${localStorage.getItem("access_token")}`
        )
      );
    }
  }, [openIndex]);

  useEffect(() => {
    if (socket) {
      // eslint-disable-next-line func-names
      socket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.message) {
          const newMessage = {
            id: Date.now(),
            content: data.message,
            sender: role === data.type ? "me" : "other",
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };
    }
    if (specialistSocket) {
      // eslint-disable-next-line func-names
      specialistSocket.addEventListener("open", () => {
        // Connection successful
        console.log("Specialist WebSocket connection established");
      });

      specialistSocket.addEventListener("error", (error) => {
        // Connection error
        console.error("Specialist WebSocket connection error:", error);
      });

      specialistSocket.addEventListener("close", (event) => {
        // Connection closed
        console.log(
          "Specialist WebSocket connection closed with code:",
          event.code
        );
        setRole("user_message");
      });
      // eslint-disable-next-line func-names
      specialistSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log("specialist notify", data);

        if (data.active_tickets) {
          setRole("specialist_message");
          setConversations(data.active_tickets);
        }
      };
    }
    return null;
  }, [socket]);

  const sendMessage = () => {
    socket.send(
      JSON.stringify({
        title: inputValue,
        type: "new_ticket",
      })
    );
    socket.send(
      JSON.stringify({
        message: inputValue,
        type: "new_message",
      })
    );
    setInputValue("");
  };

  const closeConversation = () => {
    socket.send(
      JSON.stringify({
        type: "close_ticket",
      })
    );
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      sendMessage();
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {role === "specialist_message" && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container alignItems="center">
              <Grid
                item
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "100%",
                  width: "24px",
                  height: "24px",
                  textAlign: "center",
                  mr: 2,
                }}
              >
                {conversations.length}
              </Grid>
              <Grid item>
                <Typography variant="h6">Open Conversations</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: "100%" }}>
              <List sx={{ width: "100%", marginTop: 2 }}>
                {conversations.map((conversation, index) => (
                  <ListItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    button
                    selected={openIndex === index}
                    onClick={() => toggleConversation(index)}
                    sx={{
                      color: "black",
                      py: 2,
                      width: "100%",
                      borderRadius: "24px",
                      backgroundColor:
                        openIndex === index ? "#e6f7ff" : "transparent",
                      "&:hover": {
                        backgroundColor: "#e6f7ff",
                      },
                      "& .MuiButtonBase-root": {
                        borderRadius: "24px",
                      },
                    }}
                  >
                    <ListItemText primary={conversation.title} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      <div className={classes.chatContainer}>
        <div className={classes.messagesContainer}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${classes.message} ${
                message.sender !== "me" ? "received" : ""
              }`}
            >
              {message.sender === "me" && (
                <Avatar className={classes.avatar}>
                  {userInfo.username[0]}
                </Avatar>
              )}
              {message.sender !== "me" && <Avatar className={classes.avatar} />}
              <div
                className={`${classes.bubble} ${
                  message.sender === "me"
                    ? classes.sentBubble
                    : classes.receivedBubble
                }`}
              >
                <Typography variant="body1">{message.content}</Typography>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.sendContainer}>
          <input
            type="text"
            className={classes.input}
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <IconButton className={classes.sendButton} onClick={handleSend}>
            <SendIcon />
          </IconButton>
          <IconButton
            className={classes.sendButton}
            sx={{ ml: 1 }}
            onClick={closeConversation}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default ChatUI;
