import { useSelector } from 'react-redux';

import CalculatorForm from './CalculatorForm';
import CalculatorResults from './CalculatorResults';

function CalculatorPage() {

    const newPatient = useSelector(store => store.newPatient);


    return (
        <div className="container">

            <CalculatorForm />

            {newPatient && newPatient.calculatedDataToSave && <CalculatorResults />}
        </div>
    );
}

export default CalculatorPage;
