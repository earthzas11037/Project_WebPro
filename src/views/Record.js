import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../css/Record.css';

function Record(props){
    const [userId, setUserId] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setUserId(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
            className="Recodepage"
        >
            <Grid xs={12} sm={12} md={4} lg={2}style={{backgroundColor:" #14BF92",padding:50,marginTop:"15%"}}>
                <Typography style={{fontSize:"3em",textAlign:"center",color:"WHITE"}}>
                    CHECK TIME
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label={<div style={{fontSize:"1.2em",color:"#CECECE"}}>กรอกรหัสพนักงาน</div>}
                    name="userId"
                    size="small"
                    style={{marginTop:10}}
                    inputProps={{style: {fontSize: "1.2em",backgroundColor:"WHITE",borderRadius:5}}}
                    onChange={handleChange}
                />
                <Button 
                    variant="contained" 
                    color="primary"  
                    style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:20,width:"100%"}} 
                    onClick={handleSubmit}
                >
                    บันทึกเวลา
                </Button>
            </Grid>
        </Grid>
    )
}

export default Record;
