import {BaseSyntheticEvent, useState} from "react";
import {UserType} from "../enums/UserType";
import {Tenant} from "../interfaces/Tenant";
import Landlord from "../interfaces/Landlord";


const Register = () => {
    const [, setUserType] = useState<UserType>(UserType.TENANT);
    const [registeringUser, setRegisteringUser] = useState<Tenant | Landlord>({
        email: '',
        trusted: false,
        firstName: '',
        lastName: '',
        password: '',
        userName: '',
        offersList: [],
        verified: false,
        gender: 'male',
        idType: '',
        picture: ''
    });

    const [userTypes] =  useState<UserType[]>(Object.values(UserType));

    const onInputChange = (event: BaseSyntheticEvent) =>
        setRegisteringUser({...registeringUser, [event.currentTarget.name]: event.currentTarget.value});


    return (
        <form>
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
        </form>
    );
}


export default Register;