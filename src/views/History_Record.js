import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from "material-table";

function History_Record(props){
    const [datatable, setDatatable] = useState([
        {
           date: "13/12/63",
           time_in: "13:45:32",
           time_out: "20:45:32",
           sumtime: "7 ชม."
        },
        {
           date: "14/12/63",
           time_in: "13:45:32",
           time_out: "20:45:32",
           sumtime: "7 ชม."
        },
        {
           date: "15/12/63",
           time_in: "13:45:32",
           time_out: "20:45:32",
           sumtime: "7 ชม."
        },
       {
           date: "16/12/63",
           time_in: "13:45:32",
           time_out: "20:45:32",
           sumtime: "7 ชม."
        },
        {
           date: "17/12/63",
           time_in: "13:45:32",
           time_out: "20:45:32",
           sumtime: "7 ชม."
       },
       {
           date: "18/12/63",
           time_in: "13:45:32",
           time_out: "20:45:32",
           sumtime: "7 ชม."
           },
        {
           date: "19/12/63",
           time_in: "13:45:32",
           time_out: "20:45:32",
           sumtime: "7 ชม."
       }
   ])
    
    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={8} md={6} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <MaterialTable
                        title=""
                        columns={[
                            { title: "วัน/เดือน/ปี", field: "date",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
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

export default History_Record;