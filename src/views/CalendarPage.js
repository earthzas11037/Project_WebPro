import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { Calendar, momentLocalizer , Views } from 'react-big-calendar' 
import moment from 'moment'
// import CalendarBasic from '../components/CalendarBasic'
import events from '../events'
import "react-big-calendar/lib/css/react-big-calendar.css";

import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {MuiPickersUtilsProvider, KeyboardTimePicker, DateTimePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const localizer = momentLocalizer(moment)

function CalendarPage(props){
    const [dataEvents, setDataEvents] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [addEvent, setAddEvent] = useState({
        title: "",
        detail: "",
        start: new Date(),
        end: new Date()
    })

    useEffect(() => {
        setDataEvents(events)
    }, [])

    const handleClickOpen = ({ title, detail, start, end })=> {
        setAddEvent({title: title, detail: detail, start: start, end, end})
        setOpen(true);
    };
  
    const handleClickNewOpen = ()=> {
        setAddEvent({
            title: "",
            detail: "",
            start: new Date(),
            end: new Date()
        })
        setOpen(true);
    };

    const handleClose = () => {
        setAddEvent({
            title: "",
            detail: "",
            start: new Date(),
            end: new Date()
        })
      setOpen(false);
    };

    const handleStartDateChange = (date) => {
        setAddEvent({...addEvent,start:date});
    };
    const handleEndDateChange = (date) => {
        setAddEvent({...addEvent,end:date});
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddEvent({
            ...addEvent,
            [name]:value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(addEvent)
        setDataEvents([
            ...dataEvents,
            {
                title: addEvent.title,
                detail: addEvent.detail,
                start: addEvent.start,
                end: addEvent.end
            }])
        setAddEvent({
            title: "",
            detail: "",
            start: new Date(),
            end: new Date()
        })
        setOpen(false);
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={8} md={6} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Grid 
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <Grid  item xs={12} sm={6} md={3}>
                        <Button 
                            variant="contained" 
                            color="primary"  
                            style={{ fontSize:"1em",borderRadius:8,float: "right"}} 
                            onClick={handleClickNewOpen}
                        >
                            + เพื่มอีเวนท์
                        </Button>
                    </Grid>
                </Grid>
                <Calendar 
                    localizer={localizer}
                    events={dataEvents}
                    selectable
                    // date={new Date()}
                    defaultView={Views.MONTH}
                    style={{ height: 700,marginTop:10}}
                    onSelectEvent={handleClickOpen}
                    onSelectSlot={handleClickOpen}
                />
            </Grid>
            <Grid xs={12} sm={12} md={12}>
                <Dialog xs={12} sm={12} md={12} open={open} onClose={handleClose} >
                    <DialogContent  style={{width: 500}}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Typography style={{color:"BLACK",fontSize:"1.5em"}}>   
                                Add Event
                            </Typography>
                        </Grid>
                        <TextField
                            label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>หัวข้อ</div>}
                            style={{marginTop:20}}
                            fullWidth
                            inputProps={{style: {fontSize: "1.2em"}}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            name="title"
                            value={addEvent.title}
                            onChange={handleChange}
                        />
                        <TextField
                            label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>รายละเอียด</div>}
                            style={{marginTop:20}}
                            fullWidth
                            inputProps={{style: {fontSize: "1.2em"}}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            name="detail"
                            value={addEvent.detail}
                            onChange={handleChange}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                fullWidth
                                label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK"}}>ลาตั้งแต่วันที่</div>}
                                style={{marginTop:20}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={addEvent.start}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                fullWidth
                                label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK"}}>ถึงวันที่</div>}
                                style={{marginTop:20}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={addEvent.end}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            ยกเลิก
                        </Button>
                        <Button onClick={handleSubmit} variant="contained"  color="primary"  >
                            บันทึก
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    )
}

export default CalendarPage;
