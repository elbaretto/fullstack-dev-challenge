import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './CurrencyInput.css'
import agent from '../agent'
import {connect} from 'react-redux';
import {PRINCIPLE_CHANGED} from "../constants/actionTypes";

const mapStateToProps = state => ({
  ...state.input
});

const mapDispatchToProps = dispatch => ({
  onChange: payload =>
    dispatch({type: PRINCIPLE_CHANGED, payload})
});

class CurrencyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
      value: props.defaultValue
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({value});
    agent.Calculator.calculate(e.target.value, this.props.interestRate).then(result => {
      this.props.onChange({principal: value, chartData: result})
    })
  }

  handleFocus(e) {
    this.setState({
      hasFocus: true
    })
  }

  render() {
    const {defaultValue} = this.props;
    const {value} = this.state;

    return (
      <div className={`currency-input ${defaultValue !== undefined ? 'default-value' : ''}`}>
        <span>£</span>
        <input type="text"
               value={value}
               onChange={this.handleChange.bind(this)}
               onFocus={this.handleFocus.bind(this)}/>
      </div>
    )
  }
}

CurrencyInput.propTypes = {
  defaultValue: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyInput);
