import React, { Component } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

const initState = {
  currentValue: 0,
  operation: undefined,
  result: undefined,
  displayValue: '0'
};

const getResult = (operation, result, value) => {
  return operation === '+' ?
    parseFloat(result) + parseFloat(value) :
    parseFloat(result) - parseFloat(value)
};

const getState = (prevState, input) => {
  const { currentValue, operation, result } = prevState;
  const newState = Object.assign({}, prevState);

  const onEquals = () => {
    const canCalculate = operation && result
    if (!canCalculate) return prevState
    const newResult = getResult(operation, result, currentValue)
    newState.currentValue = 0
    newState.operation = undefined
    newState.result = newResult
    newState.displayValue = newResult.toString()
    return newState;
  }

  const onOperator = () => {
    const hasNewValue = currentValue !== 0
    if (operation && hasNewValue && result) {
      const newResult = getResult(operation, result, currentValue)
      newState.result = newResult
      newState.displayValue = newResult.toString()
    } else if (hasNewValue) {
      newState.result = currentValue
    }
    newState.currentValue = 0
    newState.operation = input
    return newState;
  }

  const onDecimal = () => {
    const currentValueContainsDecimal = currentValue.toString().split('').includes('.')
    if (currentValueContainsDecimal) return prevState
    const newValue = currentValue + input
    newState.currentValue = newValue
    newState.displayValue = newValue.toString()
    return newState;
  }

  const onNumeric = () => {
    const newValue = parseFloat(currentValue + input)
    newState.currentValue = newValue
    newState.displayValue = newValue.toString()
    return newState;
  }

  switch (input) {
    case 'AC': return initState
    case '=': return onEquals()
    case '+': return onOperator()  
    case '-': return onOperator()  
    case '.': return onDecimal()
    default: return onNumeric()
  }
};

class Calculator extends Component {
  constructor() {
    super();
    this.state = Object.assign({}, initState);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(input) {
    this.setState(getState(this.state, input))
  }

  render() {
    const { displayValue } = this.state;
    const buttons = ['7', '4', '1', 'AC', '8', '5', '2', '0', '9', '6', '3', '.', '+', '-'];
    return (
      <div className="Calculator">
        <Display text={displayValue}></Display>
        <div className="buttons">
          { 
            buttons.map((value) => <Button key={value} handleClick={this.onButtonClick} text={value}></Button>)
          }
          <Button key="=" handleClick={this.onButtonClick} text="=" tall></Button>
        </div>
      </div>
    );
  }
}

export default Calculator;

export {
  initState,
  getResult,
  getState
}
