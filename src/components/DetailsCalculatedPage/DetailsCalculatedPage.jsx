import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { round1 } from '../../fe_utils/fe_utils'
import axios from 'axios';

function DetailsCalculatedPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const newPatient = useSelector(store => store.newPatient);

    const ett_size_calc = newPatient.ett_size_calc;
    const ett_depth_age_calc = newPatient.ett_depth_age_calc;
    const ett_depth_weight_calc = newPatient.ett_depth_weight_calc;
    const uac_depth_calc = newPatient.uac_depth_calc;
    const uvc_depth_calc = newPatient.uvc_depth_calc;

    const [anonymous_id, set_anonymous_id] = useState(newPatient.anonymous_id);
    const [ett_size_actual, set_ett_size_actual] = useState(newPatient.ett_size_actual || '');
    const [ett_depth_actual, set_ett_depth_actual] = useState(newPatient.ett_depth_actual || '');
    const [uac_depth_actual, set_uac_depth_actual] = useState(newPatient.uac_depth_actual || '');
    const [uvc_depth_actual, set_uvc_depth_actual] = useState(newPatient.uvc_depth_actual || '');


    const updatePatient = payload => {

        axios.post('/api/patients/details/', payload)
            .then(result => {
                console.log('Updated details for patient:', newPatient.uuid);
            }
            ).catch(error => {
                console.log('Updated patient failed:', error);
            });
    };

    const updatePatientCache = () => {

        let payload = {
            anonymous_id: anonymous_id,
            ett_size_actual: Number(ett_size_actual),
            ett_depth_actual: Number(ett_depth_actual),
            uac_depth_actual: Number(uac_depth_actual),
            uvc_depth_actual: Number(uvc_depth_actual),
        };

        dispatch({
            type: 'NEW_PATIENT_APPEND_CACHE',
            payload: payload
        });

        payload.uuid = newPatient.uuid;

        updatePatient(payload);
        history.push('/notes');
    };

    return (
        <>
            <h2>Details - Input</h2>

            <section>
                <h3>Subject ID</h3>
                <input
                    type="text"
                    name="anonymous_id"
                    required
                    value={anonymous_id}
                    onChange={(event) => set_anonymous_id(event.target.value)}
                />
            </section>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Estimated</th>
                            <th>Actual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><p>ETT</p><p>Size</p></td>
                            <td>{ett_size_calc}</td>
                            <td>
                                <input
                                    type="number"
                                    name="ett_size_actual"
                                    min='2'
                                    max='4'
                                    placeholder='[2 - 4]'
                                    step={0.5}
                                    required
                                    value={ett_size_actual}
                                    onChange={(event) => set_ett_size_actual(event.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><p>ETT</p><p>Depth</p></td>
                            <td>{ett_depth_weight_calc}</td>
                            <td>
                                <input
                                    type="number"
                                    name="ett_depth_actual"
                                    min='5.5'
                                    max='10'
                                    placeholder='[5.5 - 10]'
                                    step={0.25}
                                    required
                                    value={ett_depth_actual}
                                    onChange={(event) => set_ett_depth_actual(event.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><p>UAC</p><p>Depth</p></td>
                            <td>{round1(uac_depth_calc)}</td>
                            <td>
                                <input
                                    type="number"
                                    name="birth_weight"
                                    min='7'
                                    max='23'
                                    step={0.25}
                                    placeholder='[7 - 23]'
                                    required
                                    value={uac_depth_actual}
                                    onChange={(event) => set_uac_depth_actual(event.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><p>UVC</p><p>Depth</p></td>
                            <td>{round1(uvc_depth_calc)}</td>
                            <td>
                                <input
                                    type="number"
                                    name="birth_weight"
                                    min='4'
                                    max='14'
                                    step={0.25}
                                    placeholder='[4 - 14]'
                                    required
                                    value={uvc_depth_actual}
                                    onChange={(event) => set_uvc_depth_actual(event.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button
                    type="button"
                    className="btn btn_asLink"
                    onClick={() => {
                        updatePatientCache();
                    }}
                >
                    Notes
                </button>

            </section>
        </>
    );
}

export default DetailsCalculatedPage;
