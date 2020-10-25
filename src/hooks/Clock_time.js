import React from 'react';
class Clock_time extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date : new Date().getDate(),
        month : new Date().getMonth(),
        year : new Date().getFullYear(),
        hours : new Date().getHours(),
        min : new Date().getMinutes(),
        sec : new Date().getSeconds()
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
        year : new Date().getFullYear(),
        hours : new Date().getHours(),
        min : new Date().getMinutes(),
        sec : new Date().getSeconds()
    })}

    render() {
      return (
        <p className="App-clock" style={{fontSize:"1.5em",marginTop:-5}}>
          {this.state.hours} นาฬิกา {"  "}
          {this.state.min} นาที {"  "}
          {this.state.sec} วินาที
        </p>
      );
    }
  }
  export default Clock_time;