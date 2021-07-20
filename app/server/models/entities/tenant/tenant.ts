import {TenantRequest} from "../../../interfaces/Tenant";

export default function buildMakeTenant({Id, validate }: {Id: any, validate?: any}) {
    return function makeTenant({
       firstName,
       createdAt = new Date(),
       id = Id.makeId(),
       idType,
       email,
       lastName,
       userName = firstName + ' ' + lastName,
       updatedAt = new Date(),
       verified  = false,
       gender,
       bio = '',
       picture,
       password
    } : TenantRequest) {
        if (!email) {
            throw new Error('Tenant must have email')
        }
        
        if (!firstName || !lastName)  {
            throw new Error('Tenant must have first name and last name');
        }
        
        if (!password) {
            throw new Error('Tenant password is required');
        }
        if(!gender){
            throw new Error('Tenant must provide gender')
        }

        if(!picture){
            throw new Error('Tenant must provide a picture')
        }

        if (!idType) {
            throw new Error('Tenant must provide id type of passport')
        }
        
        return Object.freeze({
            getFirstName: () => firstName,
            getLastName: () => lastName,
            getCreatedAt: () => createdAt,
            getEmail: () => email,
            getId: () => id,
            getUpdatedAt: () => updatedAt,
            getUsername: () => userName,
            getVerified: () => verified,
            getIdType: () => idType,
            getBio: () => bio,
            getGender: () => gender,
            getPicture: () => picture,
            getPassword: () => password
        })
    }
}