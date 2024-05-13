import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Notes({ notes, set_notes }) {

    const newPatient = useSelector(store => store.newPatient);

    useEffect(() => {
        newPatient.notes && set_notes(newPatient.notes);
    }, [newPatient]);


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
