import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from "@material-ui/pickers";
import { API } from '../url';
import decode from 'jwt-decode';
import { CallToActionSharp } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function LeaveRecord(props){
    const classes = useStyles();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectType, setSelectType] = useState("");
    const [detail, setDetail] = useState("");
    const [type, setType] = useState(["ลาป่วย","ลากิจ"]);

    const [waitapproval, setWaitapproval] = useState([
        {
            seq : null,
            date_start:  "",
            date_end: "",
            leave_type: "",
            detail: ""
        }
     ])
    const [approval, setApproval] = useState([
        {
            seq : null,
            date_start:  "",
            date_end: "",
            leave_type: "",
            detail: ""
        }
    ])
    const [disapproval, setDisApproval] = useState([
        {
            seq : null,
            date_start:  "",
            date_end: "",
            leave_type: "",
            detail: ""
        }
    ])
    const [sendStatus_true, setSendStatus_true] = useState(false);
    const [sendStatus_error, setSendStatus_error] = useState(false);
    const [textAlert, setTextAlert] = useState("");

    useEffect(() => {
        callApi();
    },[] )

    const callApi = () => {
        const jwt = JSON.parse(localStorage.getItem('token-jwt'));
        const decodetoken = decode(jwt);
        API.get(`api/leaveRecord/AllById/${decodetoken.sub}`,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                setWaitapproval(res.data.datawait);
                setApproval(res.data.dataapprove);
                setDisApproval(res.data.datadisapprove);
            }).catch((error) => {
                
            });
    }

    const calculateDate = (date_start, date_end) =>{
        var date1 = new Date(date_start); 
        var date2 = new Date(date_end); 
          
        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
          
        // To calculate the no. of days between two dates 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        
        return Difference_In_Days+1;
    }

    const handleChange = (event) =>{
        const { name, value } = event.target;
        if(name === "selectType"){
            setSelectType(value)
        }
        else if(name === "detail"){
            setDetail(value)
        }
    }

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        const jwt = JSON.parse(localStorage.getItem('token-jwt'));
        const decodetoken = decode(jwt);
        var datainsert = {
            user_id : decodetoken.sub,
            date_start : convert(startDate),
            date_end : convert(endDate),
            leave_type : selectType,
            detail : detail
        }
        // console.log(datainsert);
        if(startDate !== null && endDate !== null && selectType !== "" && detail !== ""){
            API.post(`api/leaveRecord/insert`, datainsert, {
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              })
                .then((res) => {
                    setTrueAlert("บักทึกการลาสำเร็จ! (รอการอนุมัติ)");
                    setStartDate(new Date());
                    setEndDate(new Date());
                    setDetail("");
                    setSelectType("");
                    callApi();
                }).catch((error) => {
                    setErrorAlert("บันทึกการลาไม่สำเร็จ!");
                });
        }
        else{
            setErrorAlert("กรุณากรอกข้อมูลให้ครบ!");
        }
        
    }

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [ date.getFullYear(), mnth, day].join("-");
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
                <Typography style={{color:"RED",fontSize:"1.3em"}}>
                    เพื่มบันทึกการลา
                </Typography>
                <Grid xs={12} sm={8} md={6} style={{marginTop:20}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            fullWidth
                            label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK"}}>ลาตั้งแต่วันที่</div>}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={startDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date"
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid xs={12} sm={8} md={6} style={{marginTop:20}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            fullWidth
                            label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK"}}>ถึงวันที่</div>}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={endDate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date"
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid xs={12} sm={8} md={6} style={{marginTop:20}}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>ประเภท</div>}
                        select
                        fullWidth
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="selectType"
                        value={selectType}
                        onChange={handleChange}
                    >
                        {type.map((option) => (
                            <MenuItem value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid xs={12} sm={12} md={12} style={{marginTop:20}}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>รายละเอียด</div>}
                        fullWidth
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        multiline
                        rows={10}
                        variant="outlined"
                        name="detail"
                        value={detail}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid 
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                    spacing={3}
                >
                    <Grid  item xs={12} sm={12} md={3}>
                        <Button 
                            variant="contained" 
                            color="primary"  
                            style={{ marginTop:20, fontSize:"1.3em",paddingLeft:"5%", paddingRight:'5%', borderRadius:8,width:"100%"}} 
                            onClick={handleSubmit}
                        >
                            ยืนยัน
                        </Button>
                    </Grid>
                </Grid>
                
                <Typography style={{color:"RED",fontSize:"1.3em",marginTop:50}}>
                    รายการรออนุมัติ
                </Typography>
                {
                    waitapproval.map((row, index) => (
                        <Grid xs={12} sm={12} md={12} style={{marginTop:20}}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography style={{fontSize:"1em"}}>
                                        ลาตั้งแต่วันที่  {row.date_start} &emsp; ถึงวันที่ {row.date_end} &emsp; รวม {calculateDate(row.date_start,row.date_end)} วัน
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        ประเภท : {row.leave_type}
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        รายละเอียด : {row.detail}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
                <Typography style={{color:"RED",fontSize:"1.3em",marginTop:50}}>
                    รายการอนุมัติแล้ว
                </Typography>
                {
                    approval.map((row, index) => (
                        <Grid xs={12} sm={12} md={12} style={{marginTop:20}}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography style={{fontSize:"1em"}}>
                                        ลาตั้งแต่วันที่  {row.date_start} &emsp; ถึงวันที่ {row.date_end} &emsp; รวม {calculateDate(row.date_start,row.date_end)} วัน
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        ประเภท : {row.leave_type}
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        รายละเอียด : {row.detail}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
                <Typography style={{color:"RED",fontSize:"1.3em",marginTop:50}}>
                    รายการไม่อนุมัติ
                </Typography>
                {
                    disapproval.map((row, index) => (
                        <Grid xs={12} sm={12} md={12} style={{marginTop:20}}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography style={{fontSize:"1em"}}>
                                        ลาตั้งแต่วันที่  {row.date_start} &emsp; ถึงวันที่ {row.date_end} &emsp; รวม {calculateDate(row.date_start,row.date_end)} วัน
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        ประเภท : {row.leave_type}
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        รายละเอียด : {row.detail}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>
    )
}

export default LeaveRecord;
