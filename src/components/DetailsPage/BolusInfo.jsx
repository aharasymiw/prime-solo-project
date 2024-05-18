
function BolusInfo({ ns_bolus_given, set_ns_bolus_given, bp_systolic_actual, set_bp_systolic_actual, bp_diastolic_actual, set_bp_diastolic_actual, map_actual, set_map_actual, ns_bolus_qty, set_ns_bolus_qty, d10_bolus_given, set_d10_bolus_given, init_blood_glucose, set_init_blood_glucose, d10_bolus_qty, set_d10_bolus_qty }) {

    return (
        <form className="formPanel">

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
                                name="bp_systolic_actual"
                                min='20'
                                max='150'
                                placeholder='Systolic [20 - 150]'
                                value={bp_systolic_actual}
                                onChange={(event) => set_bp_systolic_actual(event.target.value)}
                            />

                            <input
                                type="number"
                                name="bp_diastolic_actual"
                                min='0'
                                max='100'
                                placeholder='Diastolic [0 - 100]'
                                value={bp_diastolic_actual}
                                onChange={(event) => set_bp_diastolic_actual(event.target.value)}
                            />
                        </ fieldset>

                        <fieldset>
                            <legend>MAP (mmHg)</legend>

                            <input
                                type="number"
                                name="map_actual"
                                min='0'
                                max='100'
                                placeholder='[0 - 100]'
                                value={map_actual}
                                onChange={(event) => set_map_actual(event.target.value)}
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
                                value={ns_bolus_qty}
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
                                value={init_blood_glucose}
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
                                value={d10_bolus_qty}
                                onChange={(event) => set_d10_bolus_qty(event.target.value)}
                            />
                        </ fieldset>

                    </section>
                }
            </fieldset>

        </form>
    );
}

export default BolusInfo;
