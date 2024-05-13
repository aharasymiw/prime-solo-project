import { put, takeLatest } from 'redux-saga/effects';
import { round1, round2 } from '../../fe_utils/fe_utils'

function* newPatientCalculate(action) {
    const patientInput = action.payload;

    let birth_weight = patientInput.birth_weight;
    let ga_weeks = patientInput.ga_weeks;

    let birth_weight_in_kg = birth_weight / 1000;

    let calculatedDataToCache = {
        ...patientInput,
        ett_size_calc: calculateEttSize(birth_weight),
        ett_depth_weight_calc: calculateEttDepthWeight(birth_weight),
        ett_depth_age_calc: calculateEttDepthAge(ga_weeks),
        uac_depth_calc: calculateUac(birth_weight_in_kg),
        uvc_depth_calc: calculateUvc(calculateUac(birth_weight_in_kg)),
        bp_systolic_calc_bottom: calculateBpSystolicBottom(ga_weeks),
        bp_systolic_calc_mid: calculateBpSystolicMid(ga_weeks),
        bp_systolic_calc_top: calculateBpSystolicTop(ga_weeks),
        bp_diastolic_calc_bottom: calculateBpDiastolicBottom(ga_weeks),
        bp_diastolic_calc_mid: calculateBpDiastolicMid(ga_weeks),
        bp_diastolic_calc_top: calculateBpDiastolicTop(ga_weeks),
        map_calc_bottom: calculateMapBottom(ga_weeks),
        map_calc_mid: calculateMapMid(ga_weeks),
        map_calc_top: calculateMapTop(ga_weeks),
        pulse_pressure_calc_bottom: calculatePulsePressureBottom(ga_weeks),
        pulse_pressure_calc_mid: calculatePulsePressureMid(ga_weeks),
        pulse_pressure_calc_top: calculatePulsePressureTop(ga_weeks),
        iv_id_epi: calculateIvIdEpinephrin(birth_weight_in_kg),
        ett_epi: calculateEttEpinephrin(birth_weight_in_kg),
        mkdSixty: calculateMkdSixty(birth_weight_in_kg),
        mkdEighty: calculateMkdEighty(birth_weight_in_kg),
        mkdHundred: calculateMkdHundred(birth_weight_in_kg),
        ns_bolus: calculateNsBolus(birth_weight_in_kg),
        d10_bolus: calculateD10Bolus(birth_weight_in_kg)
    };

    yield put({ type: 'NEW_PATIENT_SET_CACHE', payload: calculatedDataToCache });
}

function* existingPatientCalculate(action) {
    const patientData = action.payload;

    let birth_weight_in_kg = patientData.birth_weight / 1000;

    let savedDataToCache = {
        uuid: patientData.uuid,
        anonymous_id: patientData.anonymous_id,
        birth_weight: patientData.birth_weight,
        ga_weeks: patientData.ga_weeks,
        ga_days: patientData.ga_days,
        ett_size_calc: Number(patientData.ett_size_calc),
        ett_size_actual: Number(patientData.ett_size_actual),
        ett_depth_weight_calc: Number(patientData.ett_depth_weight_calc),
        ett_depth_age_calc: Number(patientData.ett_depth_age_calc),
        ett_depth_actual: Number(patientData.ett_depth_actual),
        uac_depth_calc: Number(patientData.uac_depth_calc),
        uac_depth_actual: Number(patientData.uac_depth_actual),
        uvc_depth_calc: Number(patientData.uvc_depth_calc),
        uvc_depth_actual: Number(patientData.uvc_depth_actual),
        ns_bolus_given: patientData.ns_bolus_given,
        bp_systolic_calc_bottom: patientData.bp_systolic_calc_bottom,
        bp_systolic_calc_mid: patientData.bp_systolic_calc_mid,
        bp_systolic_calc_top: patientData.bp_systolic_calc_top,
        bp_systolic_actual: patientData.bp_systolic_actual,
        bp_diastolic_calc_bottom: patientData.bp_diastolic_calc_bottom,
        bp_diastolic_calc_mid: patientData.bp_diastolic_calc_mid,
        bp_diastolic_calc_top: patientData.bp_diastolic_calc_top,
        bp_diastolic_actual: patientData.bp_diastolic_actual,
        map_calc_bottom: patientData.map_calc_bottom,
        map_calc_mid: patientData.map_calc_mid,
        map_calc_top: patientData.map_calc_top,
        map_actual: patientData.map_actual,
        pulse_pressure_calc_bottom: patientData.pulse_pressure_calc_bottom,
        pulse_pressure_calc_mid: patientData.pulse_pressure_calc_mid,
        pulse_pressure_calc_top: patientData.pulse_pressure_calc_top,
        ns_bolus_qty: patientData.ns_bolus_qty,
        d10_bolus_given: patientData.d10_bolus_given,
        init_blood_glucose: patientData.init_blood_glucose,
        d10_bolus_qty: patientData.d10_bolus_qty,
        notes: patientData.notes,
        iv_id_epi: calculateIvIdEpinephrin(birth_weight_in_kg),
        ett_epi: calculateEttEpinephrin(birth_weight_in_kg),
        mkdSixty: calculateMkdSixty(birth_weight_in_kg),
        mkdEighty: calculateMkdEighty(birth_weight_in_kg),
        mkdHundred: calculateMkdHundred(birth_weight_in_kg),
        ns_bolus: calculateNsBolus(birth_weight_in_kg),
        d10_bolus: calculateD10Bolus(birth_weight_in_kg)
    };

    yield put({ type: 'NEW_PATIENT_SET_CACHE', payload: savedDataToCache });
}


function* newPatientSaga() {
    yield takeLatest('NEW_PATIENT_CALCULATE', newPatientCalculate);
    yield takeLatest('EXISTING_PATIENT_CALCULATE', existingPatientCalculate);

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

function calculateMkdSixty(birth_weight_in_kg) {
    return 60 * birth_weight_in_kg / 24;
}

function calculateMkdEighty(birth_weight_in_kg) {
    return 80 * birth_weight_in_kg / 24;
}

function calculateMkdHundred(birth_weight_in_kg) {
    return 100 * birth_weight_in_kg / 24;
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








function calculateBpSystolicBottom(ga_weeks) {

    let bp_systolic_bottom;

    switch (ga_weeks) {
        case 22:
            bp_systolic_bottom = 22;
            break;
        case 23:
            bp_systolic_bottom = 23;
            break;
        case 24:
            bp_systolic_bottom = 25;
            break;
        case 25:
            bp_systolic_bottom = 26;
            break;
        case 26:
            bp_systolic_bottom = 27;
            break;
        case 27:
            bp_systolic_bottom = 29;
            break;
        case 28:
            bp_systolic_bottom = 31;
            break;
        case 29:
            bp_systolic_bottom = 33;
            break;
        case 30:
            bp_systolic_bottom = 35;
            break;
        case 31:
            bp_systolic_bottom = 36;
            break;
        case 32:
            bp_systolic_bottom = 37;
            break;
        case 33:
            bp_systolic_bottom = 38;
            break;
        case 34:
            bp_systolic_bottom = 40;
            break;
        case 35:
            bp_systolic_bottom = 41;
            break;
        case 36:
            bp_systolic_bottom = 42;
            break;
        case 37:
            bp_systolic_bottom = 44;
            break;
        case 38:
            bp_systolic_bottom = 46;
            break;
        case 39:
            bp_systolic_bottom = 47;
            break;
        case 40:
            bp_systolic_bottom = 48;
            break;
        case 41:
            bp_systolic_bottom = 50;
            break;
        case 42:
            bp_systolic_bottom = 51;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return bp_systolic_bottom;
}

function calculateBpSystolicMid(ga_weeks) {

    let bp_systolic_mid;

    switch (ga_weeks) {
        case 22:
            bp_systolic_mid = 39;
            break;
        case 23:
            bp_systolic_mid = 40;
            break;
        case 24:
            bp_systolic_mid = 42;
            break;
        case 25:
            bp_systolic_mid = 43;
            break;
        case 26:
            bp_systolic_mid = 44;
            break;
        case 27:
            bp_systolic_mid = 45;
            break;
        case 28:
            bp_systolic_mid = 47;
            break;
        case 29:
            bp_systolic_mid = 48;
            break;
        case 30:
            bp_systolic_mid = 50;
            break;
        case 31:
            bp_systolic_mid = 51;
            break;
        case 32:
            bp_systolic_mid = 52;
            break;
        case 33:
            bp_systolic_mid = 53;
            break;
        case 34:
            bp_systolic_mid = 55;
            break;
        case 35:
            bp_systolic_mid = 57;
            break;
        case 36:
            bp_systolic_mid = 59;
            break;
        case 37:
            bp_systolic_mid = 60;
            break;
        case 38:
            bp_systolic_mid = 61;
            break;
        case 39:
            bp_systolic_mid = 62;
            break;
        case 40:
            bp_systolic_mid = 64;
            break;
        case 41:
            bp_systolic_mid = 65;
            break;
        case 42:
            bp_systolic_mid = 67;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return bp_systolic_mid;
}

function calculateBpSystolicTop(ga_weeks) {

    let bp_systolic_top;

    switch (ga_weeks) {
        case 22:
            bp_systolic_top = 55;
            break;
        case 23:
            bp_systolic_top = 56;
            break;
        case 24:
            bp_systolic_top = 57;
            break;
        case 25:
            bp_systolic_top = 58;
            break;
        case 26:
            bp_systolic_top = 60;
            break;
        case 27:
            bp_systolic_top = 61;
            break;
        case 28:
            bp_systolic_top = 63;
            break;
        case 29:
            bp_systolic_top = 64;
            break;
        case 30:
            bp_systolic_top = 66;
            break;
        case 31:
            bp_systolic_top = 68;
            break;
        case 32:
            bp_systolic_top = 69;
            break;
        case 33:
            bp_systolic_top = 70;
            break;
        case 34:
            bp_systolic_top = 71;
            break;
        case 35:
            bp_systolic_top = 73;
            break;
        case 36:
            bp_systolic_top = 75;
            break;
        case 37:
            bp_systolic_top = 76;
            break;
        case 38:
            bp_systolic_top = 77;
            break;
        case 39:
            bp_systolic_top = 79;
            break;
        case 40:
            bp_systolic_top = 81;
            break;
        case 41:
            bp_systolic_top = 82;
            break;
        case 42:
            bp_systolic_top = 84;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return bp_systolic_top;
}













function calculateBpDiastolicBottom(ga_weeks) {

    let bp_diastolic_bottom;

    switch (ga_weeks) {
        case 22:
            bp_diastolic_bottom = 14;
            break;
        case 23:
            bp_diastolic_bottom = 15;
            break;
        case 24:
            bp_diastolic_bottom = 16;
            break;
        case 25:
            bp_diastolic_bottom = 17;
            break;
        case 26:
            bp_diastolic_bottom = 18;
            break;
        case 27:
            bp_diastolic_bottom = 19;
            break;
        case 28:
            bp_diastolic_bottom = 20;
            break;
        case 29:
            bp_diastolic_bottom = 21;
            break;
        case 30:
            bp_diastolic_bottom = 22;
            break;
        case 31:
            bp_diastolic_bottom = 23;
            break;
        case 32:
            bp_diastolic_bottom = 24;
            break;
        case 33:
            bp_diastolic_bottom = 25;
            break;
        case 34:
            bp_diastolic_bottom = 26;
            break;
        case 35:
            bp_diastolic_bottom = 27;
            break;
        case 36:
            bp_diastolic_bottom = 28;
            break;
        case 37:
            bp_diastolic_bottom = 29;
            break;
        case 38:
            bp_diastolic_bottom = 30;
            break;
        case 39:
            bp_diastolic_bottom = 31;
            break;
        case 40:
            bp_diastolic_bottom = 32;
            break;
        case 41:
            bp_diastolic_bottom = 33;
            break;
        case 42:
            bp_diastolic_bottom = 34;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return bp_diastolic_bottom;
}

function calculateBpDiastolicMid(ga_weeks) {

    let bp_diastolic_mid;

    switch (ga_weeks) {
        case 22:
            bp_diastolic_mid = 23;
            break;
        case 23:
            bp_diastolic_mid = 24;
            break;
        case 24:
            bp_diastolic_mid = 25;
            break;
        case 25:
            bp_diastolic_mid = 26;
            break;
        case 26:
            bp_diastolic_mid = 27;
            break;
        case 27:
            bp_diastolic_mid = 28;
            break;
        case 28:
            bp_diastolic_mid = 29;
            break;
        case 29:
            bp_diastolic_mid = 30;
            break;
        case 30:
            bp_diastolic_mid = 31;
            break;
        case 31:
            bp_diastolic_mid = 32;
            break;
        case 32:
            bp_diastolic_mid = 33;
            break;
        case 33:
            bp_diastolic_mid = 34;
            break;
        case 34:
            bp_diastolic_mid = 35;
            break;
        case 35:
            bp_diastolic_mid = 36;
            break;
        case 36:
            bp_diastolic_mid = 37;
            break;
        case 37:
            bp_diastolic_mid = 38;
            break;
        case 38:
            bp_diastolic_mid = 39;
            break;
        case 39:
            bp_diastolic_mid = 40;
            break;
        case 40:
            bp_diastolic_mid = 41;
            break;
        case 41:
            bp_diastolic_mid = 42;
            break;
        case 42:
            bp_diastolic_mid = 43;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return bp_diastolic_mid;
}

function calculateBpDiastolicTop(ga_weeks) {

    let bp_diastolic_top;

    switch (ga_weeks) {
        case 22:
            bp_diastolic_top = 31;
            break;
        case 23:
            bp_diastolic_top = 32;
            break;
        case 24:
            bp_diastolic_top = 33;
            break;
        case 25:
            bp_diastolic_top = 34;
            break;
        case 26:
            bp_diastolic_top = 35;
            break;
        case 27:
            bp_diastolic_top = 36;
            break;
        case 28:
            bp_diastolic_top = 37;
            break;
        case 29:
            bp_diastolic_top = 38;
            break;
        case 30:
            bp_diastolic_top = 39;
            break;
        case 31:
            bp_diastolic_top = 40;
            break;
        case 32:
            bp_diastolic_top = 41;
            break;
        case 33:
            bp_diastolic_top = 42;
            break;
        case 34:
            bp_diastolic_top = 43;
            break;
        case 35:
            bp_diastolic_top = 44;
            break;
        case 36:
            bp_diastolic_top = 45;
            break;
        case 37:
            bp_diastolic_top = 46;
            break;
        case 38:
            bp_diastolic_top = 47;
            break;
        case 39:
            bp_diastolic_top = 48;
            break;
        case 40:
            bp_diastolic_top = 49;
            break;
        case 41:
            bp_diastolic_top = 50;
            break;
        case 42:
            bp_diastolic_top = 51;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return bp_diastolic_top;
}








function calculateMapBottom(ga_weeks) {

    let map_bottom;

    switch (ga_weeks) {
        case 22:
            map_bottom = 17;
            break;
        case 23:
            map_bottom = 18;
            break;
        case 24:
            map_bottom = 19;
            break;
        case 25:
            map_bottom = 20;
            break;
        case 26:
            map_bottom = 21;
            break;
        case 27:
            map_bottom = 22;
            break;
        case 28:
            map_bottom = 24;
            break;
        case 29:
            map_bottom = 25;
            break;
        case 30:
            map_bottom = 26;
            break;
        case 31:
            map_bottom = 27;
            break;
        case 32:
            map_bottom = 28;
            break;
        case 33:
            map_bottom = 29;
            break;
        case 34:
            map_bottom = 31;
            break;
        case 35:
            map_bottom = 32;
            break;
        case 36:
            map_bottom = 33;
            break;
        case 37:
            map_bottom = 34;
            break;
        case 38:
            map_bottom = 35;
            break;
        case 39:
            map_bottom = 36;
            break;
        case 40:
            map_bottom = 37;
            break;
        case 41:
            map_bottom = 39;
            break;
        case 42:
            map_bottom = 40;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return map_bottom;
}

function calculateMapMid(ga_weeks) {

    let map_mid;

    switch (ga_weeks) {
        case 22:
            map_mid = 28;
            break;
        case 23:
            map_mid = 29;
            break;
        case 24:
            map_mid = 31;
            break;
        case 25:
            map_mid = 32;
            break;
        case 26:
            map_mid = 33;
            break;
        case 27:
            map_mid = 34;
            break;
        case 28:
            map_mid = 35;
            break;
        case 29:
            map_mid = 36;
            break;
        case 30:
            map_mid = 37;
            break;
        case 31:
            map_mid = 38;
            break;
        case 32:
            map_mid = 39;
            break;
        case 33:
            map_mid = 40;
            break;
        case 34:
            map_mid = 42;
            break;
        case 35:
            map_mid = 43;
            break;
        case 36:
            map_mid = 44;
            break;
        case 37:
            map_mid = 45;
            break;
        case 38:
            map_mid = 46;
            break;
        case 39:
            map_mid = 47;
            break;
        case 40:
            map_mid = 49;
            break;
        case 41:
            map_mid = 50;
            break;
        case 42:
            map_mid = 51;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return map_mid;
}

function calculateMapTop(ga_weeks) {

    let map_top;

    switch (ga_weeks) {
        case 22:
            map_top = 39;
            break;
        case 23:
            map_top = 40;
            break;
        case 24:
            map_top = 41;
            break;
        case 25:
            map_top = 42;
            break;
        case 26:
            map_top = 43;
            break;
        case 27:
            map_top = 44;
            break;
        case 28:
            map_top = 46;
            break;
        case 29:
            map_top = 47;
            break;
        case 30:
            map_top = 48;
            break;
        case 31:
            map_top = 49;
            break;
        case 32:
            map_top = 50;
            break;
        case 33:
            map_top = 51;
            break;
        case 34:
            map_top = 52;
            break;
        case 35:
            map_top = 54;
            break;
        case 36:
            map_top = 55;
            break;
        case 37:
            map_top = 56;
            break;
        case 38:
            map_top = 57;
            break;
        case 39:
            map_top = 58;
            break;
        case 40:
            map_top = 60;
            break;
        case 41:
            map_top = 61;
            break;
        case 42:
            map_top = 62;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return map_top;
}










function calculatePulsePressureBottom(ga_weeks) {

    let pulse_pressure_bottom;

    switch (ga_weeks) {
        case 22:
            pulse_pressure_bottom = 8;
            break;
        case 23:
            pulse_pressure_bottom = 8;
            break;
        case 24:
            pulse_pressure_bottom = 9;
            break;
        case 25:
            pulse_pressure_bottom = 9;
            break;
        case 26:
            pulse_pressure_bottom = 9;
            break;
        case 27:
            pulse_pressure_bottom = 10;
            break;
        case 28:
            pulse_pressure_bottom = 11;
            break;
        case 29:
            pulse_pressure_bottom = 10;
            break;
        case 30:
            pulse_pressure_bottom = 13;
            break;
        case 31:
            pulse_pressure_bottom = 13;
            break;
        case 32:
            pulse_pressure_bottom = 13;
            break;
        case 33:
            pulse_pressure_bottom = 13;
            break;
        case 34:
            pulse_pressure_bottom = 14;
            break;
        case 35:
            pulse_pressure_bottom = 14;
            break;
        case 36:
            pulse_pressure_bottom = 14;
            break;
        case 37:
            pulse_pressure_bottom = 15;
            break;
        case 38:
            pulse_pressure_bottom = 16;
            break;
        case 39:
            pulse_pressure_bottom = 16;
            break;
        case 40:
            pulse_pressure_bottom = 16;
            break;
        case 41:
            pulse_pressure_bottom = 17;
            break;
        case 42:
            pulse_pressure_bottom = 17;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return pulse_pressure_bottom;
}

function calculatePulsePressureMid(ga_weeks) {

    let pulse_pressure_mid;

    switch (ga_weeks) {
        case 22:
            pulse_pressure_mid = 16;
            break;
        case 23:
            pulse_pressure_mid = 16;
            break;
        case 24:
            pulse_pressure_mid = 17;
            break;
        case 25:
            pulse_pressure_mid = 17;
            break;
        case 26:
            pulse_pressure_mid = 17;
            break;
        case 27:
            pulse_pressure_mid = 17;
            break;
        case 28:
            pulse_pressure_mid = 18;
            break;
        case 29:
            pulse_pressure_mid = 18;
            break;
        case 30:
            pulse_pressure_mid = 19;
            break;
        case 31:
            pulse_pressure_mid = 19;
            break;
        case 32:
            pulse_pressure_mid = 19;
            break;
        case 33:
            pulse_pressure_mid = 19;
            break;
        case 34:
            pulse_pressure_mid = 20;
            break;
        case 35:
            pulse_pressure_mid = 21;
            break;
        case 36:
            pulse_pressure_mid = 22;
            break;
        case 37:
            pulse_pressure_mid = 22;
            break;
        case 38:
            pulse_pressure_mid = 22;
            break;
        case 39:
            pulse_pressure_mid = 22;
            break;
        case 40:
            pulse_pressure_mid = 23;
            break;
        case 41:
            pulse_pressure_mid = 23;
            break;
        case 42:
            pulse_pressure_mid = 24;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return pulse_pressure_mid;
}

function calculatePulsePressureTop(ga_weeks) {

    let pulse_pressure_top;

    switch (ga_weeks) {
        case 22:
            pulse_pressure_top = 24;
            break;
        case 23:
            pulse_pressure_top = 24;
            break;
        case 24:
            pulse_pressure_top = 24;
            break;
        case 25:
            pulse_pressure_top = 24;
            break;
        case 26:
            pulse_pressure_top = 25;
            break;
        case 27:
            pulse_pressure_top = 25;
            break;
        case 28:
            pulse_pressure_top = 26;
            break;
        case 29:
            pulse_pressure_top = 26;
            break;
        case 30:
            pulse_pressure_top = 27;
            break;
        case 31:
            pulse_pressure_top = 28;
            break;
        case 32:
            pulse_pressure_top = 28;
            break;
        case 33:
            pulse_pressure_top = 28;
            break;
        case 34:
            pulse_pressure_top = 28;
            break;
        case 35:
            pulse_pressure_top = 29;
            break;
        case 36:
            pulse_pressure_top = 30;
            break;
        case 37:
            pulse_pressure_top = 30;
            break;
        case 38:
            pulse_pressure_top = 30;
            break;
        case 39:
            pulse_pressure_top = 31;
            break;
        case 40:
            pulse_pressure_top = 32;
            break;
        case 41:
            pulse_pressure_top = 32;
            break;
        case 42:
            pulse_pressure_top = 32;
            break;
        default:
            alert("Something went wrong, the ga weeks you entered don't make sense.");
    }

    return pulse_pressure_top;
}
