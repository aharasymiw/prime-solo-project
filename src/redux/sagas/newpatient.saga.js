import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { round1, round2 } from '../../utils/utils'

function* calculateNewPatient(action) {
    const patientInput = action.payload;

    let birth_weight = patientInput.birth_weight;
    let ga_weeks = patientInput.ga_weeks;

    let birth_weight_in_kg = birth_weight / 1000;

    let calculatedDataToSave = {
        ...patientInput,
        ett_size_calc: calculateEttSize(birth_weight),
        ett_depth_weight_calc: calculateEttDepthWeight(birth_weight),
        ett_depth_age_calc: calculateEttDepthAge(ga_weeks),
        uac_depth_calc: calculateUac(birth_weight_in_kg),
        uvc_depth_calc: calculateUvc(calculateUac(birth_weight_in_kg))
    };

    let calculatedDataToDisplay = {
        iv_id_epi: calculateIvIdEpinephrin(birth_weight_in_kg),
        ett_epi: calculateEttEpinephrin(birth_weight_in_kg),
        mkd: calculateMkd(birth_weight_in_kg),
        ns_bolus: calculateNsBolus(birth_weight_in_kg),
        d10_bolus: calculateD10Bolus(birth_weight_in_kg)
    };

    yield put({ type: 'NEW_PATIENT_SET', payload: { calculatedDataToSave, calculatedDataToDisplay } });
}

function* saveNewPatient(action) {
    try {
        yield axios.post('/api/patient/', action.payload);
    } catch (error) {
        console.log('Error saving the patient:', error);
        yield put({ type: 'PATIENT_SAVE_FAILED' });
    }
}

function* newPatientSaga() {
    yield takeLatest('NEW_PATIENT_CALCULATE', calculateNewPatient);
    yield takeLatest('NEW_PATIENT_SAVE', saveNewPatient);
}

export default newPatientSaga;

function calculateEttSize(birth_weight) {
    let ettSize;

    if (birth_weight >= 2000) {
        ettSize = 3.5;
    } else if (birth_weight >= 1000) {
        ettSize = 3.0;
    } else {
        ettSize = 2.5;
    }

    return ettSize;
}

function calculateEttDepthWeight(birth_weight) {
    let ettInsertion;

    if (birth_weight >= 4200) {
        ettInsertion = 10.0;
    } else if (birth_weight >= 3200) {
        ettInsertion = 9.0;
    } else if (birth_weight >= 2500) {
        ettInsertion = 8.5;
    } else if (birth_weight >= 1900) {
        ettInsertion = 8.0;
    } else if (birth_weight >= 1500) {
        ettInsertion = 7.5;
    } else if (birth_weight >= 1000) {
        ettInsertion = 7.0;
    } else if (birth_weight >= 900) {
        ettInsertion = 6.5;
    } else if (birth_weight >= 700) {
        ettInsertion = 6.0;
    } else if (birth_weight >= 500) {
        ettInsertion = 5.5;
    } else {
        ettInsertion = 5.5;
    }

    return ettInsertion;
}

function calculateEttDepthAge(ga_weeks) {
    let ettInsertion;

    if (ga_weeks >= 41) {
        ettInsertion = 9.0;
    } else if (ga_weeks >= 38) {
        ettInsertion = 8.5;
    } else if (ga_weeks >= 35) {
        ettInsertion = 8.0;
    } else if (ga_weeks >= 33) {
        ettInsertion = 7.5;
    } else if (ga_weeks >= 30) {
        ettInsertion = 7.0;
    } else if (ga_weeks >= 27) {
        ettInsertion = 6.5;
    } else if (ga_weeks >= 25) {
        ettInsertion = 6.0;
    } else if (ga_weeks >= 23) {
        ettInsertion = 5.5;
    }

    return ettInsertion;
}

function calculateUac(birth_weight_in_kg) {
    let uac = birth_weight_in_kg * 3 + 9;
    return uac;
}

function calculateUvc(uac) {
    let uvc = (uac / 2) + 1;
    return uvc;
}


function calculateIvIdEpinephrin(birth_weight_in_kg) {
    let ividEpiMin = 0.1 * birth_weight_in_kg;
    let ividEpiMinRounded = round2(ividEpiMin);

    let ividEpiMax = 0.3 * birth_weight_in_kg;
    let ividEpiMaxRounded = round2(ividEpiMax);

    return `${ividEpiMinRounded} - ${ividEpiMaxRounded} mL`;

};

function calculateEttEpinephrin(birth_weight_in_kg) {

    let ettEpiMin = 0.5 * birth_weight_in_kg;
    let ettEpiMinRounded = round2(ettEpiMin);

    let ettEpiMax = 1 * birth_weight_in_kg;
    let ettEpiMaxRounded = round2(ettEpiMax);

    return `${ettEpiMinRounded} - ${ettEpiMaxRounded} mL`;

}

function calculateMkd(birth_weight_in_kg) {
    let mkdSixty = 60 * birth_weight_in_kg / 24;
    let mkdEighty = 80 * birth_weight_in_kg / 24;
    let mkdHundred = 100 * birth_weight_in_kg / 24;

    return { mkdSixty, mkdEighty, mkdHundred };
}

function calculateNsBolus(birth_weight_in_kg) {
    let nsBolusMin = 10 * birth_weight_in_kg;
    let nsBolusMinRounded = Math.round(nsBolusMin);

    let nsBolusMax = 20 * birth_weight_in_kg;
    let nsBolusMaxRounded = Math.round(nsBolusMax);

    return `${nsBolusMinRounded} - ${nsBolusMaxRounded} mL`;
}

function calculateD10Bolus(birth_weight_in_kg) {

    let d10BolusMin = 2 * birth_weight_in_kg;
    let d10BolusMinRounded = round1(d10BolusMin);

    let d10BolusMax = 4 * birth_weight_in_kg;
    let d10BolusMaxRounded = round1(d10BolusMax);

    return `${d10BolusMinRounded} - ${d10BolusMaxRounded} mL`;
}


// TODO: 
// Check calculations, I was using Kg, now using g.
// I may need to change the order of magnitude of some
// of the numbers I'm adding or multiplying.

