import React from 'react';

const Error = () => {
    return (
        <>
            <div className="container mt-100 text-center">
                <h1><i className='fa fa-warning fa-3x text-warning'></i></h1>
                <h4 className='font-70 text-danger'>404 Error</h4>
                <p>
                    Sorry, the page you were looking for was not found!
                </p>
            </div>
        </>
    )
}

export default Error;