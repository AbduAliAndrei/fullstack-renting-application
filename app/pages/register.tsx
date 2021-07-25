import {BaseSyntheticEvent, useEffect, useState} from "react";
import {UserType} from "../enums/UserType";
import {Tenant} from "../interfaces/Tenant";
import Landlord from "../interfaces/Landlord";

import {useCookies} from "react-cookie";


const Register = () => {
    const [userType, setUserType] = useState<UserType>(UserType.TENANT);
    const [registeringUser, setRegisteringUser] = useState<Tenant | Landlord>({
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

    const [userTypes] =  useState<UserType[]>(Object.values(UserType));

    const onInputChange = (event: BaseSyntheticEvent) =>
        setRegisteringUser({...registeringUser, [event.currentTarget.name]: event.currentTarget.value});

    useEffect(() => {
        // console.log(xsrfToken['XSRF-Token']);
    }, []);


    const register = () => {
        return fetch("api/auth/login", {
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
        const res =  await register();
        console.log(res);
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor={'userType'}>User Type</label>
            <select id={'userType'}>
                {
                    userTypes.map((userType, index) => (
                            <option value={userType} key={index} onSelect={(e) => setUserType(e.currentTarget.value as UserType)}>
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