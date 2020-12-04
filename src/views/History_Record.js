import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from "material-table";
import { API } from '../url';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

function History_Record(props){
    const [datatable, setDatatable] = useState([
        {
           date: "",
           time_in: "",
           time_out: "",
           time_sum: ""
        }
   ])
    
    useEffect(() => {
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        const decodetoken = decode(jwt)
        API.get(`api/record/getAll/${decodetoken.sub}`,{
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
            .then((res) => {
                setDatatable(res.data.data)
            }).catch((error) => {

            });
    },[] )

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
                            { title: "วันที่", field: "date",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                            { title: "เวลาเข้างาน", field: "time_in",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                            { title: "เวลาออกงาน", field: "time_out",headerStyle: {fontWeight:"bold",fontSize:"1.2em"}},
                            { title: "รวมเวลางาน(ชม.)", field: "time_sum",cellStyle: {textAlign: "center"},headerStyle: {textAlign: 'center',fontWeight:"bold",fontSize:"1.2em"}},
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

const mapStateToProps = state => {
    return {
        userFromStore : state.user
    }
}
export default connect(mapStateToProps, null)(History_Record);