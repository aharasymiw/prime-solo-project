import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { round1 } from '../../fe_utils/fe_utils'
import axios from 'axios';

function CalculatorResults() {
    const dispatch = useDispatch();
    const history = useHistory();

    const newPatient = useSelector(store => store.newPatient);
    const user = useSelector(store => store.user);

    const savePatient = () => {

        axios.post('/api/patients/', newPatient)
            .then(result => {
                // result.data = {patient_uuid, anonymous_id }
                dispatch({ type: 'NEW_PATIENT_APPEND_CACHE', payload: result.data });
            })
            .catch(err => {
                console.log('Error saving the patient', err);
                alert('error saving the patient, please try reloading.');
            });
    }

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>ETT Size</th>
                        <th>ETT Depth</th>
                        <th>UAC Length</th>
                        <th>UVC Length</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{newPatient.ett_size_calc}</td>
                        <td>{newPatient.ett_depth_weight_calc}</td>
                        <td>{round1(newPatient.uac_depth_calc)}</td>
                        <td>{round1(newPatient.uvc_depth_calc)}</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Rate</th>
                        <th>60 mkd</th>
                        <th>80 mkd</th>
                        <th>100 mkd</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>mL/hr</td>
                        <td>{round1(newPatient.mkdSixty)}</td>
                        <td>{round1(newPatient.mkdEighty)}</td>
                        <td>{round1(newPatient.mkdHundred)}</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th><p className='.two-lines'>NS Bolus</p><p className='.two-lines'>10-20 mL/kg</p></th>
                        <th><p className='.two-lines'>D10 Bolus</p><p className='.two-lines'>2-4 mL/kg</p></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{newPatient.ns_bolus}</td>
                        <td>{newPatient.d10_bolus}</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th><p className='.two-lines'>IV/ID Epi</p><p className='.two-lines'>0.1-0.3 mL/kg</p></th>
                        <th><p className='.two-lines'>ETT Epi</p><p className='.two-lines'>0.5-1 mL/kg</p></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{newPatient.iv_id_epi}</td>
                        <td>{newPatient.ett_epi}</td>
                    </tr>
                </tbody>
            </table >

            <table>
                <thead>
                    <tr>
                        <th>%ile</th>
                        <th>SBP</th>
                        <th>DBP</th>
                        <th>MAP</th>
                        <th>PP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>5<sup>th</sup></td>
                        <td>{newPatient.bp_systolic_calc_bottom}</td>
                        <td>{newPatient.bp_diastolic_calc_bottom}</td>
                        <td>{newPatient.map_calc_bottom}</td>
                        <td>{newPatient.pulse_pressure_calc_bottom}</td>
                    </tr>
                    <tr>
                        <td>50<sup>th</sup></td>
                        <td>{newPatient.bp_systolic_calc_mid}</td>
                        <td>{newPatient.bp_diastolic_calc_mid}</td>
                        <td>{newPatient.map_calc_mid}</td>
                        <td>{newPatient.pulse_pressure_calc_mid}</td>
                    </tr>
                    <tr>
                        <td>95<sup>th</sup></td>
                        <td>{newPatient.bp_systolic_calc_top}</td>
                        <td>{newPatient.bp_diastolic_calc_top}</td>
                        <td>{newPatient.map_calc_top}</td>
                        <td>{newPatient.pulse_pressure_calc_top}</td>
                    </tr>
                </tbody>
            </table>

            <section className='footnote'>
                <p>Epinephrine Concentration: 0.1 mg/mL = 1 mg / 10 mL</p>
                <p>ETT size ≈ GA / 10</p>
                <p>ETT Insertion ≈ weight in kg(s) + 6</p>
            </section>

            {
                user.uuid ?
                    <button
                        type="button"
                        className="btn btn_asLink"
                        onClick={() => {
                            { !newPatient.uuid && savePatient(); }
                            history.push('/details');
                        }}
                    >
                        Enter Post-Resuscitation Details
                    </button>
                    :
                    // Otherwise, show a "login/register" option
                    <button
                        type="button"
                        className="btn"
                        onClick={() =>
                            history.push('/login')
                        }
                    >
                        Login
                    </button>
            }

        </section>
    );
}

export default CalculatorResults;

// TODO: 
// Check calculations, I was using Kg, now using g.
// I may need to change the order of magnitude of some
// of the numbers I'm adding or multiplying.
// block all sensible routes when not logged in.
