export default interface Tenant {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    verified: boolean;
}