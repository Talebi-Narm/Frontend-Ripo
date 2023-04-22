import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState, useRef } from "react";

import Categorieslist from "../Catergories";
import ShowProduct from "../ShowProduct/ShowProduct";

const BgAnimation = styled(Card)`
  ${({ theme }) => `
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.Long,
  })};
  `}
`;

function ProductWithCategory() {
  const [plantsData, setPlantsData] = React.useState([]);
  const [toolsData, setToolsData] = React.useState([]);
  const [isplant, setIsPlant] = React.useState(0);
  const [categoryText, setCategoryText] = React.useState("");
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [bgColor, setBgColor] = React.useState("#ebf7f6");

  const handleChangePage = (value) => {
    setPage(value);
  };

  const handleChangeAllPage = (value) => {
    setAllPage(value);
  };

  const fetchPagination = () => {
    fetch("http://127.0.0.1:8000/api/allPagination/", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: "12", page: `${page}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setAllPage(data.pageCount);
      });
  };

  const fetchPlantsPagination = (name) => {
    if (name !== "All plants") {
      fetch("http://127.0.0.1:8000/api/plantsAdvanceSearch/", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          tags: [`${name}`],
          pagination: { count: "12", page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPlantsData(data.data);
          setAllPage(data.pageCount);
        });
    } else {
      fetch("http://127.0.0.1:8000/api/plantsAdvanceSearch/", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          pagination: { count: "12", page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPlantsData(data.data);
          setAllPage(data.pageCount);
        });
    }
  };
  const fetchToolsPagination = (name) => {
    if (name !== "All tools") {
      fetch("http://127.0.0.1:8000/api/toolsAdvanceSearch/", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          tags: [`${name}`],
          pagination: { count: "12", page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToolsData(data.data);
          setAllPage(data.pageCount);
        });
    } else {
      fetch("http://127.0.0.1:8000/api/toolsAdvanceSearch/", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: null,
          price: { lower: null, higher: null },
          pagination: { count: "12", page: `${page}` },
          sort: { kind: null, order: null },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToolsData(data.data);
          setAllPage(data.pageCount);
        });
    }
  };

  const myRef = useRef();

  const handlePlantsData = (value) => {
    setPlantsData(value);
    setIsPlant(1);
  };

  const handleCategoryText = (value) => {
    setCategoryText(value);
  };

  const handleDelete = () => {
    fetchPagination();
    setIsPlant(0);
  };

  const handleToolsData = (value) => {
    setToolsData(value);
    setIsPlant(2);
  };

  const ChangeBg = (p) => {
    if (p === 0) {
      setBgColor("#ebf7f6");
    }
    if (p === 1) {
      setBgColor("#e1fde6");
    }
    if (p === 2) {
      setBgColor("#fcf6d7");
    }
  };

  useEffect(() => {
    if (isplant === 0) {
      fetchPagination();
      setBgColor("#ebf7f6");
    }
    if (isplant === 1) {
      fetchPlantsPagination(categoryText);
      setBgColor("#e1fde6");
    }
    if (isplant === 2) {
      fetchToolsPagination(categoryText);
      setBgColor("#fcf6d7");
    }
  }, [page]);

  const handleChange = (event, value) => {
    setTimeout(() => {
      window.scrollTo({ behavior: "smooth", top: myRef.current.offsetTop });
    }, 500);
    setPage(value);
  };

  return (
    <Grid container sx={{ width: "100%" }}>
      <BgAnimation
        style={{ backgroundColor: bgColor }}
        sx={{
          boxShadow: 3,
          flex: 1,
          m: { xs: 3, sm: 5 },
          pl: { xs: 2, sm: 2, md: 2 },
          pr: { xs: 2, sm: 2, md: 3.5 },
          pt: 2,
          pb: 2,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid
            sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
            item
            xs={12}
            sm={12}
            md={2}
          >
            <Categorieslist
              bindplants={handlePlantsData}
              bindtools={handleToolsData}
              bindall={handleDelete}
              settext={handleCategoryText}
              setpageall={handleChangeAllPage}
              setgivenpage={handleChangePage}
              ChangeBg={ChangeBg}
              hasClose={false}
            />
          </Grid>
          <Grid ref={myRef} item xs={12} sm={12} md={10} sx={{ pt: 0 }}>
            {isplant === 0 && <ShowProduct data={products} />}
            {isplant === 1 && <ShowProduct data={plantsData} />}
            {isplant === 2 && <ShowProduct data={toolsData} />}
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3, mb: 1 }}
            >
              <Grid item>
                {isplant === 0 && (
                  <Pagination
                    className="pagination_center"
                    count={allPage}
                    page={page}
                    onChange={handleChange}
                  />
                )}
                {isplant === 1 && (
                  <Pagination
                    className="pagination_center"
                    count={allPage}
                    page={page}
                    onChange={handleChange}
                  />
                )}
                {isplant === 2 && (
                  <Pagination
                    className="pagination_center"
                    count={allPage}
                    page={page}
                    onChange={handleChange}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </BgAnimation>
    </Grid>
  );
}

export default ProductWithCategory;
