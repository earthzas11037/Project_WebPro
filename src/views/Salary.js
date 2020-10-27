import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from "material-table";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

function Salary(props){
    const [datatable, setDatatable] = useState([     {
        userId: "123456",
        fullname: "นายขยัน  ตรงเวลา",
        type: "พนักงานประจำ",
        sumDay: 20,
        sumHour: 160,
        sumOT: 0,
        salaryRate: 20000,
        salary: 20000
     },
     {
        userId: "123457",
        fullname: "นายขยัน  ตรงเวลา",
        type: "พาร์ทไทม์",
        sumDay: 25,
        sumHour: 200,
        sumOT: 0,
        salaryRate: 42,
        salary: 8400
     },
     {
        userId: "123458",
        fullname: "นายขยัน  ตรงเวลา",
        type: "พนักงานประจำ",
        sumDay: 20,
        sumHour: 160,
        sumOT: 2,
        salaryRate: 15000,
        salary: 15168
     },
     {
        userId: "123459",
        fullname: "นายขยัน  ตรงเวลา",
        type: "พาร์ทไทม์",
        sumDay: 22,
        sumHour: 180,
        sumOT: 4,
        salaryRate: 42,
        salary: 7728
     }
    ]);
    const [selectMonth, setSelectMonth] = useState("")
    const monthTH = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฏาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

    const handleChange = (event) =>{
        const { name, value } = event.target;
        setSelectMonth(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectMonth)
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
                    <Grid xs={12} sm={5} md={3}>
                        <TextField
                            label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>เดือน</div>}
                            select
                            fullWidth
                            inputProps={{style: {fontSize: "1.2em"}}}
                            style={{marginTop:15}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            name="selectMonth"
                            value={selectMonth}
                            onChange={handleChange}
                        >
                            {monthTH.map((option) => (
                                <MenuItem value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <Button onClick={handleSubmit} variant="contained" color="primary" style={{fontSize:"1.2em"}}>
                            คำนวณเงินเดือน
                        </Button>
                    </Grid>
                </Grid>
                <MaterialTable
                    title=""
                    columns={[
                        { title: "รหัสพนักงาน", field: "userId",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ชื่อ-สกุล", field: "fullname",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ประเภทพนังงาน", field: "type",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "วัน", field: "sumDay",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "ชั่วโมง", field: "sumHour",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "OT.", field: "sumOT",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "อัตราเงินเดือน", field: "salaryRate",cellStyle: {textAlign: "center"},headerStyle: {textAlign: 'center',fontWeight:"bold",fontSize:"1.2em"}},
                        { title: "เงินเดือนที่ได้", field: "salary",cellStyle: {textAlign: "center"},headerStyle: {textAlign: 'center',fontWeight:"bold",fontSize:"1.2em"}},
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

export default Salary;