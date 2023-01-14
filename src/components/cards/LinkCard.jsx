import * as React from "react";

import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { axiosInstance } from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { getMyLinks } from "../../store/slice/link";
import Swal from "sweetalert2";
import FormDialog from "../dialog/FormDialog";

export default function LinkCard({ data }) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteLink() {
    try {
      Swal.fire({
        title: "Do you want to delete this link?",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance
            .delete(`/links/${data.id}`)
            .then(() => dispatch(getMyLinks()))
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Link deleted",
                showConfirmButton: false,
                timer: 3000,
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

      dispatch(getMyLinks());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      flexDirection="column"
      overflow="hidden"
      sx={{
        borderRadius: "1rem",
        padding: 5,

        backgroundColor: "#fff",

        minHeight: "10rem",
      }}
    >
      <Grid item>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
      </Grid>
      <Grid item alignSelf="flex-start">
        <Stack sx={{ marginLeft: "1rem" }} direction="row" spacing={1}>
          <Typography noWrap variant="h6" component="div">
            URL:
          </Typography>
          <Link component="button" variant="h6">
            {data.url}
          </Link>
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={deleteLink}
            size="small"
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            onClick={handleClickOpen}
            size="small"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Edit
          </Button>
        </Stack>
      </Grid>
      <FormDialog open={open} close={handleClose} edit={true} data={data} />
    </Grid>
  );
}
