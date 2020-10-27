import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

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
            fullname: "นายนงนม  ไปวันทา",
            dateleave:  "15/12/63",
            dateleave_to: "16/12/63",
            sumdate: 1,
            type: "ลาป่วย",
            detail: "นัดพบแพทย์"
        },
        {
            fullname: "นายนงนม  ไปวันทา",
            dateleave:  "15/11/63",
            dateleave_to: "16/11/63",
            sumdate: 1,
            type: "ลาป่วย",
            detail: "นัดพบแพทย์"
        },
        {
            fullname: "นายนงนม  ไปวันทา",
            dateleave:  "15/10/63",
            dateleave_to: "16/10/63",
            sumdate: 1,
            type: "ลาป่วย",
            detail: "นัดพบแพทย์"
        }
     ])

    const handleSubmit = (event) => {
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
                <Typography style={{color:"RED",fontSize:"1.5em"}}>
                    รายการรออนุมติ
                </Typography>
                {
                    waitapproval.map((row, index) => (
                        <Grid xs={12} sm={12} md={12} style={{marginTop:20}}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography style={{fontSize:"1em"}}>
                                        ชื่อ-สกุล &emsp; {row.fullname}
                                    </Typography>
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
                                <CardActions>
                                    <Grid xs={12}  container direction="row" justify="flex-end" alignItems="flex-start" style={{marginTop:-20}}>
                                        <Button 
                                            variant="outlined" 
                                            color="primary"  
                                            style={{fontSize:"1em",borderRadius:8,marginRight:10}} 
                                            onClick={handleSubmit}
                                        >
                                            ไม่อนุมัติ
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="primary"  
                                            style={{fontSize:"1em",borderRadius:8}} 
                                            onClick={handleSubmit}
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