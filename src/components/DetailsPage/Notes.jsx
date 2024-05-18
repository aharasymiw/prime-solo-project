
function Notes({ notes, set_notes }) {

    return (
        <form className="formPanel">

            <fieldset>
                <legend>Notes</legend>

                <textarea
                    id="notes"
                    name="notes"
                    placeholder="patient notes"
                    value={notes}
                    onChange={(event) => set_notes(event.target.value)}
                />

            </fieldset>

        </form >
    );
}

export default Notes;
