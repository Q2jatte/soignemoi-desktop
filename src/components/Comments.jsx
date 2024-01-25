import '../css/patient.css';

function Comments(){

return (
    <div className="entries">
        <h2>Avis médicaux</h2>
        <div className="entries__content">
            <div className="entries__text-block">
                <p className="entries__text-highlight">18</p>
                <p className="text-bold">attendues</p>
            </div>
            <hr className="entries__divider"/>
            <div className="entries__text-block">
                <p className="entries__text-highlight">12</p>
                <p className="text-bold">restantes</p>
            </div>
        </div>
    </div>

    );

}

export default Comments;