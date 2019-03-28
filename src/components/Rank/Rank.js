import React from "react";

const Rank = ({ currentRank , user }) => {        
    return (
        <div>
            <div className="f4 center white">
                {`Hello ${user.name} ... Your Rank is ...`}
            </div>
            <div className="f1 center white">
                { currentRank }
            </div>
        </div>
    );
}

export default Rank;