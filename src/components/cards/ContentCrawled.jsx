import { Button, Grid, Link, Stack, Typography } from "@mui/material";
import React from "react";

function ContentCrawled({data,onSave}) {
  return (
    <Grid container sx={{border:1}} justifyContent="space-between">
      <Grid item sx={{mr:8}}>
        <Stack sx={{ marginLeft: "1rem" }} direction="row" spacing={1}>
          <Typography variant="h5">Title:</Typography>
          <Typography
         
            variant="h6"
           
          >
            {data.title}
          </Typography>
        </Stack>
        <Stack sx={{ marginLeft: "1rem" }} direction="row" spacing={1}>
          <Typography variant="h5">URL:</Typography>
          <Link
            component="button"
            variant="h6"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            {data.link}
          </Link>
        </Stack>
      </Grid>
      <Grid item alignSelf='center' sx={{height:"100%"}}>
        <Button onClick={onSave} sx={{height:70}} variant="contained">save Link</Button>

      </Grid>
    </Grid>
  );
}

export default ContentCrawled;
