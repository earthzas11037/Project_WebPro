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
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path="/user/หน้าหลัก" component={HomePage} />
                    <Route path="/user/ประวัติการลงเวลา" component={History_Record} />
                    <Route path="/user/ปฏิทินการทำงาน" component={CalendarPage} />
                    <Route path="/user/เพื่มบันทึกการลา" component={LeaveRecord} />
                    <Redirect from="/" to="/user/หน้าหลัก" />
                </Switch>
            </main>
        </div>
    )
}

export default User;
