import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import decode from 'jwt-decode';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
// icon
import DateRangeIcon from '@material-ui/icons/DateRange'; //วันที่//
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'; //เวลา//
import RestoreIcon from '@material-ui/icons/Restore'; //ดูประวัติการลงเวลาเข้า - ออก//
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'; //ดูรายงานการลงเวลาเข้า - ออก//
import EventIcon from '@material-ui/icons/Event'; //จัดปฏิทินการทำงาน//
import GroupAddIcon from '@material-ui/icons/GroupAdd'; //ลงทะเบียนพนักงาน//
import EventAvailableIcon from '@material-ui/icons/EventAvailable'; //อนุมัติการลา//
import AvTimerIcon from '@material-ui/icons/AvTimer'; //ปรับปรุงเวลา//
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'; //เงินเดือน//
import PortraitIcon from '@material-ui/icons/Portrait'; //จัดการข้อมูลพนักงาน//
import PostAddIcon from '@material-ui/icons/PostAdd'; //เพิ่มบันทึกการลา//

import AddIcon from '@material-ui/icons/Add'; //บันทึกเข้า - ออก//
import DehazeIcon from '@material-ui/icons/Dehaze'; //ข้อมูลเชิร์ฟเวอร์//
import InfoIcon from '@material-ui/icons/Info'; //เพิ่มเติม//
import SettingsIcon from '@material-ui/icons/Settings'; //การจัดการ//
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'; //ตั้งค่า//

import Clock_date from "../hooks/Clock_date"
import Clock_time from "../hooks/Clock_time"

function Home_user(props){
    const [position_eng, setPosition_Eng] = useState("");

    useEffect(() => {
        // console.log(props.userFromStore);
        if(props.userFromStore.position_eng === null){
            const jwt = JSON.parse(localStorage.getItem('token-jwt'));
            const decodetoken = decode(jwt)
            setPosition_Eng(decodetoken.position_eng);
        }
        else{
            setPosition_Eng(props.userFromStore.position_eng);
        }

    },[] )

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={8} md={6} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <DehazeIcon style={{color:"RED",fontSize:"1.3em",marginTop:8, marginRight:5}}/>
                    <Typography style={{color:"RED",fontSize:"1.5em"}}>
                        ข้อมูลเซิฟเวอร์
                    </Typography>
                </Grid>
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
                            <Grid container direction="row">
                                <DateRangeIcon style={{marginTop: 30, marginRight:20}}/>
                                <Clock_date ></Clock_date>
                            </Grid>
                            <Grid container direction="row">
                                <QueryBuilderIcon style={{marginRight:20}}/>
                                <Clock_time ></Clock_time>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <AddIcon style={{color:"RED",fontSize:"1.3em",marginTop:25, marginRight:5}}/>
                    <Typography style={{color:"RED",fontSize:"1.3em",marginTop:20}}>
                        บันทึก เข้า-ออก
                    </Typography>
                </Grid>
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
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <InfoIcon style={{color:"RED",fontSize:"1.3em",marginTop:35, marginRight:5}}/>
                    <Typography style={{color:"RED",fontSize:"1.3em",marginTop:30}}>
                        เพื่มเติม
                    </Typography>
                </Grid>
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
                            <NavLink to="/ประวัติการลงเวลา" style={{ textDecoration: 'none' }}>
                                <ListItem button style={{borderRadius:10}} >
                                    <RestoreIcon style={{color:"BLACK", marginRight:20}}/>
                                    <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                        ดูประวัติการลงเวลาเข้า - ออก
                                    </Typography>
                                </ListItem>
                            </NavLink>
                            {
                                position_eng !== "MANAGER" ? (
                                    <div>
                                        <NavLink to="/ปฏิทินการทำงาน" style={{ textDecoration: 'none' }}>
                                            <ListItem button style={{borderRadius:10}} >
                                                <EventIcon style={{color:"BLACK", marginRight:20}}/>
                                                <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                                    ปฏิทินการทำงาน
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                        <NavLink to="/เพื่มบันทึกการลา" style={{ textDecoration: 'none' }}>
                                            <ListItem button style={{borderRadius:10}} >
                                                <PostAddIcon style={{color:"BLACK", marginRight:20}}/>
                                                <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                                    เพิ่มบันทึกการลา
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                    </div>
                                ): null
                            }
                        </Grid>
                    </Grid>
                </Grid>
                {
                    position_eng === "MANAGER" ? (
                        <div>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <SettingsIcon style={{color:"RED",fontSize:"1.3em",marginTop:35, marginRight:5}}/>
                                <Typography style={{color:"RED",fontSize:"1.3em",marginTop:30}}>
                                    การจัดการ
                                </Typography>
                            </Grid>
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
                                        <NavLink to="/รายงานการลงเวลา" style={{ textDecoration: 'none' }}>
                                            <ListItem button style={{borderRadius:10}} >
                                                <LibraryBooksIcon style={{color:"BLACK", marginRight:20}}/>
                                                <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                                    ดูรายงานการลงเวลาเข้า - ออก
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                        <NavLink to="/จัดปฏิทินการทำงาน" style={{ textDecoration: 'none' }}>
                                            <ListItem button style={{borderRadius:10}} >
                                                <EventIcon style={{color:"BLACK", marginRight:20}}/>
                                                <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                                    จัดปฏิทินการทำงาน
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                        <NavLink to="/ลงทะเบียนพนักงาน" style={{ textDecoration: 'none' }}>
                                            <ListItem button style={{borderRadius:10}} >
                                                <GroupAddIcon style={{color:"BLACK", marginRight:20}}/>
                                                <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                                    ลงทะเบียนพนักงาน
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                        <NavLink to="/อนุมัติการลา" style={{ textDecoration: 'none' }}>
                                            <ListItem button style={{borderRadius:10}} >
                                                <EventAvailableIcon style={{color:"BLACK", marginRight:20}}/>
                                                <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                                    อนุมัติการลา
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                        <NavLink to="/ปรับปรุงเวลา" style={{ textDecoration: 'none' }}>
                                            <ListItem button style={{borderRadius:10}} >
                                                <AvTimerIcon style={{color:"BLACK", marginRight:20}}/> 
                                                <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                                    ปรับปรุงเวลา
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                        <NavLink to="/ดูเงินเดือนพนักงาน" style={{ textDecoration: 'none' }}>
                                            <ListItem button style={{borderRadius:10}} >
                                                <MonetizationOnIcon style={{color:"BLACK", marginRight:20}}/>
                                                <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                                    ดูเงินเดือนพนักงาน
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                        <NavLink to="/จัดการข้อมูลพนักงาน" style={{ textDecoration: 'none' }}>
                                            <ListItem button style={{borderRadius:10}} >
                                                <PortraitIcon style={{color:"BLACK", marginRight:20}}/>
                                                <Typography style={{color:"BLACK",fontSize:"1.5em"}}>
                                                    จัดการข้อมูลพนักงาน
                                                </Typography>
                                            </ListItem>
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    ) : null
                }
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        userFromStore : state.user
    }
}
export default connect(mapStateToProps, null)(Home_user);

