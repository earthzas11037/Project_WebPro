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

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      fontSize: '200pt'
    },
});

function Update_Record(props){
    const classes = useStyles();
    const [tableData, setTableData] = useState([{
        userId: "123456",
        fullname: "นายขยัน  ตรงเวลา",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม.",
        OT: 2
     },
     {
        userId: "153513",
        fullname: "นายทนา  วันวันดี",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม.",
        OT: 0
     },
     {
        userId: "786425",
        fullname: "นายธงชัย  รักชาติ",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม.",
        OT: 0
     },
    {
        userId: "984623",
        fullname: "นายทักทาย  สวัสดีจ้า",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม.",
        OT: 0
     },
     {
        userId: "744152",
        fullname: "นายยักษา  มามาเร็ว",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม.",
        OT: 1
    },
    {
        userId: "744152",
        fullname: "นายยักษา  มามาเร็ว",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม.",
        OT: 4
        },
     {
        userId: "356124",
        fullname: "นายนงนม  ไปวันทา",
        time_in: "13:45:32",
        time_out: "20:45:32",
        sumtime: "7 ชม.",
        OT: 0
    }])
    const [editIdx, setEditIdx] = useState(-1)
    const [oldData, setOldData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
    const [startDate, setStartDate] = React.useState(new Date());

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
                <TableCell>{x.fullname}</TableCell>
                <TableCell>
                    { currentlyEditing ? (
                        <div style={{whiteSpace:"nowrap"}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    openTo="hours"
                                    views={["hours", "minutes", "seconds"]}
                                    ampm={false}
                                    format="HH:mm:ss"
                                    fullWidth
                                    value={x.time_in}
                                    onChange={handleStartDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    ) : x.time_in
                }
                </TableCell>
                <TableCell>
                { currentlyEditing ? (
                        <div style={{whiteSpace:"nowrap"}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    openTo="hours"
                                    views={["hours", "minutes", "seconds"]}
                                    ampm={false}
                                    format="HH:mm:ss"
                                    fullWidth
                                    value={x.time_out}
                                    onChange={handleStartDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    ) : x.time_out
                }
                </TableCell>
                <TableCell>{x.sumtime}</TableCell>
                <TableCell>{x.OT}</TableCell>
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
            <Grid xs={12} sm={10} md={8} style={{ backgroundColor: "WHITE", padding: "30px 5% 30px 5%", borderRadius: 6,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
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
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>เวลาเข้างาน</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>เวลาออกงาน</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>รวมเวลางาน</TableCell>
                                <TableCell style={{fontWeight:"bold",fontSize:"20px"}}>OT.</TableCell>
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
                                    colSpan={8}
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

export default Update_Record;