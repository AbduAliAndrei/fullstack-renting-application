import {BaseSyntheticEvent, useEffect, useState} from "react";
import {UseType} from "../enums/use-type";

import {useCookies} from "react-cookie";
import {UserExtended} from "../interfaces/user-extended";


const Register = () => {
    const [userType, setUserType] = useState<UseType>(UseType.TENANT);
    const [registeringUser, setRegisteringUser] = useState<UserExtended>({
        email: 'andrei.cristea@gmail.com',
        trusted: false,
        firstName: 'Andrei',
        lastName: 'Cristea',
        password: '123456',
        userName: 'Andrei Cristea',
        offersList: [],
        verified: false,
        gender: 'male',
        idType: 'passport',
        picture: 'svg.net',
    });

    const [xsrfToken] = useCookies(['XSRF-TOKEN']);
    const [sessionCookie] = useCookies(['sessionCookie']);

    const [userTypes] =  useState<UseType[]>(Object.values(UseType));

    const onInputChange = (event: BaseSyntheticEvent) =>
        setRegisteringUser({...registeringUser, [event.currentTarget.name]: event.currentTarget.value});

    useEffect(() => {
        // console.log(xsrfToken['XSRF-Token']);
    }, []);


    const register = () => {
        return fetch("api/auth/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": xsrfToken['XSRF-Token']
            },
            body: JSON.stringify({
                user: registeringUser,
                userType: userType
            }),
        });
    }

    const onSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const res = await register();
        console.log(res);
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor={'userType'}>User Type</label>
            <select id={'userType'}>
                {
                    userTypes.map((userType, index) => (
                            <option value={userType} key={index} onSelect={(e) => setUserType(e.currentTarget.value as UseType)}>
                                {userType}
                            </option>
                        )
                    )
                }
            </select>
            <input type={'text'} name={'email'} onChange={onInputChange} value={registeringUser.email}  />
            <input type={'password'} name={'password'} onChange={onInputChange} value={registeringUser.password}  />
            <input type={'text'} name={'firstName'} onChange={onInputChange} value={registeringUser.firstName}  />
            <input type={'text'} name={'lastName'} onChange={onInputChange} value={registeringUser.lastName}  />
            <input type={'radio'} name={'verified'} onChange={onInputChange} checked={registeringUser.verified}  />
            <input type={'radio'} name={'verified'} onChange={onInputChange} checked={!registeringUser.verified}  />
            <button type={'submit'}>Submit test User</button>
        </form>
    );
}


export default Register;