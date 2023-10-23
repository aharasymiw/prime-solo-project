import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function CalculatorResults() {
    const dispatch = useDispatch();
    const history = useHistory();

    const newPatient = useSelector(store => store.newPatient);
    const user = useSelector(store => store.user);

    const savePatient = newRoute => {
        dispatch({ type: '', payload: newPatient });
        history.push(newRoute);
    }

    // birth_weight int2 NOT NULL,
    // ga_weeks int2 NOT NULL,
    // ga_days int2 NOT NULL,
    // ett_size_calc NUMERIC(7, 4) NOT NULL,
    // ett_size_actual NUMERIC(7, 4),
    // ett_depth_weight_calc NUMERIC(7, 4) NOT NULL,
    // ett_depth_age_calc NUMERIC(7, 4) NOT NULL,
    // ett_depth_actual NUMERIC(7, 4),
    // uac_depth_calc NUMERIC(7, 4) NOT NULL,
    // uac_depth_actual NUMERIC(7, 4),
    // uvc_depth_calc NUMERIC(7, 4) NOT NULL,
    // uvc_depth_actual NUMERIC(7, 4),
    // ns_bolus_given bool NOT NULL DEFAULT FALSE,
    // bp_systolic int2,
    // bp_diastolic int2,
    // map int2,
    // ns_bolus_qty int2,
    // d10_bolus_given bool NOT NULL DEFAULT FALSE,
    // init_blood_glucos int2,
    // d10_bolus_qty int2,
    // notes text,

    return (
        <>

            <table>
                <thead>
                    <tr>
                        <th>ETT Size</th>
                        <th>ETT Insertion</th>
                        <th>UAC Length</th>
                        <th>UVC Length</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{newPatient.calculatedDataToSave.ett_size_calc}</td>
                        <td>{newPatient.calculatedDataToSave.ett_depth_weight_calc}</td>
                        <td>{newPatient.calculatedDataToSave.uac_depth_calc}</td>
                        <td>{newPatient.calculatedDataToSave.uvc_depth_calc}</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>60 mkd</th>
                        <th>80 mkd</th>
                        <th>100 mkd</th>
                        <th>NS Bolus</th>
                        <th>D10 Bolus</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{newPatient.calculatedDataToDisplay.mkd.mkdSixty}</td>
                        <td>{newPatient.calculatedDataToDisplay.mkd.mkdEighty}</td>
                        <td>{newPatient.calculatedDataToDisplay.mkd.mkdHundred}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>IV/ID Epi</th>
                        <th>ETT Epi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0.1-0.3 mL/kg</td>
                        <td>0.5-1 mL/kg</td>
                    </tr>
                    <tr>
                        <td>{newPatient.calculatedDataToDisplay.iv_id_epi}</td>
                        <td>{newPatient.calculatedDataToDisplay.ett_epi}</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>5th %ile Systolic</th>
                        <th>5th %ile Diastolic</th>
                        <th>5th %ile MAP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>


            {
                user.uuid ?
                    // If the user is already logged in, 
                    // Show a "Bolus Details" option
                    <button
                        type="button"
                        className="btn btn_asLink"
                        onClick={() => {
                            savePatient('/bolus');
                        }}
                    >
                        Bolus Details
                    </button>
                    :
                    // Otherwise, show a "login/register" option
                    <button
                        type="button"
                        className="btn btn_asLink"
                        onClick={() => {
                            savePatient('/login');
                        }}
                    >
                        Login/Register
                    </button>
            }

            <section className='footnote'>
                <p>Epinephrine Concentration: 0.1 mg/mL = 1 mg / 10 mL</p>
                <p>ETT size ≈ GA / 10</p>
                <p>ETT Insertion ≈ weight in kg(s) + 6</p>
            </section>
        </>
    );
}

export default CalculatorResults;

// TODO: 
// Check calculations, I was using Kg, now using g.
// I may need to change the order of magnitude of some
// of the numbers I'm adding or multiplying.
