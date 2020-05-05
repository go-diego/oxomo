import React from "react";
import { to } from "await-to-js";
import ApodCard from "./ApodCard";
import { APOD } from "../api/nasa.api";
import ErrorTile from "./ErrorTile";

const nasaApodApi = new APOD();

const initialState = {
  isLoading: true,
  error: null,
  data: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case "FAIL":
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export default function ApodCardContainer() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    async function getData() {
      const [error, response] = await to(nasaApodApi.get());
      if (error) return dispatch({ type: "FAIL", payload: error });
      dispatch({
        type: "SUCCESS",
        payload: response
      });
    }
    getData();
  }, []);

  if (state.error) return <ErrorTile />;
  return <ApodCard isLoading={state.isLoading} {...state.data} />;
}
