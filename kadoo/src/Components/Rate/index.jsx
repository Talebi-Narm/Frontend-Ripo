import { Rating } from "@mui/material";
import * as React from "react";

export default function Rate(props) {
  const [state, setState] = React.useState(true);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (props.rate > 0) {
      setValue(props.rate);
      setState(false);
    }
  }, []);

  React.useEffect(() => {
    if (!state) {
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
          rate: value,
        }),
      };
      fetch(
        "http://127.0.0.1:8000/api/ticket/rate-ticket-member/",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log(data);
        })
        .catch((res) => {
          if (res.status === 401) {
            // eslint-disable-next-line no-alert
            alert("You must Login first!");
          }
        });
    }
  }, [state]);

  return (
    <div>
      {state && (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(e, newValue) => {
            setState(false);
            setValue(newValue);
          }}
        />
      )}
      {!state && <Rating name="disabled" value={value} disabled />}
    </div>
  );
}
