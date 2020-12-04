import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from "material-table";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { API } from '../url';

function Salary(props){
    const [datatable, setDatatable] = useState([     {
        user_id: "",
        name: "",
        position_th: "",
        working_days: null,
        working_hours: null,
        ot: null,
        salary: null,
        sum_salary: null
     }
    ]);
    const [selectMonth, setSelectMonth] = useState("")
    const [selectYear, setSelectYear] = useState("")
    const monthTH = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฏาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

    const handleChangeYear = (event) =>{
        const { name, value } = event.target;
        setSelectYear(value)
    }

    const handleChangeMonth = (event) =>{
        const { name, value } = event.target;
        setSelectMonth(value)
    }

    const handleCal = (event) => {
        event.preventDefault();
        console.log(selectYear)
        console.log(selectMonth)
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        API.get(`api/report/All/${selectYear}/${selectMonth+1}`,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                console.log(res.data)
                setDatatable(res.data.newdata)
            }).catch((error) => {

            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var newData = [];
        var datenow = convert();
        for(var i=0; i< datatable.length; i++){
            newData[i] = {   
                user_id: datatable[i].user_id,
                working_days: datatable[i].working_days,
                working_hours: datatable[i].working_hours,
                ot: datatable[i].ot,
                sum_salary: datatable[i].sum_salary,
                date: datenow
            }
        }
        var data = {
            date : datenow,
            data : newData
        }
        console.log(data)
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        API.post(`api/report/insert`,data, {
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {

            }).catch((error) => {

            });
    }

    function convert() {
        var date = new Date(),
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
            <Grid xs={12} sm={12} md={10} style={{ backgroundColor: "WHITE", padding: "30px 3% 30px 3%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Grid container spacing={4}>
                    <Grid xs={12} sm={3} md={2}>
                        <TextField
                            label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>ปี</div>}
                            fullWidth
                            inputProps={{style: {fontSize: "1.2em"}}}
                            style={{marginTop:15}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            name="selectYear"
                            value={selectYear}
                            onChange={handleChangeYear}
                        >
                        </TextField>
                    </Grid>
                    <Grid xs={12} sm={5} md={3}>
                        <TextField
                            label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>เดือน</div>}
                            select
                            fullWidth
                            inputProps={{style: {fontSize: "1.2em"}}}
                            style={{marginTop:15,marginLeft:10}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            name="selectMonth"
                            value={selectMonth}
                            onChange={handleChangeMonth}
                        >
                            {monthTH.map((option, index) => (
                                <MenuItem value={index}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <Button onClick={handleCal} variant="contained" color="primary" style={{fontSize:"1.5em"}}>
                            คำนวณเงินเดือน
                        </Button>
                    </Grid>
                </Grid>
                <MaterialTable
                    title=""
                    columns={[
                        { title: "รหัสพนักงาน", field: "user_id",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ชื่อ-สกุล", field: "name",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ประเภทพนักงาน", field: "position_th",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "วัน", field: "working_days",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ชั่วโมง", field: "working_hours",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "OT.", field: "ot",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "อัตราเงินเดือน", field: "salary",cellStyle: {textAlign: "center"},headerStyle: {textAlign: 'center',fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "เงินเดือนที่ได้", field: "sum_salary",cellStyle: {textAlign: "center"},headerStyle: {textAlign: 'center',fontWeight:"bold",fontSize:"1.2em"}},
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
                <Grid 
                    xs={12}  
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                >
                    <Button 
                        variant="contained" 
                        color="primary"  
                        style={{marginTop:"5%", fontSize:"1.5em",paddingLeft:"5%", paddingRight:'5%', borderRadius:8}} 
                        onClick={handleSubmit}
                    >
                        บันทึก
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Salary;