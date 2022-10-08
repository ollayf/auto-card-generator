import React from "react";
import Button from 'react-bootstrap/Button'
// import ReactComponent from '../icons/icons8-home-100.svg'
// import ReactComponent from '../icons/icons8-settings-96.png'

const Header = ({navigate}) => {
    return (
            <header>
                <img src={"./SHINELogoOrangeRed.png"} alt="Shine Logo" />
                <p>Auto Card Generator</p>
                <div className="iconsHolder">
                    <Button className="btn btn-light empty" onClick={() => navigate('/home')}><img className="homeIcon" src={require('../icons/icons8-home-100.svg').default}/></Button>
                    <Button className="btn btn-light empty" onClick={() => navigate('/settings')}><img className="settingsIcon" src={require('../icons/icons8-settings.svg').default}/></Button>
                </div>
            </header>
    )
}

export default Header;