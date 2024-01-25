// Patient page : patient details

import Menu from "../components/Menu";
import PatientDetails from "../components/PatientDetails";

import '../css/patient.css';

function PatientPage() {    
  
  return (
    <div className="main">
      <Menu/>
      <PatientDetails/>
    </div>
  );
}

export default PatientPage;