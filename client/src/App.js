import React, {Component} from 'react';
import CurrencyInput from './components/CurrencyInput'
import SliderInput from './components/SliderInput'
import DisplayGraph from './components/DisplayGraph'
import './App.css';
import {connect} from "react-redux";

const mapStateToProps = state => ({
  ...state.input
});

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="header-banner">
          <h1 className="fmz-white-font">Finimize Interest Rate Calculator</h1>
        </div>
        <div className="financial-inputs">
          <p className="input-label">How much have you saved?</p>
          <CurrencyInput defaultValue={0}/>

          <p className="input-label">How much will you save each month?</p>
          <CurrencyInput defaultValue={0}/>

          <p className="input-label">How much interest will you earn per year?</p>
          <SliderInput defaultValue={this.props.interestRate}/>
        </div>
        <div className="financial-display">
          <DisplayGraph data={this.props.chartData ? this.props.chartData : []}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

