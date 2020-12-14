import React, { useState, useEffect } from 'react';
import { API } from '../url';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginfail, setLoginfail] = useState(false);

    useEffect(() => {
        try {
            if(localStorage.getItem('token-jwt') !== null){
                console.log("a1265")
                const jwt = JSON.parse(localStorage.getItem('token-jwt'));
                console.log("asdasd")
                if(jwt){
                    const decodetoken = decode(jwt, { header: true })
                    props.addUserAtStore(decodetoken);
                    if(decodetoken.type === "ADMIN"){
                        props.history.push('/บันทึกเวลา');
                    }
                    else if(decodetoken.position_eng === "MANAGER"){
                        props.history.push('/หน้าหลัก');
                    }
                    else {
                        props.history.push('/หน้าหลัก');
                    }
                }
            }
        } catch(error) {
            
        }
        
    },[] )


    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name == "username"){ setUsername(value) }
        else{ setPassword(value) }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const datalogin = {
            id: username,
            password: password
        }
        API.post('api/login',datalogin)
                .then((res) => {
                    if(res.data.success){
                        localStorage.setItem("token-jwt", JSON.stringify(res.data.token));
                        const token = res.data.token;
                        const decodetoken = decode(token)
                        props.addUserAtStore(decodetoken);
                        if(decodetoken.type === "ADMIN"){
                            props.history.push('/บันทึกเวลา');
                        }
                        else if(decodetoken.position_eng === "MANAGER"){
                            props.history.push('/หน้าหลัก');
                        }
                        else {
                            props.history.push('/หน้าหลัก');
                        }
                        // console.log(res.data.token)
                    }
                    else{
                        setLoginfail(true)
                    }
                }).catch((error) => {
                    setLoginfail(true)
                });
    }

    const forgotpassword = () => {
        props.history.push('/forgotpassword');
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={12} md={4} lg={2}style={{backgroundColor:"WHITE",padding:50,marginTop:"15%",borderRadius:10,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Typography style={{fontSize:"2.0em",textAlign:"center"}}>
                    ลงชื่อเข้าใช้
                </Typography>
                <TextField
                    fullWidth
                    label={<div style={{fontSize:"1.5em",marginTop:-6}}>ชื่อผู้ใช้</div>}
                    name="username"
                    style={{marginTop:10}}
                    inputProps={{style: {fontSize: "1.2em"}}}
                    onChange={handleChange}
                />
                <TextField 
                    fullWidth
                    label={<div style={{fontSize:"1.5em",marginTop:-6}}>รหัสผ่าน</div>}
                    type="password"
                    name="password"
                    style={{marginTop:10}}
                    inputProps={{style: {fontSize: "1.2em"}}}
                    onChange={handleChange}
                />
                { loginfail ? 
                    (
                    <Typography style={{fontSize:"calc(12px + 0.4vw)",color:"RED",marginTop:"15px"}}>
                        ชื่อผู้ใช้หรือรหัสผ่านผิด
                    </Typography>
                    ) : null
                }
                <Button 
                    variant="contained" 
                    color="primary"  
                    style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:20,width:"100%"}} 
                    onClick={handleSubmit}
                >
                    ลงชื่อเข้าใช้
                </Button>
                {/* <Button 
                    color="primary"  
                    style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:10,width:"100%"}} 
                    onClick={forgotpassword}
                >
                    ลืมรหัสผ่าน
                </Button> */}
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addUserAtStore : (newUserData) => {
            return dispatch({type: 'ADD_USER', playload: newUserData})
        } 
    }
}

const mapStateToProps = state => {
    return {
        userFromStore : state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
