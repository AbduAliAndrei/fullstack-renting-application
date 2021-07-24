import {BaseSyntheticEvent, useState} from "react";


const Login = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const onEmailInput = (event: BaseSyntheticEvent) => {
        setEmail(event.target.value);
        console.log(email);
    }

    const onPasswordInput = (event: BaseSyntheticEvent) => {
        setPassword(event.target.value);
        console.log(password);
    }

    return (
       <form>
           <input type={'string'} onInput={onEmailInput} />
           <input type={'password'} onInput={onPasswordInput} />
           <button type={'submit'}>Login</button>
       </form>
    );
}


export default Login;