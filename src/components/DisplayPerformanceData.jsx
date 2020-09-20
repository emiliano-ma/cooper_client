import React, { Component } from 'react';
import { getData } from "../modules/performanceData";
import { Line } from 'react-chartjs-2'

class DisplayPerformanceData extends Component {
  state = {
    performanceData: null
  }

  componentDidMount() {
    this.getPerformanceData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateIndex !== prevProps.updateIndex) {
      this.getPerformanceData()
    }
  }

  async getPerformanceData() {
    let result = await getData();
    this.setState({performanceData: result.data.entries}, () => {
      this.props.indexUpdated();
    })
  }

  render () {
    let graph;
    let distances = [];
    let labels = [];

    if (this.state.performanceData != null) {
      this.state.performanceData.forEach(entry => {
        distances.push(entry.data.distance)
        labels.push(entry.data.message)
      })
    }

    const data = {
      datasets: [{
        data: distances,
        label: 'Saved entries',
        backgroundColor: 'rgba(5,178,84,0.2)',
        borderColor: 'rgba(5,178,84,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(5,178,84,0.5)',
        pointBorderColor: 'rgba(5,178,84,0.9)',
        pointBorderWidth: 5,
      }],
      labels: labels 
    }

    graph = (
      <>
      <Line 
        data={data}
      />
      </>
    )



    return (
      <div id="graph">
        {graph}
      </div>
    )
  }      
}

export default DisplayPerformanceData;