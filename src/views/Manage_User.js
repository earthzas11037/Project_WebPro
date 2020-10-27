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
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,TimePicker} from "@material-ui/pickers";
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      fontSize: '200pt'
    },
});

function Manage_User(props){
    const classes = useStyles();
    const [tableData, setTableData] = useState([{
        userId: "123456",
        fullname:"นายขยัน  ตรงเวลา",
        tel: "099999999",
        idcardnumber: "1110346155513",
        type: "พนักงานประจำ",
        position: "AR",
        department: "บัญชี",
        salaryRate: 20000
    },
    {
        userId: "123457",
        fullname:"นายขยัน  ตรงเวลา",
        tel: "088888888",
        idcardnumber: "1116103155556",
        type: "พนักงานประจำ",
        position: "AR",
        department: "บัญชี",
        salaryRate: 18000
    },
    {
        userId: "123458",
        fullname:"นายขยัน  ตรงเวลา",
        tel: "088888888",
        idcardnumber: "1110351110036",
        type: "พาร์ทไทม์",
        position: "AR",
        department: "บัญชี",
        salaryRate: 42
    }])
    const [editIdx, setEditIdx] = useState(-1)
    const [oldData, setOldData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
    const [startDate, setStartDate] = useState(new Date());
    const typeEmployee = ["พนักงานประจำ","พาร์ทไทม์"];

    const handleChangeTable = (index) => (event) => {
        const { name, value } = event.target;
        let newData = [...tableData]
        newData[index] = {
            ...newData[index],
            [name] : value
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
        // console.log(tableData[i])
    }

    const stopEditing = (i) => {
        let newData = [...tableData]
        newData[i] = oldData;
        setTableData(newData);
        setEditIdx(-1)
    }

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const searchUpdate = (event) => {
        event.preventDefault();
    }
    
    const row = (x, index) => {
        const currentlyEditing = editIdx === index;
        return(
            <TableRow key={x.userId}>
                <TableCell>{x.userId}</TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="fullname"
                            value={tableData[index+(page*rowsPerPage)].fullname}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        />
                    ) : x.fullname
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
                            name="idcardnumber"
                            value={tableData[index+(page*rowsPerPage)].idcardnumber}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        />
                    ) : x.idcardnumber
                }
                </TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="type"
                            select
                            value={tableData[index+(page*rowsPerPage)].type}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        >
                           {typeEmployee.map((option) => (
                            <MenuItem value={option}>
                                {option}
                            </MenuItem>
                            ))} 
                        </TextField>
                    ) : x.type
                }
                </TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="position"
                            value={tableData[index+(page*rowsPerPage)].position}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        />
                    ) : x.position
                }
                </TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="department"
                            value={tableData[index+(page*rowsPerPage)].department}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        />
                    ) : x.department
                }
                </TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <TextField
                            type="text"
                            name="salaryRate"
                            value={tableData[index+(page*rowsPerPage)].salaryRate}
                            onChange={handleChangeTable(index+(page*rowsPerPage))}
                        />
                    ) : x.salaryRate
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
            <Grid xs={12} sm={12} md={10} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label={<div style={{fontSize:"1.5em",fontWeight:"bold",color:"BLACK",marginTop:-6}}>รหัสพนักงาน</div>}
                            fullWidth
                            inputProps={{style: {fontSize: "1.2em"}}}
                            InputLabelProps={{shrink: true}}
                            variant="outlined"
                            name="tel"
                            // value={userId}
                            // onChange={handleChange}
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
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>ประเภทพนักงาน</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>ตำแหน่ง</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>แผนก</TableCell>
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