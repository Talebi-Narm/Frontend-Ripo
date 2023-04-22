import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpacityIcon from "@mui/icons-material/Opacity";
import { Avatar, Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSlopeCardMediaStyles } from "@mui-treasury/styles/cardMedia/slope";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
// eslint-disable-next-line import/no-extraneous-dependencies
import cx from "clsx";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import React from "react";

import "./GreenHouseCard.scss";
import Theme from "../../Theme/ThemeGenerator";
import Reminder from "../Reminder/index";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "440px",
    margin: "auto",
  },
  content: {
    padding: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    border: "2px solid #fff",
    margin: "-62px 32px 0 auto",
    "& > img": {
      margin: 0,
    },
  },
}));

function GreenHouseCard(props) {
  const cardStyles = useStyles();
  const mediaStyles = useSlopeCardMediaStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const [reminderOpen, setReminderOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {}, [reminderOpen]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCalendar = () => {
    if (props.data.haveCalendar) {
      // history.push("https://calendar.google.com/");
      window.location.reload(true);
    } else {
      setReminderOpen(true);
      handleClose();
    }
  };

  const handleClickReminderOpen = () => {
    setReminderOpen(true);
    handleClose();
  };
  const handleClickReminderClose = () => {
    setReminderOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };

    setTimeout(async () => {
      fetch(
        `http://127.0.0.1:8000/api/myPlantsRUD/${props.data.id}/`,
        requestOptions
      ).then(async () => {
        props.reloadFunc();
      });
    }, 500);
  };

  return (
    <ThemeProvider sx={{ height: "100%" }} theme={Theme}>
      <Card
        className={cx(cardStyles.root, shadowStyles.root)}
        sx={{ height: "100%" }}
      >
        <div className="layer">
          <Grid className="layer" container justifyContent=" flex-end">
            <Grid className="layer" item>
              <IconButton
                className="layer"
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ mt: 1, mr: 1 }}
              >
                <MoreVertIcon style={{ color: "white" }} />
              </IconButton>
            </Grid>
          </Grid>

          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "20ch",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                handleDelete();
              }}
            >
              <Box>
                <IconButton sx={{ mr: 2 }} size="small">
                  <DeleteIcon />
                </IconButton>
                Delete
              </Box>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
                props.OpenDialog(props.data);
              }}
            >
              <Box>
                <IconButton sx={{ mr: 2 }} size="small">
                  <EditIcon />
                </IconButton>
                Edit
              </Box>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClickReminderOpen();
              }}
            >
              <Box>
                <IconButton sx={{ mr: 2 }} size="small">
                  <AddAlarmIcon />
                </IconButton>
                Add Reminder
              </Box>
            </MenuItem>
          </Menu>
        </div>
        <Grid sx={{ p: 1, mt: -6 }}>
          <CardMedia
            classes={mediaStyles}
            image={`http://127.0.0.1:8000${props.data.image}`}
            className="productIconImage"
          />
        </Grid>
        <Avatar className={cardStyles.avatar}>
          <Fab
            color={props.data.haveCalendar ? "primary" : "secondary"}
            aria-label="add"
            onClick={() => {
              handleClickCalendar();
            }}
          >
            <OpacityIcon className="FabColor" />
          </Fab>
        </Avatar>
        <CardContent className={cardStyles.content}>
          <TextInfoContent
            className="FontRight"
            classes={textCardContentStyles}
            heading={props.data.name}
            body={
              <div>
                <div className="descriptionText">
                  {props.data.description != null
                    ? props.data.description.length > 99
                      ? `${props.data.description.substring(0, 99)} ...`
                      : props.data.description
                    : ""}
                </div>
              </div>
            }
          />
        </CardContent>
      </Card>
      <BootstrapDialog
        onClose={handleClickReminderClose}
        aria-labelledby="customized-dialog-title"
        open={reminderOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClickReminderClose}
        >
          Add Reminder
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid item container>
            <Reminder
              summary={props.data.name}
              location={props.data.location}
              description={props.data.description}
              id={props.data.id}
              onClose={handleClickReminderClose}
            />
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </ThemeProvider>
  );
}

export default GreenHouseCard;
