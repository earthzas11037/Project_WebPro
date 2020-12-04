import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from "material-table";
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers";
import { API } from '../url';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

function Report_Record(props){
    const [datatable, setDatatable] = useState([     {
        date: "",
        name: "",
        position_th: "",
        time_in: "",
        time_out: "",
        time_sum: ""
     }
    ]);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    
    useEffect(() => {
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        // const decodetoken = decode(jwt)
        API.get(`api/record/All`,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                setDatatable(res.data.data)
            }).catch((error) => {

            });
    },[] )

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const searchUpdate = (event) => {
        event.preventDefault();
        console.log(startDate)
        console.log(endDate)
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        API.get(`api/record/AllByDate/${convert(startDate)}/${convert(endDate)}`,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                setDatatable(res.data.data)
            }).catch((error) => {

            });
    }

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [ date.getFullYear(), mnth, day].join("-");
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
                        { title: "วันที่", field: "date",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ชื่อ-สกุล", field: "name",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ตำแหน่ง", field: "position_th",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "เวลาเข้างาน", field: "time_in",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "เวลาออกงาน", field: "time_out",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "รวมเวลางาน", field: "time_sum",cellStyle: {textAlign: "center"},headerStyle: {textAlign: 'center',fontWeight:"bold",fontSize:"1.2em"}},
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