import { put, takeLatest } from 'redux-saga/effects';

function* calculateNewPatient(action) {
    const patientInput = action.payload;

    let birth_weight = patientInput.birth_weight;
    let ga_weeks = patientInput.ga_weeks;

    let birth_weight_in_kg = birth_weight / 1000;

    console.log('birth_weight:', birth_weight, '(g)');
    console.log('birth_weight_in_kg:', birth_weight_in_kg, '(kg)');

    let calculatedDataToSave = {
        ...patientInput,
        ett_size_calc: calculateEttSize(birth_weight),
        ett_depth_weight_calc: calculateEttInsertionDepthWeight(birth_weight),
        ett_depth_age_calc: calculateEttInsertionDepthAge(ga_weeks),
        uac_depth_calc: calculateUac(birth_weight_in_kg),
        uvc_depth_calc: calculateUvc(calculateUac(birth_weight_in_kg))
    };

    let calculatedDataToDisplay = {
        iv_id_epi: calculateIvIdEpinephrin(birth_weight_in_kg),
        ett_epi: calculateEttEpinephrin(birth_weight_in_kg),
        mkd: calculateMkd(birth_weight_in_kg)
    };

    yield put({ type: 'NEW_PATIENT_SET', payload: { calculatedDataToSave, calculatedDataToDisplay } });
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

function calculateUac(birth_weight_in_kg) {
    let uac = (birth_weight_in_kg * 3) + 9;
    return uac;
}

function calculateUvc(uac) {
    let uvc = (uac / 2) + 1;
    return uvc;
}


function calculateIvIdEpinephrin(birth_weight_in_kg) {
    let ivid_epi_by_ml_min = Math.round(0.1 * birth_weight_in_kg * 1000) / 1000;
    let ivid_epi_by_ml_max = Math.round(0.3 * birth_weight_in_kg * 1000) / 1000;

    return `${ivid_epi_by_ml_min} - ${ivid_epi_by_ml_max} (mL)`;

};

function calculateEttEpinephrin(birth_weight_in_kg) {

    let ett_epi_by_ml_min = Math.round(0.5 * birth_weight_in_kg * 1000) / 1000;
    let ett_epi_by_ml_max = Math.round(1 * birth_weight_in_kg * 1000) / 1000;

    return `${ett_epi_by_ml_min} - ${ett_epi_by_ml_max} (mL)`;

}

function calculateMkd(birth_weight_in_kg) {
    let mkdSixty = 60 * Math.round(birth_weight_in_kg / 24 * 1000) / 1000;
    let mkdEighty = 80 * Math.round(birth_weight_in_kg / 24 * 1000) / 1000;
    let mkdHundred = 100 * Math.round(birth_weight_in_kg / 24 * 1000) / 1000;

    return { mkdSixty, mkdEighty, mkdHundred };
}

// TODO: 
// Check calculations, I was using Kg, now using g.
// I may need to change the order of magnitude of some
// of the numbers I'm adding or multiplying.
