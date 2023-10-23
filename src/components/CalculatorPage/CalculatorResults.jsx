import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function CalculatorResults() {
    const dispatch = useDispatch();
    const history = useHistory();

    const newPatient = useSelector(store => store.newPatient);
    const user = useSelector(store => store.user);

    function calculateIvIdEpinephrin(birth_weight) {
        let iv = 0.02 * birth_weight;
        let id = 0.2 * birth_weight;

        return { iv, id };

    };

    function calculateEttEpinephrin(birth_weight) {
        let et_mg = 0.1 * birth_weight;
        let et_ml = 1 * birth_weight;

        return { et_mg, et_ml };

    }

    function calculateMkd(birth_weight) {
        let mkdSixty = 60 * birth_weight / 24;
        let mkdEighty = 80 * birth_weight / 24;
        let mkdHundred = 100 * birth_weight / 24;

        return { mkdSixty, mkdEighty, mkdHundred };
    }

    let birth_weight = newPatient.birth_weight;

    let epinephrin = { ...calculateIvIdEpinephrin(birth_weight), ...calculateEttEpinephrin(birth_weight) };
    let mkd = calculateMkd(birth_weight);

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
                        <td>{newPatient.ett_size_calc}</td>
                        <td>{newPatient.ett_depth_weight_calc}</td>
                        <td>{newPatient.uac_depth_calc}</td>
                        <td>{newPatient.uvc_depth_calc}</td>
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
                        <td>{mkd.mkdSixty}</td>
                        <td>{mkd.mkdEighty}</td>
                        <td>{mkd.mkdHundred}</td>
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
                        <td>{epinephrin.iv} / {epinephrin.id}</td>
                    </tr>
                    <tr>
                        <td>0.5-1 mL/kg</td>
                        <td>{epinephrin.ml}</td>
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
        </>
    );
}

export default CalculatorResults;

// TODO: 
// Check calculations, I was using Kg, now using g.
// I may need to change the order of magnitude of some
// of the numbers I'm adding or multiplying.
