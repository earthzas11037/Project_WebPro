import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import decode from 'jwt-decode';
import routes from "../routes.js";
import { API } from '../url';

import HomePage from '../views/Home_user'
import LeaveRecord from '../views/LeaveRecord'
import CalendarPage from '../views/CalendarPage'
import History_Record from '../views/History_Record'
import Navi_user from '../components/Navi_user'

import Report_Record from '../views/Report_Record'
import ManageCalendar from '../views/ManageCalendar'
import Register from '../views/Register'
import ApprovalLeave from '../views/ApprovalLeave'
import Update_Record from '../views/Update_Record'
import Salary from '../views/Salary'
import Manage_User from '../views/Manage_User'

import '../css/User.css'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbar: {
        height:180
    },
    content: {
        padding: 20,
    }
}));

function User(props){
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        user_id: null,
        name: null,
        position_eng: null,
        position_th: null,
        type_name: null
    });
    const [position_eng, setPosition_Eng] = useState("");

    // const type = "ADMIN";
    // const type = "USER";

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    useEffect(() => {
        const jwt = JSON.parse(localStorage.getItem('token-jwt'));
        if(!jwt){
            props.history.push('/login');
        }
        const decodetoken = decode(jwt)
        setPosition_Eng(decodetoken.position_eng)
        if(decodetoken.type === "ADMIN"){
            props.history.push('/บันทึกเวลา');
        }
        else if(decodetoken.position_eng === "MANAGER"){
            API.get('api/checkTokenManager',{
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              })
                .then((res) => {
                    const token = jwt;
                    const decodetoken = decode(token)
                    // console.log(decodetoken)
                    setCurrentUser({
                        user_id: decodetoken.sub,
                        name: decodetoken.name,
                        position_eng: decodetoken.position_eng,
                        position_th: decodetoken.position_th,
                        type_name: decodetoken.type
                    });
                    console.log("asd")
                    props.addUserAtStore(decodetoken);
                }).catch((error) => {
                    localStorage.removeItem("token-jwt");
                    props.history.push('/login');
                });
        }
        else {
            API.get('api/checkToken',{
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              })
                .then((res) => {
                    const token = jwt;
                    const decodetoken = decode(token)
                    setCurrentUser({
                        user_id: decodetoken.sub,
                        name: decodetoken.name,
                        position_eng: decodetoken.position_eng,
                        position_th: decodetoken.position_th,
                        type_name: decodetoken.type
                    });
                    console.log("asd")
                    props.addUserAtStore(decodetoken);
                }).catch((error) => {
                    localStorage.removeItem("token-jwt");
                    props.history.push('/login');
                });
        }
    },[] )

    return(
        <div>
            <Navi_user
                handleDrawerToggle={handleDrawerToggle}
                history={props.history}
            />
            {
                position_eng === "MANAGER" ? (
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route path="/หน้าหลัก" component={HomePage} position_eng={position_eng}/>
                            <Route path="/ประวัติการลงเวลา" component={History_Record} />
                            <Route path="/รายงานการลงเวลา" component={Report_Record} />
                            <Route path="/จัดปฏิทินการทำงาน" component={ManageCalendar} />
                            <Route path="/ลงทะเบียนพนักงาน" component={Register} />
                            <Route path="/อนุมัติการลา" component={ApprovalLeave} />
                            <Route path="/ปรับปรุงเวลา" component={Update_Record} />
                            <Route path="/ดูเงินเดือนพนักงาน" component={Salary} />
                            <Route path="/จัดการข้อมูลพนักงาน" component={Manage_User} />
                            {/* <Redirect from="/" to="/หน้าหลัก" /> */}
                        </Switch>
                    </main>
                ) : (
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route path="/หน้าหลัก" component={HomePage} position_eng={position_eng}/>
                            <Route path="/ประวัติการลงเวลา" component={History_Record} />
                            <Route path="/ปฏิทินการทำงาน" component={CalendarPage} />
                            <Route path="/เพื่มบันทึกการลา" component={LeaveRecord} />
                            {/* <Redirect from="/" to="/หน้าหลัก" /> */}
                        </Switch>
                    </main>
                )
            }
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(User);
