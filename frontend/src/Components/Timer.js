import React from "react";
import { timers } from "jquery";

class Timer extends React.Component {
  state = {
    startTime: null,
    timeInterval: null,
    currentTime: "00:00:00.00",
  };

  componentDidMount() {
    const startTime = new Date().getTime();
    this.timeInterval = setInterval(() => {
      const duration = new Date().getTime() - this.state.startTime;
      const currentTime = this.props.convertToTimeDisplay(duration);
      this.setState({
        currentTime,
      });
    }, 1);
    this.setState({ startTime });
  }

  componentWillUnmount() {
    this.props.updateTotalTime(new Date().getTime() - this.state.startTime);
    clearInterval(this.timeInterval);
  }

  render() {
    return <div>{this.state.currentTime}</div>;
  }
}

export default Timer;
