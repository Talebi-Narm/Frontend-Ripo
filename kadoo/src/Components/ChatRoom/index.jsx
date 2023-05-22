import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send as SendIcon } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import React, { useState } from "react";

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
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      content: "test sdahdas djhsabjdh dshaujd",
      sender: "ali",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        content: inputValue,
        sender: "me",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
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
              <Avatar className={classes.avatar}>B</Avatar>
            )}
            {message.sender !== "me" && (
              <Avatar className={classes.avatar}>A</Avatar>
            )}
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
      </div>
    </div>
  );
}

export default ChatUI;
