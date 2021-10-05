import {BaseSyntheticEvent, useCallback, useState} from "react";
import {useCookies} from "react-cookie";
import {useRouter} from "next/dist/client/router";


const Login = () => {
    const [loginUser, setLoginUser] = useState<{email: string, password: string}>({email: 'andrei@gmail.com', password: '123456'});

    const changeLoginInfo = useCallback((e: BaseSyntheticEvent) => {
        setLoginUser({...loginUser, [e.target.name]: e.target.value });
    }, [loginUser]);

    const [xsrfToken] = useCookies(['XSRF-TOKEN']);
    const router = useRouter();


    const register = async () => {
        const data = await fetch('api/auth/login', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": xsrfToken['XSRF-Token']
            },
            body: JSON.stringify(loginUser),
        });

        return await data.json();
    }

    const onSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        const user = await register();
        if (user) {
            await router.push('/profile');
        }
    }

    return (
       <form onSubmit={onSubmit}>
           <input type={'string'} onChange={changeLoginInfo} value={loginUser.email} name={'email'} />
           <input type={'password'} onChange={changeLoginInfo} value={loginUser.password} name={'password'}/>
           <button type={'submit'}>Login</button>
       </form>
    );
}


export default Login;