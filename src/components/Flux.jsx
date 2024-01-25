import Entries from "./Entries";
import Header from "./Header";
import Exits from "./Exits";
import Planning from "./Planning";

import '../css/flux.css';

function Flux(){

return (
    <div className="content">
        <Header title="Gestion des admissions" />
        <div className="content__grid">
            <Planning />
            <Entries/>
            <Exits/>            
        </div>                 
    </div>
    );

}

export default Flux;