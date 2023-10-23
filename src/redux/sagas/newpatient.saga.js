import { put, takeLatest } from 'redux-saga/effects';

function* calculateNewPatient(action) {
    const newPatient = action.payload;

    let birth_weight = newPatient.birth_weight;
    let ga_weeks = newPatient.ga_weeks;


    let ett_size_calc = calculateEttSize(birth_weight);
    let ett_depth_weight_calc = calculateEttInsertionDepthWeight(birth_weight);
    let ett_depth_age_calc = calculateEttInsertionDepthAge(ga_weeks);
    let uac_depth_calc = calculateUac(birth_weight);
    let uvc_depth_calc = calculateUvc(uac_depth_calc);

    let thing = { ...newPatient, ett_size_calc, ett_depth_weight_calc, ett_depth_age_calc, uac_depth_calc, uvc_depth_calc };
    console.log("thing: ", thing);
    yield put({ type: 'NEW_PATIENT_SET', payload: { ...newPatient, ett_size_calc, ett_depth_weight_calc, ett_depth_age_calc, uac_depth_calc, uvc_depth_calc } });
}

function* newPatientSaga() {
    yield takeLatest('NEW_PATIENT_CALCULATE', calculateNewPatient);
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

function calculateEttInsertionDepthWeight(birth_weight) {
    let ettInsertion;

    if (birth_weight >= 3200) {
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
    }

    return ettInsertion;
}

function calculateEttInsertionDepthAge(ga_weeks) {
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

function calculateUac(birth_weight) {
    let uac = (birth_weight * 3) + 9;
    return uac;
}

function calculateUvc(uac) {
    let uvc = (uac / 2) + 1;
    return uvc;
}

// TODO: 
// Check calculations, I was using Kg, now using g.
// I may need to change the order of magnitude of some
// of the numbers I'm adding or multiplying.
