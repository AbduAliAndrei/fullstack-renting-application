import Tenant from "./Tenant";

export type TenantFunction<T> = {
    data: T,
}

export interface TenantDatabase  {
    add: (tenantInfo: Tenant) => Promise<TenantFunction<DatabaseTenant<Tenant>>>,
    findAll: ({ name }: {name?: string}) => Promise<TenantFunction<Tenant[]> & {_name: string}>,
    findById: ({ id }: {id: string}) => Promise<TenantFunction<Tenant> & {id?: string}>,
    update: ( { id, data }: {id: string, data: Tenant}) => Promise<TenantFunction<DatabaseTenant<Tenant>>>,
    remove: ({ id }: {id: string}) => Promise<TenantFunction<DatabaseTenant<string>>>
}

export interface DatabaseTenant<T> {
    writeTime: Date;
    data: T;
}