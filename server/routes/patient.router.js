const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/', rejectUnauthenticated, (req, res, next) => {

  let newPatient = req.body;

  console.log('newPatient', newPatient);

  const birth_weight = newPatient.birth_weight;
  const ga_weeks = newPatient.ga_weeks;
  const ga_days = newPatient.ga_days;
  const ett_size_calc = newPatient.ett_size_calc;
  const ett_depth_weight_calc = newPatient.ett_depth_weight_calc;
  const ett_depth_age_calc = newPatient.ett_depth_age_calc;
  const uac_depth_calc = newPatient.uac_depth_calc;
  const uvc_depth_calc = newPatient.uvc_depth_calc;

  const queryText = `INSERT INTO "patients" (birth_weight, ga_weeks, ga_days, ett_size_calc, ett_depth_weight_calc, ett_depth_age_calc, uac_depth_calc, uvc_depth_calc)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING uuid`;
  pool
    .query(queryText, [birth_weight, ga_weeks, ga_days, ett_size_calc, ett_depth_weight_calc, ett_depth_age_calc, uac_depth_calc, uvc_depth_calc])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Patient save failed: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
