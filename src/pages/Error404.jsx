// Erreur 404
import error404 from '../assets/images/404.svg';
import '../css/error404.css';


function Error404() {    
  
  return (
    <div className="error-page">
        <img className="error-page__img" src={error404} alt="Erreur 404"/>
    </div>
  );
}

export default Error404;