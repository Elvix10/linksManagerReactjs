import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import LinkCard from "./cards/LinkCard";
import { useSelector, useDispatch } from "react-redux";
import { getMyLinks } from "../store/slice/link";

function MainContent() {
  //const [links, setLinks] = useState([]);
  const { links } = useSelector((state) => state.link);


  const dispatch = useDispatch();
  console.log("sdsds", links);

  useEffect(() => {
    dispatch(getMyLinks());
  }, []);

  return (
    <div className="MainContent">
      {links?.length > 0 ? (
        <Grid
          sx={{ overflow: "scroll", overflowX: "hidden" }}
          container
          spacing={2}
          md={12}
          direction="row"
        >
          {links?.map((item) => (
            <Grid item md={4} xs={12}>
              <LinkCard data={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container alignItems="center" justifyContent="center">
          <Typography>No Links saved</Typography>
        </Grid>
      )}
    </div>
  );
}

export default MainContent;
