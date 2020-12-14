import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../function/TablePaginationActions';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { API } from '../url';
import { CallToActionSharp } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      fontSize: '200pt'
    },
});

function Manage_User(props){
    const classes = useStyles();
    const [tableData, setTableData] = useState([{
        id: "",
        name:"",
        tel: "",
        person_id: "",
        position_id: "",
        position_th: "",
        salary: 0
    }
    ])
    const [user_id, setUser_id] = useState(null);
    const [editIdx, setEditIdx] = useState(-1)
    const [oldData, setOldData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
    const [position, setPosition] = useState(['ผู้จัดการ','พนักงานประจำ', 'พนักงานพาร์ทไทม์']);
    const [sendStatus_true, setSendStatus_true] = useState(false);
    const [sendStatus_error, setSendStatus_error] = useState(false);
    const [textAlert, setTextAlert] = useState("");

    useEffect(() => {
        callApi();
    },[] )

    const callApi = () =>{
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        if(user_id !== null){
            searchUpdate();
        }
        else{
            API.get(`api/alluser`,{
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              })
                .then((res) => {
                    setTableData(res.data.data)
                }).catch((error) => {
    
                });
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser_id(value);
    }

    const handleChangeTable = (index) => (event) => {
        const { name, value } = event.target;
        let newData = [...tableData]
        newData[index] = {
            ...newData[index],
            [name] : value
        }
        setTableData(newData);
    }

    const handleChangePosition = (index) => (event) => {
        const { name, value } = event.target;
        let newData = [...tableData]
        var target = -1;
        for(var i=0; i< position.length; i++){
            if(position[i] === value){
                target = i+1;
            }
        }
        newData[index] = {
            ...newData[index],
            position_id : target,
            position_th : value
        }
        setTableData(newData);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const startEditing = (i, index) => {
        setOldData(tableData[i]);
        setEditIdx(index)
    }

    const submitEditing = (i) => {
        console.log(tableData[i])
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        if(tableData[i].name !== "" && tableData[i].tel !== "" && tableData[i].person_id !== "" && tableData[i].salary >= 0 && tableData[i].position_id !== ""){
            API.post(`api/updateUser`,tableData[i], {
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              })
                .then((res) => {
                    setTrueAlert("แก้ไขข้อมูลสำเร็จ!");
                    setEditIdx(-1)
                    callApi();
                }).catch((error) => {
                    setErrorAlert("แก้ไขข้อมูลไม่สำเร็จ!");
                });
        }
        else{
            setErrorAlert("กรุณากรอกข้อมูลให้ครบ");
        }
    }

    const stopEditing = (i) => {
        let newData = [...tableData]
        newData[i] = oldData;
        setTableData(newData);
        setEditIdx(-1)
    }

    const searchUpdate = (event) => {
        event.preventDefault();
        var jwt = JSON.parse(localStorage.getItem('token-jwt'));
        if(user_id !== ""){
            API.get(`api/user/${user_id}`,{
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              })
                .then((res) => {
                    setTableData(res.data.data)
                }).catch((error) => {
    
                });
        }
        
    }
    
    const setTrueAlert = (text) =>{
        setSendStatus_true(true);
        setTextAlert(text);
        setTimeout(()=>{setSendStatus_true(false) }, 2000);
    }
    const setErrorAlert = (text) =>{
        setSendStatus_error(true);
        setTextAlert(text);
        setTimeout(()=>{setSendStatus_error(false) }, 2000);
    }

    const row = (x, index) => {
        const currentlyEditing = editIdx === index;
        return(
            <TableRow key={x.id}>
                <TableCell>{x.id}</TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="name"
                            value={tableData[index+(page*rowsPerPage)].name}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        />
                    ) : x.name
                }
                </TableCell>
                <TableCell>
                    { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="tel"
                            value={tableData[index+(page*rowsPerPage)].tel}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        />
                    ) : x.tel
                }
                </TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="person_id"
                            value={tableData[index+(page*rowsPerPage)].person_id}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        />
                    ) : x.person_id
                }
                </TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="position_th"
                            select
                            value={tableData[index+(page*rowsPerPage)].position_th}
                            onChange={handleChangePosition(index+(page*rowsPerPage))}
                        >
                           {position.map((option) => (
                            <MenuItem value={option}>
                                {option}
                            </MenuItem>
                            ))} 
                        </TextField>
                    ) : x.position_th
                }
                </TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="salary"
                            value={tableData[index+(page*rowsPerPage)].salary}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        />
                    ) : x.salary
                }
                </TableCell>
                <TableCell>
                    { currentlyEditing ? (
                        <div style={{whiteSpace:"nowrap"}}>
                            <DoneIcon onClick={() => submitEditing(index+(page*rowsPerPage), x.location_id)} style={{marginRight:20}}/>
                            <CloseIcon onClick={() => stopEditing(index+(page*rowsPerPage))} />
                        </div>
                    ) : (
                        <div style={{whiteSpace:"nowrap"}}>
                            <EditIcon onClick={() => startEditing(index+(page*rowsPerPage), index)} style={{marginRight:20}}/>
                        </div>
                    )}
                </TableCell>
            </TableRow>
        )
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
        >
            <Grid xs={12} sm={10} md={9} lg={8}>
                { sendStatus_true ? (
                    <Snackbar open={sendStatus_true} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }} style={{top:200}}>
                        <Alert  
                            variant="filled" severity="success" style={{fontSize:"1.2em"}}
                        >
                            {textAlert}
                        </Alert>
                    </Snackbar>
                    ) : null
                    }
                { sendStatus_error ? (
                    <Snackbar open={sendStatus_error} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }} style={{top:200}}>
                        <Alert  
                            variant="filled" severity="error" style={{fontSize:"1.2em"}}
                        >
                            {textAlert}
                        </Alert>
                    </Snackbar>
                    ) : null
                }
            </Grid>
            <Grid xs={12} sm={12} md={10} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>รหัสพนักงาน</div>}
                            fullWidth
                            inputProps={{style: {fontSize: "1.2em"}}}
                            InputLabelProps={{shrink: true}}
                            variant="outlined"
                            name="user_id"
                            value={user_id}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid container item xs={12} sm={12} md={2}>
                        <Button onClick={searchUpdate} variant="contained" color="primary" style={{fontSize:"1.5em"}}>
                            ค้นหา
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer components={{Container: props => <Paper {...props} elevation={0}/>}}
                    style={{marginTop:20}}
                >
                    <Table className={classes.table}  > 
                        <TableHead >
                            <TableRow >
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>รหัสพนักงาน</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>ชื่อ-สกุล</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>เบอร์โทร</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>เลขบัตรประชาชน</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>ตำแหน่ง</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>อัตราเงินเดือน</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableData
                            ).map((x, index) => (
                                row(x, index)
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={10}
                                    count={tableData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Manage_User;