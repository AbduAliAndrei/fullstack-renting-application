import {useState} from "react";
import {UserType} from "../enums/UserType";
import {Tenant} from "../interfaces/Tenant";
import Landlord from "../interfaces/Landlord";


const Register = () => {
    const [userType, setUserType] = useState<UserType>(UserType.TENANT);
    const [registeringUser, setRegisteringUser] = useState<Tenant | Landlord>();
}


export default Register;