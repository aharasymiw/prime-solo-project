import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function BolusPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    // Fill these in with ui inputs
    const [ns_bolus_given, set_ns_bolus_given] = useState(false);
    const [bp_systolic, set_bp_systolic] = useState(0);
    const [bp_diastolic, set_bp_diastolic] = useState(0);
    const [map, set_map] = useState(0);
    const [ns_bolus_qty, set_ns_bolus_qty] = useState(0);
    const [d10_bolus_given, set_d10_bolus_given] = useState(false);
    const [init_blood_glucose, set_init_blood_glucose] = useState(0);
    const [d10_bolus_qty, set_d10_bolus_qty] = useState(0);

    const updatePatient = (event) => { // terrible name, but collect the inputs and send them where they need to go and update history to next view
        event.preventDefault();

        let payload = {
            ns_bolus_given,
            bp_systolic: Number(bp_systolic),
            bp_diastolic: Number(bp_diastolic),
            map: Number(map),
            ns_bolus_qty: Number(ns_bolus_qty),
            d10_bolus_given: d10_bolus_given,
            init_blood_glucose: Number(init_blood_glucose),
            d10_bolus_qty: Number(d10_bolus_qty)
        };

        // This is a placeholder, need to actually do the data stuff.
        dispatch({
            type: 'NEW_PATIENT_APPEND',
            payload: payload
        });

        history.push('/notes');

    };

    return (
        <form className="formPanel" onSubmit={updatePatient}>

            <fieldset>
                <legend>NS Bolus</legend>

                <fieldset>
                    <legend>NS Bolus Given? (check for yes)</legend>

                    <input
                        type="checkbox"
                        id="ns_bolus_given"
                        name="ns_bolus_given"
                        checked={ns_bolus_given}
                        onChange={() => set_ns_bolus_given(!ns_bolus_given)}
                    />
                </fieldset>

                {ns_bolus_given &&
                    <section>

                        <fieldset>
                            <legend>Blood Pressure (mmHg)</legend>

                            <input
                                type="number"
                                name="bp_systolic"
                                min='20'
                                max='150'
                                placeholder='Systolic [20 - 150]'
                                required
                                onChange={(event) => set_bp_systolic(event.target.value)}
                            />

                            <input
                                type="number"
                                name="bp_diastolic"
                                min='0'
                                max='100'
                                placeholder='Diastolic [0 - 100]'
                                required
                                onChange={(event) => set_bp_diastolic(event.target.value)}
                            />
                        </ fieldset>

                        <fieldset>
                            <legend>MAP (mmHg)</legend>

                            <input
                                type="number"
                                name="map"
                                min='0'
                                max='100'
                                placeholder='[0 - 100]'
                                required
                                onChange={(event) => set_map(event.target.value)}
                            />
                        </ fieldset>

                        <fieldset>
                            <legend>Amount given (mL/kg)</legend>

                            <input
                                type="number"
                                name="ns_bolus_qty"
                                min='0'
                                max='100'
                                placeholder='[0 - 100]'
                                required
                                onChange={(event) => set_ns_bolus_qty(event.target.value)}
                            />
                        </ fieldset>

                    </section>
                }

            </fieldset>


            <fieldset>
                <legend>D10 Bolus</legend>

                <fieldset>
                    <legend>D10 Bolus Given? (check for yes)</legend>

                    <input
                        type="checkbox"
                        id="d10_bolus_given"
                        name="d10_bolus_given"
                        checked={d10_bolus_given}
                        onChange={() => set_d10_bolus_given(!d10_bolus_given)}
                    />
                </fieldset>

                {d10_bolus_given &&
                    <section>

                        <fieldset>
                            <legend>Init Blood Glucose (mg/dL)</legend>

                            <input
                                type="number"
                                name="init_blood_glucose"
                                min='0'
                                max='200'
                                placeholder='[0 - 200]'
                                required
                                onChange={(event) => set_init_blood_glucose(event.target.value)}
                            />
                        </ fieldset>

                        <fieldset>
                            <legend>Amount given (mL/kg)</legend>

                            <input
                                type="number"
                                name="d10_bolus_qty"
                                min='0'
                                max='100'
                                placeholder='[0 - 100]'
                                required
                                onChange={(event) => set_d10_bolus_qty(event.target.value)}
                            />
                        </ fieldset>

                    </section>
                }
            </fieldset>

            <div>
                <input className="btn" type="submit" value="Add Notes" />
            </div>

        </form>

    );
}

export default BolusPage;
