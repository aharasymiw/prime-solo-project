const newPatientReducer = (state = {}, action) => {
    switch (action.type) {
        case 'NEW_PATIENT_SET':
            return action.payload;
        case 'NEW_PATIENT_CLEAR':
            return {};
        case 'NEW_PATIENT_APPEND':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default newPatientReducer;
