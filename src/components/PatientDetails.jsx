import Comments from "./Comments";
import Header from "./Header";
import Prescriptions from "./Prescriptions";
import Stays from "./Stays";

function PatientDetails(){

    return (
        <div className="content">
        <Header title="Fiche patient" />
        <div className="patient__grid">
            <Stays/>
            <Prescriptions/>
            <Comments/>            
        </div>                
    </div>
    );
}

export default PatientDetails;