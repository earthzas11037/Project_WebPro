import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import decode from 'jwt-decode';
import routes from "../routes.js";

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
        fullname: null,
        username: null,
        faculty_id: null,
        type_name: null,
        tel: null,
        email: null,
        position: null,
        name_title: null
    });
    
    const type = "ADMIN";

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    useEffect(() => {
    }, [])

    return(
        <div>
            {/* <Sidebar_user
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
            /> */}
            <Navi_user
                handleDrawerToggle={handleDrawerToggle}
                history={props.history}
            />
            {
                type === "USER" ? (
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route path="/หน้าหลัก" component={HomePage} />
                            <Route path="/ประวัติการลงเวลา" component={History_Record} />
                            <Route path="/ปฏิทินการทำงาน" component={CalendarPage} />
                            <Route path="/เพื่มบันทึกการลา" component={LeaveRecord} />
                            <Redirect from="/" to="/หน้าหลัก" />
                        </Switch>
                    </main>
                ) : (
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route path="/หน้าหลัก" component={HomePage} />
                            <Route path="/ประวัติการลงเวลา" component={History_Record} />
                            <Route path="/รายงานการลงเวลา" component={Report_Record} />
                            <Route path="/จัดปฏิทินการทำงาน" component={ManageCalendar} />
                            <Route path="/ลงทะเบียนพนักงาน" component={Register} />
                            <Route path="/อนุมัติการลา" component={ApprovalLeave} />
                            <Route path="/ปรับปรุงเวลา" component={Update_Record} />
                            <Route path="/ดูเงินเดือนพนักงาน" component={Salary} />
                            <Route path="/จัดการข้อมูลพนักงาน" component={Manage_User} />
                            <Redirect from="/" to="/หน้าหลัก" />
                        </Switch>
                    </main>
                )
            }
        </div>
    )
}

export default User;
