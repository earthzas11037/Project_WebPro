import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { API } from '../url';

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
  });


function ApprovalLeave(props){
    const classes = useStyles();
    const [waitapproval, setWaitapproval] = useState([
        {
            seq: "",
            user_id: "",
            name: "",
            date_start:  "",
            date_end: "",
            sumdate: 0,
            leave_type: "",
            detail: ""
        },

     ])

    useEffect(() => {
        callApi();
    },[] )

    const callApi = () =>{
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        // const decodetoken = decode(jwt)
        API.get(`api/leaveRecord/AllWaitForApproval`,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                setWaitapproval(res.data.data)
            }).catch((error) => {

            });
    }

    const approve = (seq) => (event) => {
        event.preventDefault();
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        var data = {
            seq: seq
        }
        API.post(`api/leaveRecord/approve`, data,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                callApi();
            }).catch((error) => {

            });
    }

    const disapprove = (seq) => (event) => {
        event.preventDefault();
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        var data = {
            seq: seq
        }
        API.post(`api/leaveRecord/disapprove`, data, {
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                callApi();
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

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={8} md={6} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Typography style={{color:"RED",fontSize:"1.5em"}}>
                    รายการรออนุมติ
                </Typography>
                {
                    waitapproval.map((row, index) => (
                        <Grid xs={12} sm={12} md={12} style={{marginTop:20}}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography style={{fontSize:"1em"}}>
                                        ชื่อ-สกุล &emsp; {row.name}
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        ลาตั้งแต่วันที่  {row.date_start} &emsp; ถึงวันที่ {row.date_end} &emsp; รวม {calculateDate(row.date_start, row.date_end)} วัน
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        ประเภท : {row.leave_type}
                                    </Typography>
                                    <Typography style={{fontSize:"1em"}}>
                                        รายละเอียด : {row.detail}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Grid xs={12}  container direction="row" justify="flex-end" alignItems="flex-start" style={{marginTop:-20}}>
                                        <Button 
                                            variant="outlined" 
                                            color="primary"  
                                            style={{fontSize:"1em",borderRadius:8,marginRight:10}} 
                                            onClick={disapprove(row.seq)}
                                        >
                                            ไม่อนุมัติ
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="primary"  
                                            style={{fontSize:"1em",borderRadius:8}} 
                                            onClick={approve(row.seq)}
                                        >
                                            อนุมัติ
                                        </Button>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>
    )
}

export default ApprovalLeave;