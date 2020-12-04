import React, { useState, useEffect } from 'react';
import { API } from '../url';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import decode from 'jwt-decode';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import '../css/Record.css';

function Record(props){
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const jwt = JSON.parse(localStorage.getItem('token-jwt'));
        if(!jwt){
            props.history.push('/login');
        }
        API.get('api/checkTokenAdmin',{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                if(res.data.message){
                    const user = decode(jwt);
                    // setCurrentUser(user)
                    // props.addUserAtStore(user)
                }
                else{
                    localStorage.removeItem("token-jwt");
                    props.history.push('/login');
                }
            }).catch((error) => {
                localStorage.removeItem("token-jwt");
                props.history.push('/login');
            });
    },[] )

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setUserId(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            user_id : userId
        }
        API.post('api/record/byId', data , {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token-jwt'))}`
            }
          })
            .then((res) => {
                console.log(res.data)
                setMessage(res.data.message)
                setOpen(true);
                setTimeout(()=>{ setOpen(false)}, 3000);
            }).catch((error) => {
                console.log(error)
            });
    }

    const logout = (event) => {
        event.preventDefault();
        props.history.push('/login');
        localStorage.removeItem("token-jwt");
    }

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <Button style={{fontSize:"1em",textAlign:"center",color:"WHITE",position:"absolute",right:0}}
                onClick={logout}
            >
                ลงชื่อออก
            </Button>
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


                <Grid xs={12} sm={12} md={12}>
                    <Dialog xs={12} sm={12} md={12} open={open} onClose={handleClose} >
                        <DialogContent  style={{width: 500}}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                            >
                                <Typography style={{color:"#0EE106",fontSize:"1.5em"}}>   
                                    บันทึกข้อมูลสำเร็จ!
                                </Typography>
                            </Grid>
                            <Typography style={{color:"BLACK",fontSize:"1.2em"}}>   
                                {message} 
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                ปิด
                            </Button>
                        </DialogActions>
                    </Dialog>


                </Grid>
            </Grid>
        </div>
    )
}

export default Record;
