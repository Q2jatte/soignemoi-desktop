// Flux component : header and flux content

import Header from "./Header";
import StaysList from "./StaysList";

import '../css/flux.css';

function Flux(){

    return (
        <div className="content">
            <Header title="Gestion des admissions" />
            <div className="flux">
                <StaysList />                    
            </div>                 
        </div>
    );
}

export default Flux;