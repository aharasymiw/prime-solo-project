function BolusPage() {
    return (
        <form className="formPanel" onSubmit={calculate}>

            <fieldset>
                <legend>NS Bolus</legend>
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
                <legend>D10 Bolus</legend>

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

export default BolusPage;
