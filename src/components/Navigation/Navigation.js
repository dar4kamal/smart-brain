import React from "react";

const Navigation = ({ onRouteChange }) => {
    return (
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p 
                className="link pointer pa3 dim f3 underline"
                onClick={() => onRouteChange("signin")}> 
                Sign Out
            </p>
        </nav>
    );
}

export default Navigation;