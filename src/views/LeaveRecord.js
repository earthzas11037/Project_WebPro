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
            dateleave:  "15/12/63",
            dateleave_to: "16/12/63",
            sumdate: 1,
            type: "ลาป่วย",
            detail: "นัดพบแพทย์"
        },
        {
            dateleave:  "15/11/63",
            dateleave_to: "16/11/63",
            sumdate: 1,
            type: "ลาป่วย",
            detail: "นัดพบแพทย์"
        },
        {
            dateleave:  "15/10/63",
            dateleave_to: "16/10/63",
            sumdate: 1,
            type: "ลาป่วย",
            detail: "นัดพบแพทย์"
        }
     ])
    const [approval, setApproval] = useState([
        {
            dateleave:  "15/12/63",
            dateleave_to: "16/12/63",
            sumdate: 1,
            type: "ลาป่วย",
            detail: "นัดพบแพทย์",
            approvalBy: "นายโกงกิน  มาสายตลอด",
            position: "หัวหน้า",
            department: "บัญชี"
        },
        {
            dateleave:  "15/11/63",
            dateleave_to: "16/11/63",
            sumdate: 1,
            type: "ลาป่วย",
            detail: "นัดพบแพทย์",
            approvalBy: "นายโกงกิน  มาสายตลอด",
            position: "หัวหน้า",
            department: "บัญชี"
        },
        {
            dateleave:  "15/10/63",
            dateleave_to: "16/10/63",
            sumdate: 1,
            type: "ลาป่วย",
            detail: "นัดพบแพทย์",
            approvalBy: "นายโกงกิน  มาสายตลอด",
            position: "หัวหน้า",
            department: "บัญชี"
        }
    ])
    
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
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
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
                                        ลาตั้งแต่วันที่  {row.dateleave} &emsp; ถึงวันที่ {row.dateleave_to} &emsp; รวม {row.sumdate} วัน
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        ประเภท : {row.type}
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
                                        ลาตั้งแต่วันที่  {row.dateleave} &emsp; ถึงวันที่ {row.dateleave_to} &emsp; รวม {row.sumdate} วัน
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        ประเภท : {row.type}
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        รายละเอียด : {row.detail}
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        อนุมัติโดย : {row.approvalBy}
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        ตำแหน่ง : {row.position} &emsp; แผนก : {row.department} 
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
