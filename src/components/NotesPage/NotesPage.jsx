import { useState } from 'react';

function NotesPage() {

    const [note, set_note] = useState('');

    function saveNote() {
        console.log("the note is:", note);
    }

    return (

        <form className="formPanel" onSubmit={saveNote}>

            <fieldset>
                <legend>Notes</legend>

                <textarea
                    id="notes"
                    name="notes"
                    value={note}
                    onChange={(event) => set_note(event.target.value)}
                />

            </fieldset>

            <div>
                <input className="btn" type="submit" value="Save & New Entry" />
                <input className="btn" type="submit" value="Save & View Summary" />
            </div>

        </form>
    )

}

export default NotesPage;
