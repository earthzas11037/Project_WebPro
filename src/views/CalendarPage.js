import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Calendar, momentLocalizer , Views } from 'react-big-calendar' 
import moment from 'moment'
// import CalendarBasic from '../components/CalendarBasic'
import events from '../events'
import "react-big-calendar/lib/css/react-big-calendar.css";

import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {MuiPickersUtilsProvider, KeyboardTimePicker, DateTimePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { API } from '../url';
import decode from 'jwt-decode';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const localizer = momentLocalizer(moment)

function CalendarPage(props){
    const [editOrcreate, setEditOrCreate] = useState("");
    const [dataEvents, setDataEvents] = useState([])
    const [open, setOpen] = React.useState(false);
    const [addEvent, setAddEvent] = useState({
        seq: null,
        title: "",
        detail: "",
        start: new Date(),
        end: new Date(),
        calendar_type: ""
    })
    const [sendStatus_true, setSendStatus_true] = useState(false);
    const [sendStatus_error, setSendStatus_error] = useState(false);
    const [textAlert, setTextAlert] = useState("");

    useEffect(() => {
        callApi();
    }, [])

    const callApi = () => {
        const jwt = JSON.parse(localStorage.getItem('token-jwt'));
        const decodetoken = decode(jwt);
        API.get(`api/calendar/getById/${decodetoken.sub}`,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                var data = res.data.data;
                for(var i=0; i< data.length; i++){
                    data[i] = {
                        ...data[i],
                        start : new Date(data[i].start),
                        end : new Date(data[i].end)
                    }
                }
                setDataEvents(data);
            }).catch((error) => {
                
            });
    }

    const handleClickOpen = ({ seq, title, detail, start, end,calendar_type })=> {
        setEditOrCreate("update");
        setAddEvent({seq: seq, title: title, detail: detail, start: start, end: end, calendar_type: calendar_type})
        setOpen(true);
    };

    const handleClickNewOpen = ()=> {
        setEditOrCreate("insert");
        setAddEvent({
            seq: null,
            title: "",
            detail: "",
            start: new Date(),
            end: new Date(),
            calendar_type: ""
        })
        setOpen(true);
    };

    const handleClose = () => {
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

    const handleRemove = (event) => {
        event.preventDefault();
        // console.log(addEvent.seq)
        const jwt = JSON.parse(localStorage.getItem('token-jwt'));
        API.get(`api/calendar/remove/${addEvent.seq}`,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                setTrueAlert("ลบข้อมูลสำเร็จ!");
                callApi();
            }).catch((error) => {
                setErrorAlert("ลบข้อมูลไม่สำเร็จ");
            });
        setOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const jwt = JSON.parse(localStorage.getItem('token-jwt'));
        const decodetoken = decode(jwt);
        var dataInsert = {
            ...addEvent,
            user_id: decodetoken.sub,
            start: convert(addEvent.start),
            end: convert(addEvent.end),
            calendar_type : "USER"
        }
        // console.log(dataInsert)
        API.post(`api/calendar/${editOrcreate}`, dataInsert, {
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                setTrueAlert("บันทึกข้อมูลสำเร็จ!");
                callApi();
            }).catch((error) => {
                setErrorAlert("บันทึกข้อมูลไม่สำเร็จ");
            });
        setOpen(false);
    }

    function convert(str) {
        var date = new Date(str);
        // alert(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        var Hours = date.getHours();
        var Minutes = date.getUTCMinutes();
        var Seconds = date.getUTCSeconds();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (Seconds < 10) {
            Seconds = '0' + Seconds;
        }
        if (Hours < 10) {
            Hours = '0' + Hours;
        }
        if (Minutes < 10) {
            Minutes = '0' + Minutes;
        }

        date = yyyy + "-" + mm + "-" + dd +  " " +Hours + ":" + Minutes + ":" + Seconds;
        return date.toString();
    }

    const setTrueAlert = (text) =>{
        setSendStatus_true(true);
        setTextAlert(text);
        setTimeout(()=>{setSendStatus_true(false) }, 2000);
    }
    const setErrorAlert = (text) =>{
        setSendStatus_error(true);
        setTextAlert(text);
        setTimeout(()=>{setSendStatus_error(false) }, 2000);
    }
    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={10} md={9} lg={8}>
                { sendStatus_true ? (
                    <Snackbar open={sendStatus_true} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }} style={{top:200}}>
                        <Alert  
                            variant="filled" severity="success" style={{fontSize:"1.2em"}}
                        >
                            {textAlert}
                        </Alert>
                    </Snackbar>
                    ) : null
                    }
                { sendStatus_error ? (
                    <Snackbar open={sendStatus_error} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }} style={{top:200}}>
                        <Alert  
                            variant="filled" severity="error" style={{fontSize:"1.2em"}}
                        >
                            {textAlert}
                        </Alert>
                    </Snackbar>
                    ) : null
                }
            </Grid>
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
                    // onSelectSlot={handleClickOpen}
                />
            </Grid>
            <Grid xs={12} sm={12} md={12}>
                <Dialog xs={12} sm={12} md={12} open={open} onClose={handleClose} >
                    {
                        editOrcreate === "update" &&  addEvent.calendar_type === "USER" ? (
                            <DialogTitle>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="flex-start"
                                >
                                    <Button onClick={handleRemove} variant="contained"  color="secondary"  >
                                        ลบ
                                    </Button>
                                </Grid>
                            </DialogTitle>
                        ) : null
                    }
                    <DialogContent  >
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Typography style={{color:"BLACK",fontSize:"1.5em"}}>   
                                เพื่มอีเวนท์
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
                                label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK"}}>ตั้งแต่วันที่</div>}
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
                    {
                        addEvent.calendar_type === "ALL" ? (
                            <DialogActions>
                                <Button onClick={handleClose} variant="contained" color="primary">
                                    ปิด
                                </Button>
                            </DialogActions>
                        ) : (
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    ยกเลิก
                                </Button>
                                <Button onClick={handleSubmit} variant="contained"  color="primary"  >
                                    บันทึก
                                </Button>
                            </DialogActions>
                        )
                    }
                </Dialog>
            </Grid>
        </Grid>
    )
}

export default CalendarPage;
