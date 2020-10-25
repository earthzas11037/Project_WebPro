import React from 'react';
class Clock_date extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date : new Date().getDate(),
        month : new Date().getMonth(),
        year : new Date().getFullYear()+543,
        monthTH:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฏาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"]
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      this.setState({
        date : new Date().getDate(),
        month : new Date().getMonth(),
        year : new Date().getFullYear()+543
    })}

    render() {
      return (
        <p className="App-clock" style={{fontSize:"1.5em"}}>
          วันที่ {"  "}{this.state.date}{"  "}
            {"  "}{this.state.monthTH[this.state.month]}{"  "}
            {"  "}{this.state.year} 
        </p>
      );
    }
  }
  export default Clock_date;