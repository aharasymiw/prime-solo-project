import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function NotesPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const newPatient = useSelector(store => store.newPatient);

    const [notes, set_notes] = useState(newPatient.notes || '');

    const updatePatient = payload => {

        axios.post('/api/patients/notes/', payload)
            .then(result => {
                console.log('Updated notes for patient:', newPatient.uuid);
            }
            ).catch(error => {
                console.log('Updated patient failed:', error);
            });
    };

    const updatePatientCache = () => {

        let payload = {
            notes: notes
        };

        dispatch({ type: 'NEW_PATIENT_APPEND_CACHE', payload: payload });

        payload.uuid = newPatient.uuid;

        updatePatient(payload);
    };

    const fetchPatientList = () => {

        axios.get('/api/patients/')
            .then(result => {

                let patientList = result.data;
                console.log('patient list:', patientList);

                dispatch({ type: 'PATIENT_LIST_SET_CACHE', payload: patientList });
            }
            ).catch(error => {
                console.log('Retreiving the patient list failed:', error);
            });
    };

    return (
        <>
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
            </form>

            <div>
                <button
                    type="button"
                    className="btn"
                    onClick={() => {
                        updatePatientCache();
                        fetchPatientList();
                        history.push('/summary');
                    }}
                >
                    Save & Summary
                </button>
            </div>

            <div>
                <button
                    type="button"
                    className="btn btn_asLink"
                    onClick={() => {
                        updatePatientCache();
                        dispatch({ type: 'NEW_PATIENT_CLEAR_CACHE' });
                        history.push('/calculator');
                    }}
                >
                    Save & go to new entry
                </button>
            </div>
        </>
    );
}

export default NotesPage;
