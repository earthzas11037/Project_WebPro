import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from "material-table";
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers";

function Report_Record(props){
    const [datatable, setDatatable] = useState([     {
        userId: "123456",
        fullname: "นายขยัน  ตรงเวลา",
        position: "AR",
        department: "บัญชี",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม."
     },
     {
        userId: "153513",
        fullname: "นายทนา  วันวันดี",
        position: "AR",
        department: "บัญชี",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม."
     },
     {
        userId: "786425",
        fullname: "นายธงชัย  รักชาติ",
        position: "AR",
        department: "บัญชี",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม."
     },
    {
        userId: "984623",
        fullname: "นายทักทาย  สวัสดีจ้า",
        position: "AR",
        department: "บัญชี",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม."
     },
     {
        userId: "744152",
        fullname: "นายยักษา  มามาเร็ว",
        position: "AR",
        department: "บัญชี",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม."
    },
    {
        userId: "744152",
        fullname: "นายยักษา  มามาเร็ว",
        position: "AR",
        department: "บัญชี",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม."
        },
     {
        userId: "356124",
        fullname: "นายนงนม  ไปวันทา",
        position: "AR",
        department: "บัญชี",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม."
    }
    ]);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const searchUpdate = (event) => {
        event.preventDefault();
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={10} md={8} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                fullWidth
                                label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK"}}>วันที่</div>}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={startDate}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                fullWidth
                                label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK"}}>ถึงวันที่</div>}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={endDate}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={2}>
                        <Button onClick={searchUpdate} variant="contained" color="primary" style={{fontSize:"1.5em"}}>
                            ค้นหา
                        </Button>
                    </Grid>
                </Grid>
                <MaterialTable
                    title=""
                    columns={[
                        { title: "รหัสพนักงาน", field: "userId",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ชื่อ-สกุล", field: "fullname",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ตำแหน่ง", field: "position",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "แผนก", field: "department",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "เวลาเข้างาน", field: "time_in",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "เวลาออกงาน", field: "time_out",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "รวมเวลางาน", field: "sumtime",cellStyle: {textAlign: "center"},headerStyle: {textAlign: 'center',fontWeight:"bold",fontSize:"1.2em"}},
                        // { title: "จำนวนรายการ", field: "category_sum",cellStyle: {textAlign: "center"},headerStyle: {textAlign: 'center'}}, 
                    ]}
                    data={datatable}
                    options={{
                        exportButton: true,
                        headerStyle:{whiteSpace:"nowrap"},
                        exportAllData:true,
                    }}
                    style={{marginTop:20,
                        boxShadow: "10px 10px 5px 0px rgba(0,0,0,0)",
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default Report_Record;