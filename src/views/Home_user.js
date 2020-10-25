import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';

import Clock_date from "../hooks/Clock_date"
import Clock_time from "../hooks/Clock_time"

function Home_user(props){

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={8} md={6} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Typography style={{color:"RED",fontSize:"1.5em"}}>
                    ข้อมูลเซิฟเวอร์
                </Typography>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={8} md={6}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Clock_date ></Clock_date>
                            <Clock_time ></Clock_time>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography style={{color:"RED",fontSize:"1.3em",marginTop:20}}>
                    บันทึก เข้า-ออก
                </Typography>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={8} md={6} style={{marginTop:20}}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item xs={12} sm={12} md={12}>
                                <Button 
                                    variant="contained" 
                                    style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:20,width:"100%",backgroundColor:" #14BF92",color:"WHITE"}} 
                                >
                                    บันทึกเวลาเข้า
                                </Button>
                                <Button 
                                    variant="contained" 
                                    style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:20,width:"100%",backgroundColor:" #14BF92",color:"WHITE"}} 
                                >
                                    บันทึกเวลาออก
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography style={{color:"RED",fontSize:"1.3em",marginTop:30}}>
                    เพื่มเติม
                </Typography>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={8} md={6} style={{marginTop:20}}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <NavLink to="/user/ประวัติการลงเวลา" style={{ textDecoration: 'none' }}>
                                <ListItem button style={{borderRadius:10}} >
                                    <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                        ดูประวัติการลงเวลาเข้า - ออก
                                    </Typography>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/user" style={{ textDecoration: 'none' }}>
                                <ListItem button style={{borderRadius:10}} >
                                    <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                        ปฏิทินการทำงาน
                                    </Typography>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/user/เพื่มบันทึกการลา" style={{ textDecoration: 'none' }}>
                                <ListItem button style={{borderRadius:10}} >
                                    <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                        เพิ่มบันทึกการลา
                                    </Typography>
                                </ListItem>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home_user;
