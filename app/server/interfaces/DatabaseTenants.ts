import {Tenant} from "../../interfaces/Tenant";

export type TenantFunction<T> = {
    data: T,
}

export interface TenantDatabase  {
    add: (tenantInfo: Required<Tenant>) => Promise<TenantFunction<DatabaseTenant<Required<Tenant>>>>,
    findAll: ({ name }: {name?: string}) => Promise<TenantFunction<Required<Tenant>[]> & {_name: string}>,
    findById: ({ id }: {id: string}) => Promise<TenantFunction<Required<Tenant>> & {id?: string}>,
    update: ( { id, data }: {id: string, data: Required<Tenant>}) => Promise<TenantFunction<DatabaseTenant<Required<Tenant>>>>,
    remove: ({ id }: {id: string}) => Promise<TenantFunction<DatabaseTenant<string>>>
}

export interface DatabaseTenant<T> {
    writeTime: Date;
    data: T;
}