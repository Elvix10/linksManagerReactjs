import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux'
import { getMyLinks, getMyLinksScrapped } from '../../store/slice/link';
import ContentCrawled from '../cards/ContentCrawled';
import { axiosInstance } from '../../utils/axios';
import Swal from 'sweetalert2';


export default function CrawlerDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const {linksScraped}=useSelector((state)=>state.link)

  const dispatch=useDispatch()

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(()=>{
    dispatch(getMyLinksScrapped())

  },[])

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  async function saveLink(title,url){
   
    try {
      
      await axiosInstance.post('/links',{title:title,url:url})
      dispatch(getMyLinks())
      
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>Scrap DevGo</Button>
    
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Posts from DevGo</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>

          {linksScraped.map((item)=><ContentCrawled data={item} onSave={()=>saveLink(item.title,item.link)} />)}
    
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
