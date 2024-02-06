import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Authentication = ({setAuth}) => {
    const [register, setRegister] = useState(false);
    return (
        <>
        {register ? <Register setRegister={setRegister} /> : <Login setRegister={setRegister} setAuth={setAuth}/>}
        </>
    );
}

export default Authentication;
