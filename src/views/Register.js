import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';

function Register(props){
    const [open, setOpen] = useState(false);
    const [dataRegister, setDataRegister] = useState({
        fullname:"",
        tel: "",
        idcardnumber: "",
        type: "",
        position: "",
        department: "",
        salaryRate: null
    })
    const typeEmployee = ["พนักงานประจำ","พาร์ทไทม์"];

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
        console.log(dataRegister)
        setOpen(true);
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={6} md={4} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>ชื่อ-นามสกุล</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="fullname"
                        value={dataRegister.fullname}
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
                        name="idcardnumber"
                        value={dataRegister.idcardnumber}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>ประเภทพนักงาน</div>}
                        fullWidth
                        select
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="type"
                        value={dataRegister.type}
                        onChange={handleChange}
                    >
                        {typeEmployee.map((option) => (
                            <MenuItem value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>ตำแหน่ง</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="position"
                        value={dataRegister.position}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>แผนก</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="department"
                        value={dataRegister.department}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid  item xs={12} sm={12} md={12}>
                    <TextField
                        label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>อัตราเงินเดือน</div>}
                        fullWidth
                        margin="normal"
                        inputProps={{style: {fontSize: "1.2em"}}}
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        name="salaryRate"
                        value={dataRegister.salaryRate}
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
                            รหัสพนักงาน : 
                        </Typography>
                        <Typography style={{color:"BLACK",fontSize:"1.2em"}}>   
                            ชื่อ-สกุล : {dataRegister.fullname}
                        </Typography>
                        <Typography style={{color:"BLACK",fontSize:"1.2em"}}>   
                            ตำแหน่ง : {dataRegister.position}
                        </Typography>
                        <Typography style={{color:"BLACK",fontSize:"1.2em"}}>   
                            แผนก: {dataRegister.department}
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