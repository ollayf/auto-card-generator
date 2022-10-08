import React from "react";

const NoMatch = ({history}) => {
    return (
        <div style={{marginLeft:`10px`}}>
            <h2>Error 404: Not Found</h2>
            <p>Redirecting to <span style={{color:`dodgerblue`}} onClick={() => history.push('/')}>Login Page</span></p>
        </div>
    )
}

export default NoMatch