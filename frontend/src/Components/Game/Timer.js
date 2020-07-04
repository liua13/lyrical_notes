import React from "react";

class Timer extends React.Component {
  state = {
    startTime: null,
    totalTime: 0,
    displayTime: "00:00:00.00",
  };

  componentDidMount() {
    const startTime = new Date().getTime();
    this.timeInterval = setInterval(() => {
      const duration = new Date().getTime() - this.state.startTime;
      const displayTime = this.props.convertToTimeDisplay(duration);
      this.setState({
        displayTime,
      });
    }, 1);
    this.setState({ startTime });
  }

  componentWillUnmount() {
    this.props.updateTotalTime(new Date().getTime() - this.state.startTime);
    clearInterval(this.timeInterval);
  }

  render() {
    return <div>{this.state.displayTime}</div>;
  }
}

export default Timer;
