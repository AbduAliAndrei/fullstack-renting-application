import Tenant from "../../interfaces/Tenant";

export default function buildMakeTenant({Id, validate }: {Id: any, validate?: any}) {
    return function makeTenant({
       firstName,
       createdAt = new Date(),
       id = Id.makeId(),
       email,
       lastName,
       userName = firstName + ' ' + lastName,
       updatedAt = new Date(),
       verified  = false,
       password,
    } : Tenant) {
        if (!email) {
            throw new Error('Tenant must have email')
        }

        if (!firstName || !lastName)  {
            throw new Error('Tenant must have first name and last name');
        }

        if (!password) {
            throw new Error('Tenant password is required');
        }

        return Object.freeze({
            getFirstName: () => firstName,
            getLastName: () => lastName,
            getCreatedAt: () => createdAt,
            getId: () => id,
            getUpdatedAt: () => updatedAt,
            getUsername: () => userName,
            getVerified: () => verified
        })
    }
}