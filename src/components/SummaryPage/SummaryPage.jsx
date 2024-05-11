import { useSelector } from 'react-redux';
import PatientItem from './PatientItem';

function SummaryPage() {

  const patientList = useSelector(store => store.patientList);

  return (
    <div className="container">
    <h2>Edit Data</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date Entered</th>
            <th>BW</th>
            <th>GA</th>
          </tr>
        </thead>
        <tbody>
          {patientList && patientList[0] && patientList.map(patientSummary => <PatientItem key={patientSummary.uuid} patientSummary={patientSummary} />)}
        </tbody>
      </table>
    </div>
  )
}

export default SummaryPage;
