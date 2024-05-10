import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { round1 } from '../../fe_utils/fe_utils'
import axios from 'axios';

function PatientItem({ patientSummary }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(store => store.user);

  function fetchPatientDetails(patientSummary) {

    const uuid = patientSummary.uuid;
    console.log('uuid', uuid);
    console.log('typeof uuid', typeof uuid);

    axios.get('/api/patients/' + uuid)
      .then(result => {
        console.log('result.data', result.data);
        // result.data = {uuid, anonymous_id, birth_weight, birth_weight_actual, ga_weeks, ga_days, ett_size_calc, ett_size_actual, ett_depth_weight_calc, ett_depth_age_calc, ett_depth_actual, uac_depth_calc, uac_depth_actual, uvc_depth_calc, uvc_depth_actual, ns_bolus_given, bp_systolic_calc, bp_systolic_actual, bp_diastolic_calc, bp_diastolic_actual, map_calc, map_actual, ns_bolus_qty, d10_bolus_given, init_blood_glucose, d10_bolus_qty, notes}
        dispatch({ type: 'EXISTING_PATIENT_CALCULATE', payload: result.data });
      })
      .catch(err => {
        console.log('Error grabbing the patient details', err);
        alert('error access the patient details, please try reloading.');
      });
  }

  const goToPatient = (patientSummary) => {

    dispatch({ type: 'NEW_PATIENT_CLEAR_CACHE' });

    fetchPatientDetails(patientSummary);

    history.push('/bolus');
  };

  // patient.created_at comes in as a string, so we'll turn it into a Date object.
  // to make it easier to manipulate. 
  const dateTime = new Date(patientSummary.created_at);

  // .getFullYear() returns the full 4 digit year
  // We get the 2 digit year by dividing by 100 and taking the remainder.
  const year = dateTime.getFullYear() % 100;

  // .getMonth() returns a value between 0 and 11, so we need to bump it up one.
  const month = dateTime.getMonth() + 1;

  const day = dateTime.getDate();

  return (
    <>
      <tr>
        <td>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              goToPatient(patientSummary);
            }}
          >
            {patientSummary.anonymous_id}
          </button>
        </td>
        <td>{`${month}/${day}/${year}`}</td>
        <td>{round1(patientSummary.birth_weight / 1000)} kgs</td>
        <td>{patientSummary.ga_weeks} weeks</td>
      </tr >
    </>
  );

}

export default PatientItem;
