import {BaseSyntheticEvent, useCallback, useState} from "react";


const Login = () => {
    const [loginUser, setLoginUser] = useState<{email: string, password: string}>({email: '', password: ''});

    const changeLoginInfo = useCallback((e: BaseSyntheticEvent) => {
        setLoginUser({...loginUser, [e.target.name]: e.target.value });
    }, [loginUser]);

    return (
       <form>
           <input type={'string'} onChange={changeLoginInfo} value={loginUser.email} name={'email'} />
           <input type={'password'} onChange={changeLoginInfo} value={loginUser.password} name={'password'}/>
           <button type={'submit'}>Login</button>
       </form>
    );
}


export default Login;