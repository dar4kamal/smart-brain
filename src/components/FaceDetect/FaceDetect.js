import React from "react";
import "./FaceDetect.css"

const FaceDetect = ({ imageUrl , boxes }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto"/>
                { 
                    boxes.map((box,idx) => {
                        return (
                            <div 
                                key= {idx}
                                className="Bbox"
                                style={{
                                    top: box.topRow,
                                    right: box.rightCol,
                                    left: box.leftCol,
                                    bottom: box.bottomRow
                                }}></div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default FaceDetect;