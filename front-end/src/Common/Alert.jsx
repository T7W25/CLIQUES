import React from 'react'

function Alert(props) {
    return (
        <div className={`alert alert-${props.type} d-flex p-0 pl-5 pr-5 align-items-center`} role="alert">
            <div>
                {props.message}
                {props.message !== "" ? <button type="button" class="btn-close font-12 ml-10" data-bs-dismiss="alert" aria-label="Close"></button> : ''}
            </div>
        </div>
    )
}

export default Alert