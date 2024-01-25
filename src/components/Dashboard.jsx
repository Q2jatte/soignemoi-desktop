import Entries from "./Entries";
import Header from "./Header";
import Exits from "./Exits";
import DailyVisits from "./DailyVisits";
import Occupency from "./Occupancy";

import '../css/main.css';

function Dashboard(){

return (
    <div className="content">
        <Header title="Tableau de bord" />
        <div className="content__grid">
            <Entries/>
            <Exits/>
            <DailyVisits/>
            <Occupency/>
        </div> 
                
    </div>

    );

}

export default Dashboard;