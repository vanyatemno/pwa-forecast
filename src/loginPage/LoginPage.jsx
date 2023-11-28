import './loginPageStyle.css';
import Cookies from 'js-cookie'
import {useEffect} from "react";
import {useNavigate} from "react-router";

function LoginPage () {

    const nav = useNavigate();

    const signInParams = {
        login: 'vanyaTemno',
        password: 'passStrong'
    }


    useEffect(() => {
        if (Cookies.get('isSigned')) nav('/weather');
    }, [])

    function wrong () {
        document.getElementById('alert').style.opacity = 1;

        setTimeout(() => {
            document.getElementById('alert').style.opacity = 0
        }, 5000)
    }


    return (
        <div className='loginPage'>
            <div id="alert">
                <span>Wrong login or/and password!</span>
            </div>
            <h2>Hello, it's weather app!</h2>
            <span>Please, sign in</span>
            <div className='loginField'>
                <label htmlFor="login">Login:</label>
                <input type="text" name='login' id='login'/>
                <label htmlFor="password" >Password:</label>
                <input type="password" name='password' id='password'/>
                <button onClick={() => {
                    const logInp = document.getElementById('login').value;
                    const passInp = document.getElementById('password').value;
                    if (logInp == signInParams.login && passInp == signInParams.password) {
                        nav('/weather')
                        Cookies.set('isSigned', true, {expires: 7})
                    } else {
                        wrong();
                    }
                }}>Sign in</button>
            </div>
        </div>
    );
}

export default LoginPage;