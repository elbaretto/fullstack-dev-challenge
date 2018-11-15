import {INTEREST_RATE_CHANGED, PRINCIPLE_CHANGED} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case PRINCIPLE_CHANGED:
      return {
        ...state,
        principal: action.payload.principal,
        chartData: action.payload.chartData
      };
    case INTEREST_RATE_CHANGED:
      return {
        ...state,
        interestRate: action.payload.interestRate,
        chartData: action.payload.chartData
      };
    default:
      return state;
  }
};