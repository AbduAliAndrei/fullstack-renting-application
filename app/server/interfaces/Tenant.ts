export default interface Tenant {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    createdDate: Date;
    updatedDate: Date;
    verified: boolean;
}