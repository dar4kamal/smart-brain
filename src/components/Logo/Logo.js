import Tilt from 'react-tilt'
import React from "react";
import bo7a from "./bo7a.png"

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt" options={{ max : 80 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img style={{opacity: "0.6", paddingTop: "5px"}} alt="bo7a" src={bo7a} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;