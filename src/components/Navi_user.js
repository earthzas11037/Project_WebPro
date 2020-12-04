import React, { useState, useEffect } from 'react';
import { url_base } from '../url';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
      
    appBar: {
        backgroundColor:"WHITE",
        color:"BLACK",
        height:180
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("lg")]: {
            display: "none"
        }
    },
}));

function Navi_user(props) {
    const classes = useStyles();
    const [pagename, setPagename] = useState("");
    const [currentUser, setCurrentUser] = useState({
        user_id: "",
        name: "",
        position_eng: "",
        position_th: "",
        type_name: ""
    });

    useEffect(() => {
        console.log(props.userFromStore)
        const jwt = JSON.parse(localStorage.getItem('token-jwt'));
        const decodetoken = decode(jwt)
        setCurrentUser({
            user_id: decodetoken.user_id,
            name: decodetoken.name,
            position_eng: decodetoken.position_eng,
            position_th: decodetoken.position_th,
            type_name: decodetoken.type_name
        })
        // setPagename(props.history.location.pathname.split('/')[1])
    }, []);

    const logout = (event) => {
        event.preventDefault();
        props.history.push('/login');
        localStorage.removeItem("token-jwt");
    }

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar style={{marginTop:15}}>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                        {/* {pagename} */}
                        หน้าหลัก
                    </Typography>
                    <Typography style={{color:" #14BF92",fontSize:"2em",fontWeight:"bold"}}>
                        CHECK TIME
                    </Typography>
                    <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                        {currentUser.name}
                    </Typography>
                    <Typography style={{color:"BLACK",fontSize:"1.2em"}}>
                        ตำแหน่ง : {currentUser.position_th} ({currentUser.position_eng})
                    </Typography>
                    <Button style={{fontSize:"1em",textAlign:"center",color:" #14BF92",position:"absolute",right:0}}
                        onClick={logout}
                    >
                        ลงชื่อออก
                    </Button>
                  </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userFromStore : state.user
    }
}
export default connect(mapStateToProps, null)(Navi_user);