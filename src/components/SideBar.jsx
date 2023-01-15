import React from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import FormDialog from "./dialog/FormDialog";
import CrawlerDialog from "./dialog/CrawlerDialog";

function SideBar() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open2, setOpen2] = React.useState(false);



  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <div className="sideBar">
      <Stack>
        <Button onClick={handleClickOpen}>New Link</Button>
     
      </Stack>
      <FormDialog open={open} close={handleClose}/>
      <CrawlerDialog open={open2} close={handleClose2}/>
    </div>
  );
}

export default SideBar;
