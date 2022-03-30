import React from "react";
import "./Loader.scss";

const Loader = () => {
    return (
        <div id="loader_container" className="d-flex justify-content-center align-items-center">
            <div className="nb-spinner"></div>
        </div>
    );
};

export default Loader;
