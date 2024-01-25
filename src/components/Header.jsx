import family from '../assets/images/family.png';
import room from '../assets/images/treatment-room.png';
import calendar from '../assets/icon/calendar-badge-clock.svg';
import waveform from '../assets/icon/waveform-path.svg';

import '../css/header.css';

function Header(props){

    return(
        <div className="header">
            <div className="header__widgets">
                <h1 className="header__title">{props.title}</h1>
                <div className="header__widget">
                    <div className="header__icon-frame">
                        <img className="header__icon-image" src={calendar} alt="" />
                    </div>
                    <div className="header__widget-block-text">
                        <p className="header__widget-text">Mardi 11 Novembre</p>
                        <p className="header__widget-text">2023</p>
                    </div>
                </div>
                <div className="header__widget">
                    <div className="header__icon-frame">
                        <img className="header__icon-image" src={waveform} alt="" />
                    </div>
                    <div className="header__widget-block-text">
                        <p className="header__widget-text">97 patients</p>
                        <p className="header__widget-text">en séjour</p>
                    </div>
                </div>
            </div>
            <div className="header__illustration">
                <img className="header__illustration-image" src={family} alt="" />
            </div>            
        </div>
    );
}

export default Header;