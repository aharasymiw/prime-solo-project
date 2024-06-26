const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const { generateRandomLetter, generateRandomNumber } = require('../be_utils/be_utils');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res, next) => {
  let user = req.user;

  let managed_by = user.uuid;

  const queryText = `SELECT uuid, anonymous_id, birth_weight, created_at, ga_weeks from "patients" WHERE managed_by=$1;`;

  pool
    .query(queryText, [managed_by])
    .then((dbResponse) => {
      let patients = dbResponse.rows;

      res.json(patients);
    })
    .catch((err) => {
      console.log('\n\n\n\n\n\nPatient list lookup failed:  \n\n', err);
      res.sendStatus(500);
    });

});

router.get('/:patient_uuid', rejectUnauthenticated, (req, res, next) => {

  let user = req.user;
  let managed_by = user.uuid;

  let patient_uuid = req.params.patient_uuid;

  const queryText = `
      SELECT
        uuid, anonymous_id, birth_weight, ga_weeks, ga_days, ett_size_calc, ett_size_actual, ett_depth_weight_calc, ett_depth_age_calc, ett_depth_actual, uac_depth_calc, uac_depth_actual, uvc_depth_calc, uvc_depth_actual, ns_bolus_given, bp_systolic_calc_bottom, bp_systolic_calc_mid, bp_systolic_calc_top, bp_systolic_actual, bp_diastolic_calc_bottom, bp_diastolic_calc_mid, bp_diastolic_calc_top, bp_diastolic_actual, map_calc_bottom, map_calc_mid, map_calc_top, map_actual, pulse_pressure_calc_bottom, pulse_pressure_calc_mid, pulse_pressure_calc_top, ns_bolus_qty, d10_bolus_given, init_blood_glucose, d10_bolus_qty, notes
      FROM
        "patients" 
      WHERE
        uuid=$1 AND managed_by=$2;`;

  pool
    .query(queryText, [patient_uuid, managed_by])
    .then((dbResponse) => {
      let patient = dbResponse.rows[0];
      res.json(patient);
    })
    .catch((err) => {
      console.log('\n\n\n\n\n\nPatient info lookup failed:  \n\n', err);
      res.sendStatus(500);
    });

});

router.post('/', rejectUnauthenticated, (req, res, next) => {

  let user = req.user;
  let newPatient = req.body;

  console.log('newPatient', newPatient);

  const anonymous_id = generateRandomLetter() + generateRandomNumber(1, 10000);

  const birth_weight = newPatient.birth_weight;
  const ga_weeks = newPatient.ga_weeks;
  const ga_days = newPatient.ga_days;
  const ett_size_calc = newPatient.ett_size_calc;
  const ett_depth_weight_calc = newPatient.ett_depth_weight_calc;
  const ett_depth_age_calc = newPatient.ett_depth_age_calc;
  const uac_depth_calc = newPatient.uac_depth_calc;
  const uvc_depth_calc = newPatient.uvc_depth_calc;
  const bp_systolic_calc_bottom = newPatient.bp_systolic_calc_bottom;
  const bp_diastolic_calc_bottom = newPatient.bp_diastolic_calc_bottom;
  const map_calc_bottom = newPatient.map_calc_bottom;
  const pulse_pressure_calc_bottom = newPatient.pulse_pressure_calc_bottom;
  const bp_systolic_calc_mid = newPatient.bp_systolic_calc_mid;
  const bp_diastolic_calc_mid = newPatient.bp_diastolic_calc_mid;
  const map_calc_mid = newPatient.map_calc_mid;
  const pulse_pressure_calc_mid = newPatient.pulse_pressure_calc_mid;
  const bp_systolic_calc_top = newPatient.bp_systolic_calc_top;
  const bp_diastolic_calc_top = newPatient.bp_diastolic_calc_top;
  const map_calc_top = newPatient.map_calc_top;
  const pulse_pressure_calc_top = newPatient.pulse_pressure_calc_top;

  const managed_by = user.uuid;
  const created_by = user.uuid;
  const updated_by = user.uuid;

  const queryText = `INSERT INTO "patients" (anonymous_id, birth_weight, ga_weeks, ga_days, ett_size_calc, ett_depth_weight_calc, ett_depth_age_calc, uac_depth_calc, uvc_depth_calc, bp_systolic_calc_bottom, bp_systolic_calc_mid, bp_systolic_calc_top, bp_diastolic_calc_bottom, bp_diastolic_calc_mid, bp_diastolic_calc_top, map_calc_bottom, map_calc_mid, map_calc_top, pulse_pressure_calc_bottom, pulse_pressure_calc_mid, pulse_pressure_calc_top, managed_by, created_by, updated_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING uuid;`;
  pool
    .query(queryText, [anonymous_id, birth_weight, ga_weeks, ga_days, ett_size_calc, ett_depth_weight_calc, ett_depth_age_calc, uac_depth_calc, uvc_depth_calc, bp_systolic_calc_bottom, bp_systolic_calc_mid, bp_systolic_calc_top, bp_diastolic_calc_bottom, bp_diastolic_calc_mid, bp_diastolic_calc_top, map_calc_bottom, map_calc_mid, map_calc_top, pulse_pressure_calc_bottom, pulse_pressure_calc_mid, pulse_pressure_calc_top, managed_by, created_by, updated_by])
    .then((dbResponse) => {
      let uuid = dbResponse.rows[0].uuid;
      res.json({ uuid, anonymous_id });
    })
    .catch((err) => {
      console.log('\n\n\n\n\n\nPatient save failed:  \n\n', err);
      console.log('\n\nAt some point, there will be a collision, based on the need for unique anonymous_id/user pair.  Once you see that error, start checking for it and retrying with a newly re-generated anonymous_id.\n\n\n\n\n\n')
      res.sendStatus(500);
    });

});

router.post('/actuals', rejectUnauthenticated, (req, res, next) => {

  let user = req.user;
  let newDetails = req.body;

  console.log('newDetails', newDetails);

  const anonymous_id = newDetails.anonymous_id;
  const ett_size_actual = newDetails.ett_size_actual;
  const ett_depth_actual = newDetails.ett_depth_actual;
  const uac_depth_actual = newDetails.uac_depth_actual;
  const uvc_depth_actual = newDetails.uvc_depth_actual;
  const patient_uuid = newDetails.patient_uuid;

  const updated_by = user.uuid;

  const queryText = `UPDATE "patients" SET 
    anonymous_id=$1, ett_size_actual=$2, ett_depth_actual=$3, uac_depth_actual=$4, uvc_depth_actual=$5, updated_by=$6
  WHERE
      managed_by=$6 AND uuid=$7
  RETURNING
      uuid;`;

  pool
    .query(queryText, [anonymous_id, ett_size_actual, ett_depth_actual, uac_depth_actual, uvc_depth_actual, updated_by, patient_uuid])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('\n\n\n\n\n\nPatient newDetails update failed: \n\n', err);
      console.log('\n\n\n\n\n\n')
      res.sendStatus(500);
    });

});

router.post('/boluses', rejectUnauthenticated, (req, res, next) => {

  let user = req.user;
  let newBolus = req.body;

  console.log('newBolus', newBolus);

  const ns_bolus_given = newBolus.ns_bolus_given;
  const bp_systolic_actual = newBolus.bp_systolic_actual;
  const bp_diastolic_actual = newBolus.bp_diastolic_actual;
  const map_actual = newBolus.map_actual;
  const ns_bolus_qty = newBolus.ns_bolus_qty;
  const d10_bolus_given = newBolus.d10_bolus_given;
  const init_blood_glucose = newBolus.init_blood_glucose;
  const d10_bolus_qty = newBolus.d10_bolus_qty;
  const patient_uuid = newBolus.patient_uuid;

  const updated_by = user.uuid;

  const queryText = `UPDATE "patients" SET 
      ns_bolus_given=$1, bp_systolic_actual=$2, bp_diastolic_actual=$3, map_actual=$4, ns_bolus_qty=$5, d10_bolus_given=$6, init_blood_glucose=$7, d10_bolus_qty=$8, updated_by=$9
    WHERE
      managed_by=$9 AND uuid=$10
    RETURNING
      uuid;`;
  pool
    .query(queryText, [ns_bolus_given, bp_systolic_actual, bp_diastolic_actual, map_actual, ns_bolus_qty, d10_bolus_given, init_blood_glucose, d10_bolus_qty, updated_by, patient_uuid])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('\n\n\n\n\n\nPatient newBolus update failed:  \n\n', err);
      console.log('\n\n\n\n\n\n')
      res.sendStatus(500);
    });

});

router.post('/notes', rejectUnauthenticated, (req, res, next) => {

  let user = req.user;
  let newNotes = req.body;

  console.log('newNotes', newNotes);

  const notes = newNotes.notes;
  const patient_uuid = newNotes.patient_uuid;

  const updated_by = user.uuid;

  const queryText = `UPDATE "patients" SET 
    notes=$1, updated_by=$2
  WHERE
      managed_by=$2 AND uuid=$3
  RETURNING
      uuid;`;
  pool
    .query(queryText, [notes, updated_by, patient_uuid])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('\n\n\n\n\n\nPatient notes update failed: \n\n', err);
      console.log('\n\n\n\n\n\n')
      res.sendStatus(500);
    });

});

module.exports = router;

