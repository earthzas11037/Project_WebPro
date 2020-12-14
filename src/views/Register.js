import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { API } from '../url';

function Register(props){
    const [open, setOpen] = useState(false);
    const [dataRegister, setDataRegister] = useState({
        password: "",
        confirmpassword: "",
        name:"",
        tel: "",
        person_id: "",
        position_id: "",
        salary: 0
    })
    const [resultRegister, setResultRegister] = useState({
        id: '',
        name: '',
        tel: '',
    })
    const [position, setPosition] = useState([]);
    const [sendStatus_true, setSendStatus_true] = useState(false);
    const [sendStatus_error, setSendStatus_error] = useState(false);
    const [textAlert, setTextAlert] = useState("");

    useEffect(() => {
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        // const decodetoken = decode(jwt)
        API.get(`api/getdataforregister`,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                setPosition(res.data.data)
            }).catch((error) => {

            });
    },[] )

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event) =>{
        const { name, value } = event.target;
        setDataRegister({
            ...dataRegister,
            [name]: value
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(sendStatus_error)
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        if(dataRegister.password !== dataRegister.confirmpassword){
            setErrorAlert("ยืนยันรหัสผ่านไม่ถูกต้อง");
            return;
        }
        if(dataRegister.name !== "" && dataRegister.tel !== "" && dataRegister.person_id !== "" && dataRegister.salary >= 0){
            API.post(`api/register`,dataRegister, {
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              })
                .then((res) => {
                    setResultRegister({
                        id: res.data.message.id,
                        name: res.data.message.name,
                        tel: res.data.message.tel
                    });
                    setOpen(true);
                }).catch((error) => {
                    setErrorAlert("ลงทะเบียนผพนักงานไม่สำเร็จ");
                });
        }
        else{
            setErrorAlert("กรุณากรอกข้อมูลให้ครบ");
        }
        console.log(sendStatus_error)
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
            <Grid xs={12} sm={6} md={4} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>รหัสผ่าน</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="password"
                        type="password"
                        value={dataRegister.password}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>ยืนยันรหัสผ่าน</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="confirmpassword"
                        type="password"
                        value={dataRegister.confirmpassword}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>ชื่อ-นามสกุล</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="name"
                        value={dataRegister.name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>เบอร์โทร</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="tel"
                        value={dataRegister.tel}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>รหัสบัตรประชาชน</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="person_id"
                        value={dataRegister.person_id}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>ตำแหน่ง</div>}
                        fullWidth
                        select
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="position_id"
                        value={dataRegister.position_id}
                        onChange={handleChange}
                    >
                        {position.map((option) => (
                            <MenuItem value={option.position_id}>
                                {option.position_th}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>อัตราเงินเดือน</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="salary"
                        value={dataRegister.salary}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid 
                    xs={12}  
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <Button 
                        variant="contained" 
                        color="primary"  
                        style={{marginTop:"5%", fontSize:"1.5em",paddingLeft:"5%", paddingRight:'5%', borderRadius:8}} 
                        onClick={handleSubmit}
                    >
                        ยืนยัน
                    </Button>
                </Grid>
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
                            รหัสพนักงาน : {resultRegister.id}
                        </Typography>
                        <Typography style={{color:"BLACK",fontSize:"1.2em"}}>   
                            ชื่อ-สกุล : {resultRegister.name}
                        </Typography>
                        <Typography style={{color:"BLACK",fontSize:"1.2em"}}>   
                            เบอร์โทร : {resultRegister.tel}
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
    )
}

export default Register;