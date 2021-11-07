import React from 'react';
import ErrorMessageStyles from './ErrorMessage.module.css';

function ErrorMessage(props) {
    return (
        <div onClick={props.onClick} className={ErrorMessageStyles.error}>
            <p>{props.message}</p>
        </div>
    )
}

export default ErrorMessage
