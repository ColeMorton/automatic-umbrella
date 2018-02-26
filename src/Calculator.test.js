import React from 'react';
import ReactDOM from 'react-dom';
import Calculator, { getInit, getState, getResult, initState } from './Calculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calculator />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('getResult', () => {
  it('can add', () => {
    const result = getResult('+', 10, 10)
    expect(typeof result).toEqual('number')
    expect(result).toEqual(20)
  });

  it('can add decimals', () => {
    const result = getResult('+', 0.1, 100.1)
    expect(typeof result).toEqual('number')
    expect(result).toEqual(100.19999999999999)
  });
  
  it('can subtract', () => {
    const result = getResult('-', 10, 10)
    expect(typeof result).toEqual('number')
    expect(result).toEqual(0)
  });

  it('can subtract decimals', () => {
    const result = getResult('-', 0.8, 0.599)
    expect(typeof result).toEqual('number')
    expect(result).toEqual(0.20100000000000007)
  });
})

describe('getState', () => {
  describe('AC press', () => {
    it('returns initial state', () => {
      const result = getState(initState, 'AC')
      expect(typeof result).toEqual('object')
      expect(result).toEqual(initState)
    });
  });

  describe('= press', () => {
    it('returns previous state when cannot calculate', () => {
      const result = getState(initState, '=')
      expect(typeof result).toEqual('object')
      expect(result).toEqual(initState)
    });

    it('should clear the current value', () => {
      const state = Object.assign({}, initState, {
        currentValue: 5,
        operation: '+',
        result: 5
      })
      const result = getState(state, '=')
      expect(result.currentValue).toBe(0)
    });

    it('should clear the operation', () => {
      const state = Object.assign({}, initState, {
        currentValue: 5,
        operation: '+',
        result: 5
      })
      const result = getState(state, '=')
      expect(result.operation).toBeUndefined()
    });

    it('should set the new result', () => {
      const state = Object.assign({}, initState, {
        currentValue: 5,
        operation: '+',
        result: 5
      })
      const result = getState(state, '=')
      expect(result.result).toBe(10)
    });

    it('should set the display value', () => {
      const state = Object.assign({}, initState, {
        currentValue: 5,
        operation: '+',
        result: 5
      })
      const result = getState(state, '=')
      expect(result.displayValue).toBe('10')
    });
  });

  describe('+/- press', () => {
    it('should calculate when operator current selected', () => {
      const state = Object.assign({}, initState, {
        currentValue: 50,
        operation: '+',
        result: 50
      })
      const result = getState(state, '+')
      expect(result.result).toBe(100)
      expect(result.displayValue).toBe('100')
    });

    it('should assing the current value to the result', () => {
      const state = Object.assign({}, initState, {
        currentValue: 5
      })
      const result = getState(state, '-')
      expect(result.result).toBe(5)
    });

    it('should clear the current value', () => {
      const state = Object.assign({}, initState, {
        currentValue: 5
      })
      const result = getState(state, '+')
      expect(result.currentValue).toBe(0)
    });

    it('should set the operation', () => {
      const result = getState(initState, '+')
      expect(result.operation).toBe('+')
    });
  });

  describe('decimal press', () => {
    it('should return the previous state if the current value already contains a decimal', () => {
      const state = Object.assign({}, initState, {
        currentValue: '.'
      })
      const result = getState(state, '.')
      expect(result).toEqual(state)
    })

    it('should concat a decimal to the current value', () => {
      const state = Object.assign({}, initState, {
        currentValue: 5
      })
      const result = getState(state, '.')
      expect(result.currentValue).toEqual('5.')
    })

    it('should concat a decimal to the display value', () => {
      const state = Object.assign({}, initState, {
        currentValue: 5
      })
      const result = getState(state, '.')
      expect(result.displayValue).toEqual('5.')
    })
  })

  describe('numeric press', () => {
    it('should concat the input to the current value', () => {
      const state = Object.assign({}, initState, {
        currentValue: 1
      })
      const result = getState(state, '0')
      expect(result.currentValue).toEqual(10)
    })

    it('should concat the input to the display value', () => {
      const state = Object.assign({}, initState, {
        currentValue: 1
      })
      const result = getState(state, '0')
      expect(result.displayValue).toEqual('10')
    })
  })
})
