import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { round1, round2 } from '../../utils/utils'

function* newPatientCalculate(action) {
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
        uvc_depth_calc: calculateUvc(calculateUac(birth_weight_in_kg)),
        bp_systolic: calculateBpSystolic(ga_weeks),
        bp_diastolic: calculateBpDiastolic(ga_weeks),
        map: calculateMap(ga_weeks)
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

function* newPatientSave(action) {
    try {
        yield axios.post('/api/patient/', action.payload);
    } catch (error) {
        console.log('Error saving the patient:', error);
        yield put({ type: 'PATIENT_SAVE_FAILED' });
    }
}

function* newPatientSaga() {
    yield takeLatest('NEW_PATIENT_CALCULATE', newPatientCalculate);
    yield takeLatest('NEW_PATIENT_SAVE', newPatientSave);
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

function calculateBpSystolic(ga_weeks) {

    let bp_systolic;

    switch (ga_weeks) {
        case 22:
            bp_systolic = 22;
            break;
        case 23:
            bp_systolic = 23;
            break;
        case 24:
            bp_systolic = 25;
            break;
        case 25:
            bp_systolic = 26;
            break;
        case 26:
            bp_systolic = 27;
            break;
        case 27:
            bp_systolic = 29;
            break;
        case 28:
            bp_systolic = 31;
            break;
        case 29:
            bp_systolic = 33;
            break;
        case 30:
            bp_systolic = 35;
            break;
        case 31:
            bp_systolic = 36;
            break;
        case 32:
            bp_systolic = 37;
            break;
        case 33:
            bp_systolic = 38;
            break;
        case 34:
            bp_systolic = 40;
            break;
        case 35:
            bp_systolic = 41;
            break;
        case 36:
            bp_systolic = 42;
            break;
        case 37:
            bp_systolic = 44;
            break;
        case 38:
            bp_systolic = 46;
            break;
        case 39:
            bp_systolic = 47;
            break;
        case 40:
            bp_systolic = 48;
            break;
        case 41:
            bp_systolic = 50;
            break;
        case 42:
            bp_systolic = 51;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return bp_systolic;
}

function calculateBpDiastolic(ga_weeks) {

    let bp_diastolic;

    switch (ga_weeks) {
        case 22:
            bp_diastolic = 14;
            break;
        case 23:
            bp_diastolic = 15;
            break;
        case 24:
            bp_diastolic = 16;
            break;
        case 25:
            bp_diastolic = 17;
            break;
        case 26:
            bp_diastolic = 18;
            break;
        case 27:
            bp_diastolic = 19;
            break;
        case 28:
            bp_diastolic = 20;
            break;
        case 29:
            bp_diastolic = 21;
            break;
        case 30:
            bp_diastolic = 22;
            break;
        case 31:
            bp_diastolic = 23;
            break;
        case 32:
            bp_diastolic = 24;
            break;
        case 33:
            bp_diastolic = 25;
            break;
        case 34:
            bp_diastolic = 26;
            break;
        case 35:
            bp_diastolic = 27;
            break;
        case 36:
            bp_diastolic = 28;
            break;
        case 37:
            bp_diastolic = 29;
            break;
        case 38:
            bp_diastolic = 30;
            break;
        case 39:
            bp_diastolic = 31;
            break;
        case 40:
            bp_diastolic = 32;
            break;
        case 41:
            bp_diastolic = 33;
            break;
        case 42:
            bp_diastolic = 34;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return bp_diastolic;
}

function calculateMap(ga_weeks) {

    let map;

    switch (ga_weeks) {
        case 22:
            map = 17;
            break;
        case 23:
            map = 18;
            break;
        case 24:
            map = 19;
            break;
        case 25:
            map = 20;
            break;
        case 26:
            map = 21;
            break;
        case 27:
            map = 22;
            break;
        case 28:
            map = 24;
            break;
        case 29:
            map = 25;
            break;
        case 30:
            map = 26;
            break;
        case 31:
            map = 27;
            break;
        case 32:
            map = 28;
            break;
        case 33:
            map = 29;
            break;
        case 34:
            map = 31;
            break;
        case 35:
            map = 32;
            break;
        case 36:
            map = 33;
            break;
        case 37:
            map = 34;
            break;
        case 38:
            map = 35;
            break;
        case 39:
            map = 36;
            break;
        case 40:
            map = 37;
            break;
        case 41:
            map = 39;
            break;
        case 42:
            map = 40;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return map;
}
