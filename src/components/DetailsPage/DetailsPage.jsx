import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import ActualValues from './ActualValues';
import BolusInfo from './BolusInfo';
import Notes from './Notes';


function DetailsPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const newPatient = useSelector(store => store.newPatient);
    const patient_uuid = newPatient.uuid;

    // Actual values variables
    const [anonymous_id, set_anonymous_id] = useState(newPatient.anonymous_id);
    const [ett_size_actual, set_ett_size_actual] = useState(newPatient.ett_size_actual || newPatient.ett_size_calc);
    const [ett_depth_actual, set_ett_depth_actual] = useState(newPatient.ett_depth_actual || newPatient.ett_depth_weight_calc);
    const [uac_depth_actual, set_uac_depth_actual] = useState(newPatient.uac_depth_actual || newPatient.uac_depth_calc);
    const [uvc_depth_actual, set_uvc_depth_actual] = useState(newPatient.uvc_depth_actual || newPatient.uvc_depth_calc);

    // Bolus variables
    const [ns_bolus_given, set_ns_bolus_given] = useState(newPatient.ns_bolus_given || false);
    const [bp_systolic_actual, set_bp_systolic_actual] = useState(newPatient.bp_systolic_actual || '');
    const [bp_diastolic_actual, set_bp_diastolic_actual] = useState(newPatient.bp_diastolic_actual || '');
    const [map_actual, set_map_actual] = useState(newPatient.map_actual || '');
    const [ns_bolus_qty, set_ns_bolus_qty] = useState(newPatient.ns_bolus_qty || '');
    const [d10_bolus_given, set_d10_bolus_given] = useState(newPatient.d10_bolus_given || false);
    const [init_blood_glucose, set_init_blood_glucose] = useState(newPatient.init_blood_glucose || '');
    const [d10_bolus_qty, set_d10_bolus_qty] = useState(newPatient.d10_bolus_qty || '');

    // Notes variables
    const [notes, set_notes] = useState(newPatient.notes || '');

    const saveActuals = (actuals_payload) => {
        actuals_payload.patient_uuid = patient_uuid;

        axios.post('/api/patients/actuals/', actuals_payload)
            .then(result => {
                console.log('Updated actuals info for patient:', patient_uuid);
            }
            ).catch(error => {
                console.log('Updating patient actuals failed:', error);
            });
    }

    const saveBolus = (bolus_payload) => {
        bolus_payload.patient_uuid = patient_uuid;

        axios.post('/api/patients/boluses/', bolus_payload)
            .then(result => {
                console.log('Updated bolus info for patient:', patient_uuid);
            }
            ).catch(error => {
                console.log('Updating patient bolus failed:', error);
            });
    }

    const saveNotes = (notes_payload) => {
        notes_payload.patient_uuid = patient_uuid;

        axios.post('/api/patients/notes/', notes_payload)
            .then(result => {
                console.log('Updated notes for patient:', patient_uuid);
            }
            ).catch(error => {
                console.log('Updating patient notes failed:', error);
            });
    }

    const savePatient = (actuals_payload, bolus_payload, notes_payload) => {
        saveActuals(actuals_payload);
        saveBolus(bolus_payload);
        saveNotes(notes_payload);
    };

    const updatePatientCache = () => {

        let actuals_payload = {
            anonymous_id,
            ett_size_actual: Number(ett_size_actual),
            ett_depth_actual: Number(ett_depth_actual),
            uac_depth_actual: Number(uac_depth_actual),
            uvc_depth_actual: Number(uvc_depth_actual),
        };

        dispatch({ type: 'NEW_PATIENT_APPEND_CACHE', payload: actuals_payload });

        // If NS Bolus Given is unchecked, clear out the details
        if (!ns_bolus_given) {
            set_bp_systolic_actual(0);
            set_bp_systolic_actual(0);
            set_bp_diastolic_actual(0);
            set_map_actual(0);
            set_ns_bolus_qty(0);
        };

        // If D10 Bolus Given is unchecked, clear out the details
        if (!d10_bolus_given) {
            set_init_blood_glucose(0);
            set_d10_bolus_qty(0);
        };

        let bolus_payload = {
            ns_bolus_given,
            bp_systolic_actual: Number(bp_systolic_actual),
            bp_diastolic_actual: Number(bp_diastolic_actual),
            map_actual: Number(map_actual),
            ns_bolus_qty: Number(ns_bolus_qty),
            d10_bolus_given: d10_bolus_given,
            init_blood_glucose: Number(init_blood_glucose),
            d10_bolus_qty: Number(d10_bolus_qty)
        }
        dispatch({ type: 'NEW_PATIENT_APPEND_CACHE', payload: bolus_payload });

        let notes_payload = { notes };
        dispatch({ type: 'NEW_PATIENT_APPEND_CACHE', payload: notes_payload });

        savePatient(actuals_payload, bolus_payload, notes_payload);
    };

    const fetchPatientList = () => {
        axios.get('/api/patients/')
            .then(result => {
                let patientList = result.data;
                dispatch({ type: 'PATIENT_LIST_SET_CACHE', payload: patientList });
            }
            ).catch(error => {
                console.log('Retreiving the patient list failed:', error);
            });
    };

    return (
        <>
            <ActualValues anonymous_id={anonymous_id} set_anonymous_id={set_anonymous_id} ett_size_actual={ett_size_actual} set_ett_size_actual={set_ett_size_actual} ett_depth_actual={ett_depth_actual} set_ett_depth_actual={set_ett_depth_actual} uac_depth_actual={uac_depth_actual} set_uac_depth_actual={set_uac_depth_actual} uvc_depth_actual={uvc_depth_actual} set_uvc_depth_actual={set_uvc_depth_actual} />
            <BolusInfo ns_bolus_given={ns_bolus_given} set_ns_bolus_given={set_ns_bolus_given} bp_systolic_actual={bp_systolic_actual} set_bp_systolic_actual={set_bp_systolic_actual} bp_diastolic_actual={bp_diastolic_actual} set_bp_diastolic_actual={set_bp_diastolic_actual} map_actual={map_actual} set_map_actual={set_map_actual} ns_bolus_qty={ns_bolus_qty} set_ns_bolus_qty={set_ns_bolus_qty} d10_bolus_given={d10_bolus_given} set_d10_bolus_given={set_d10_bolus_given} init_blood_glucose={init_blood_glucose} set_init_blood_glucose={set_init_blood_glucose} d10_bolus_qty={d10_bolus_qty} set_d10_bolus_qty={set_d10_bolus_qty} />
            <Notes notes={notes} set_notes={set_notes} />

            <button
                className="btn"
                type="button"
                onClick={() => {
                    updatePatientCache();
                    fetchPatientList();
                    history.push('/summary');
                }}
            >Save & Summary</button>

            <button
                className="btn"
                type="button"
                onClick={() => {
                    updatePatientCache();
                    dispatch({ type: 'NEW_PATIENT_CLEAR_CACHE' });
                    history.push('/calculator');
                }}
            >Save & New</button>
        </>
    );
}

export default DetailsPage;
