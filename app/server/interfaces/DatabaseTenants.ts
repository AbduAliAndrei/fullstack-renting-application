import {TenantResponse} from "./Tenant";

export type TenantFunction<T> = {
    data: T,
}

export interface TenantDatabase  {
    add: (tenantInfo: TenantResponse) => Promise<TenantFunction<DatabaseTenant<TenantResponse>>>,
    findAll: ({ name }: {name?: string}) => Promise<TenantFunction<TenantResponse[]> & {_name: string}>,
    findById: ({ id }: {id: string}) => Promise<TenantFunction<TenantResponse> & {id?: string}>,
    update: ( { id, data }: {id: string, data: TenantResponse}) => Promise<TenantFunction<DatabaseTenant<TenantResponse>>>,
    remove: ({ id }: {id: string}) => Promise<TenantFunction<DatabaseTenant<string>>>
}

export interface DatabaseTenant<T> {
    writeTime: Date;
    data: T;
}