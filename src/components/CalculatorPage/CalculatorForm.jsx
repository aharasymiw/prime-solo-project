import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CalculatorForm() {

    const newPatient = useSelector(store => store.newPatient);

    const dispatch = useDispatch();

    const [birth_weight, set_birth_weight] = useState(newPatient.birth_weight || '');
    const [ga_weeks, set_ga_weeks] = useState(newPatient.ga_weeks || '');
    const [ga_days, set_ga_days] = useState(newPatient.ga_days || '');

    useEffect(() => {
        newPatient.birth_weight && set_birth_weight(newPatient.birth_weight);
        newPatient.ga_weeks && set_ga_weeks(newPatient.ga_weeks);
        newPatient.ga_days && set_ga_days(newPatient.ga_days);
    }, [newPatient]);


    const calculate = (event) => {
        event.preventDefault();

        let payload = {
            birth_weight: Number(birth_weight),
            ga_weeks: Number(ga_weeks),
            ga_days: Number(ga_days) || 0
        };

        dispatch({
            type: 'NEW_PATIENT_CLEAR_CACHE',
        });
        dispatch({
            type: 'NEW_PATIENT_CALCULATE',
            payload: payload
        });
    };

    const reset = (event) => {
        event.preventDefault();

        dispatch({ type: 'NEW_PATIENT_CLEAR_CACHE' });

        set_birth_weight('');
        set_ga_weeks('');
        set_ga_days('');
    };


    return (
        <form className="formPanel" onSubmit={calculate} onReset={reset}>

            <fieldset>
                <legend>Birth Weight (g)</legend>
                <input
                    type="number"
                    name="birth_weight"
                    min='300'
                    max='5000'
                    placeholder='[300 - 5000]'
                    required
                    value={birth_weight}
                    onChange={(event) => set_birth_weight(event.target.value)}
                />
            </fieldset>

            <fieldset>
                <legend>Gestational Age</legend>

                <input
                    type="number"
                    name="ga_weeks"
                    min='23'
                    max='42'
                    placeholder='Weeks [23 - 42]'
                    required
                    value={ga_weeks}
                    onChange={(event) => set_ga_weeks(event.target.value)}
                />

                <input
                    type="number"
                    name="ga_days"
                    min='0'
                    max='6'
                    placeholder='Days [0 - 6]'
                    value={ga_days}
                    onChange={(event) => set_ga_days(event.target.value)}
                />
            </fieldset>

            <div>
                <input className="btn" type="submit" value="Calculate" />
                <input className="btn" type="reset" value="Clear" />
            </div>

        </form>
    );
}

export default CalculatorForm;
