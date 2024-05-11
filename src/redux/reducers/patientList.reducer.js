const patientListReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PATIENT_LIST_SET_CACHE':
      return action.payload;
    case 'PATIENT_LIST_CLEAR_CACHE':
      return {};
    case 'PATIENT_LIST_APPEND_CACHE':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default patientListReducer;
