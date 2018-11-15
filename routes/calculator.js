const express = require('express');
const router = express.Router();

const calculateCompoundIntest = (principal, interestRate, timesPerYear, years) => {
  let body = 1 + (interestRate / timesPerYear);
  // nt
  let exponent = timesPerYear * years;
  // P(1 + r/n)^nt
  return principal * Math.pow(body, exponent);
};

router.get("/", (req, res) => {
  let principal = parseInt(req.query.principal);
  let interestRate = req.query.rate / 100;
  let timesPerYear = 1;

  let result = [{year: 0, amount: principal}];
  for (let i = 1; i < 6; i++) {
    result.push({
      year: i,
      amount: calculateCompoundIntest(result[i - 1].amount, interestRate, timesPerYear, i)
    });
  }

  res.json(result);
});

module.exports = router;
