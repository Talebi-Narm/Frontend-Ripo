import { createStore } from "redux";

// Define an initial state
const initialState = {
  count: 0,
};

// Define a reducer function
// eslint-disable-next-line default-param-last, no-shadow
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVETERMNAME":
      return {
        ...state,
        termname: action.payload,
      };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

export default store;
