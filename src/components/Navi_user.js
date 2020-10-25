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

    useEffect(() => {

    }, []);

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
                        หน้าหลัก
                    </Typography>
                    <Typography style={{color:" #14BF92",fontSize:"2em",fontWeight:"bold"}}>
                        CHECK TIME
                    </Typography>
                    <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                        นายขยัน   มาตรงเวลา
                    </Typography>
                    <Typography style={{color:"BLACK",fontSize:"1.2em"}}>
                        ตำแหน่ง : Account Receivable (AR)   แผนก : บัญชี
                    </Typography>
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