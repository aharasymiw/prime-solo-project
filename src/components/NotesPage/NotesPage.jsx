import { useState } from 'react';
import { useDispatch } from 'react-redux';

function NotesPage() {

    const dispatch = useDispatch();

    const [notes, set_notes] = useState('');

    const saveNote = newRoute => {
        dispatch({ type: 'NEW_PATIENT_SAVE', payload: notes });
        history.push(newRoute);
    }

    return (
        <>
            <form className="formPanel" onSubmit={saveNote}>

                <fieldset>
                    <legend>Notes</legend>

                    <textarea
                        id="notes"
                        name="notes"
                        value={notes}
                        onChange={(event) => set_notes(event.target.value)}
                    />

                </fieldset>
            </form>

            <div>
                <button
                    type="button"
                    className="btn btn_asLink"
                    onClick={() => {
                        saveNote('/summary');
                    }}
                >
                    Save & Summary
                </button>

                <button
                    type="button"
                    className="btn btn_asLink"
                    onClick={() => {
                        saveNote('/calculator');
                    }}
                >
                    Save & New
                </button>
            </div>
        </>
    )

}

export default NotesPage;
