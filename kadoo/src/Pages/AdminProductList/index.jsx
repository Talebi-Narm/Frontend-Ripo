import "./style.scss";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Fab } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id1, kind) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
      },
    };
    if (kind === "Plant") {
      fetch(`http://127.0.0.1:8000/api/plantsRUD/${id1}/`, requestOptions).then(
        (res) => {
          if (res.status === 200) {
            alert("Delete successful");
            handleClose();
          }
        }
      );
    } else {
      fetch(`http://127.0.0.1:8000/api/toolsRUD/${id1}/`, requestOptions).then(
        (res) => {
          if (res.status === 200) {
            alert("Delete successful");
            handleClose();
          }
        }
      );
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="productListItem">{params.row.id}</div>;
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },
    {
      field: "image",
      headerName: "Image",
      headerAlign: "center",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={`http://127.0.0.1:8000${params.row.image}`}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 70,
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="productListItem">${params.row.price}</div>;
      },
    },
    {
      field: "count",
      headerName: "Count",
      width: 80,
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="productListItem">{params.row.count}</div>;
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/AdminPage/product/${params.row.id}/`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={handleClickOpen}>
              <DeleteOutlineIcon />
            </IconButton>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                Delete confirmation
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this item?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  No
                </Button>
                <Button
                  onClick={() => handleDelete(params.row.id, params.row.kind)}
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      },
    },
  ];
  const fetchPagination = () => {
    fetch("http://127.0.0.1:8000/api/allPagination/", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: "999", page: `1` }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      });
  };

  useEffect(() => {
    fetchPagination();
  }, []);

  useEffect(() => {}, [products]);

  return (
    <div className="productList">
      <Link to="/AdminPage/newProduct" className="LinkFab">
        <Fab variant="extended" className="userAddButton">
          <AddIcon sx={{ mr: 1 }} />
          Add Product
        </Fab>
      </Link>
      <DataGrid
        align="center"
        textCenter
        className="DataTable"
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={6}
        checkboxSelection
      />
    </div>
  );
}
