import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './SliderInput.css'
import agent from "../agent";
import {INTEREST_RATE_CHANGED} from "../constants/actionTypes";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  ...state.input
});

const mapDispatchToProps = dispatch => ({
  onChange: payload =>
    dispatch({type: INTEREST_RATE_CHANGED, payload})
});

class SliderInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({value});
    agent.Calculator.calculate(this.props.principal, value).then(result => {
      this.props.onChange({interestRate: value, chartData: result})
    })
  }

  render() {
    const {value} = this.state

    return (
      <div className="fmz-slider">
        <p>{value}%</p>
        <input type="range"
               value={value}
               min={0}
               max={10}
               step={0.25}
               onChange={this.handleChange.bind(this)}/>
      </div>
    )
  }
}

SliderInput.propTypes = {
  defaultValue: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(SliderInput);
