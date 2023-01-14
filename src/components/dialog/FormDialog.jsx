import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/system";
import { axiosInstance } from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { getMyLinks } from "../../store/slice/link";
import Swal from "sweetalert2";

export default function FormDialog({ open, close, edit, data }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(edit?data.title:'');
  const [url, setUrl] = useState(edit?data.url:'');

  async function saveLink() {
    if (edit) {
      try {
        await axiosInstance
          .put(`/links/${data.id}`, { title: title, url: url })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Link updated",
            });
            close();
          });
        dispatch(getMyLinks());
      } catch (error) {
        console.log(error);
      }
    } else{
      try {
        await axiosInstance
          .post("/links", { title: title, url: url })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Link saved",
            });
            setTitle("");
            setUrl("");
            close();
          });
        dispatch(getMyLinks());
      } catch (error) {
        console.log(error);
      }

    }
  }

  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle>{edit?'Edit link':'New Link'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              label="Title"
              variant="outlined"
            />
            <TextField
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              label="URL"
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveLink}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
