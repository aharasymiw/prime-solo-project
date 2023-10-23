import { useState } from 'react';
import { useDispatch } from 'react-redux';

function CalculatorForm() {
    const dispatch = useDispatch();

    const [birth_weight, set_birth_weight] = useState(0);
    const [ga_weeks, set_ga_weeks] = useState(0);
    const [ga_days, set_ga_days] = useState(0);

    const calculate = (event) => {
        event.preventDefault();

        let payload = {
            birth_weight: Number(birth_weight),
            ga_weeks: Number(ga_weeks),
            ga_days: Number(ga_days)
        };

        dispatch({
            type: 'NEW_PATIENT_CALCULATE',
            payload: payload
        });
    };


    return (
        <form className="formPanel" onSubmit={calculate}>

            <fieldset>
                <legend>Birth Weight (g)</legend>
                <input
                    type="number"
                    name="birth_weight"
                    min='500'
                    max='4200'
                    placeholder='Grams (500 - 4200)'
                    required
                    onChange={(event) => set_birth_weight(event.target.value)}
                />
            </fieldset>

            <fieldset>
                <legend>Gestational Age</legend>

                <input
                    type="number"
                    name="ga_weeks"
                    min='21'
                    max='44'
                    placeholder='Weeks (21 - 44)'
                    required
                    onChange={(event) => set_ga_weeks(event.target.value)}
                />

                <input
                    type="number"
                    name="ga_days"
                    min='0'
                    max='6'
                    placeholder='Days (0 - 6)'
                    onChange={(event) => set_ga_days(event.target.value)}
                />
            </fieldset>

            <div>
                <input className="btn" type="submit" value="Calculate" />
            </div>

        </form>
    );
}

export default CalculatorForm;
