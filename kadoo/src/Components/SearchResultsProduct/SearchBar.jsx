import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.07),
  },
  marginRight: theme.spacing(0),
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
  },
}));

const StyledColorSerchIconButton = styled(IconButton)(({ theme }) => ({
  color: alpha(theme.palette.common.black, 0.25),
  "&:hover": {
    color: alpha(theme.palette.common.black, 0.75),
  },
}));

function SearchBar(props) {
  const [searchText, setSearchText] = useState("");

  function handleChange(e) {
    setSearchText(e.target.value.trim());
  }

  return (
    <div>
      <Grid container marginLeft={0} alignItems="left" justifyContent="left">
        <Grid
          container
          item
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Search>
              <Grid wrap="nowrap" container direction="row" alignItems="center">
                <Grid item>
                  <StyledColorSerchIconButton
                    sx={{ ml: 2, p: 1 }}
                    size="small"
                    onClick={() => {
                      props.funcSearchPlantsByName(searchText);
                      props.funcSearchToolsByName(searchText);
                      props.funcSearchProductsByName(searchText);
                    }}
                  >
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                  </StyledColorSerchIconButton>
                </Grid>
                <Grid item>
                  <StyledInputBase
                    sx={{ ml: 0 }}
                    placeholder="Search for …"
                    defaultValue={props.default}
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
            </Search>
          </Grid>
          {/* <Grid item>
            {searchedText !== '' && (
              <Chip label={searchedText} variant='outlined' />
            )}
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchBar;
