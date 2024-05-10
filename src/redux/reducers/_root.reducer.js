import { combineReducers } from 'redux';
import errors from './errors.reducer';
import newPatient from './newPatient.reducer';
import patientList from './patientList.reducer';
import user from './user.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  newPatient,
  patientList,
  user, // will have an uuid and username if someone is logged in
});

export default rootReducer;

