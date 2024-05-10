const newPatientReducer = (state = {}, action) => {
    switch (action.type) {
        case 'NEW_PATIENT_SET_CACHE':
            return action.payload;
        case 'NEW_PATIENT_CLEAR_CACHE':
            return {};
        case 'NEW_PATIENT_APPEND_CACHE':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default newPatientReducer;
