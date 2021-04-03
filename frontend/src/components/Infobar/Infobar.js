import React from 'react'
import "./styles.css"

function Infobar({room}) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png" alt="online"/>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png" alt="close"/></a>
            </div>
            
        </div>
    )
}

export default Infobar
