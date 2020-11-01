
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    username: string;
    password: string;
}

export interface UserWhereInput {
    username?: string;
}

export interface DefaultConnection {
    count: number;
}

export interface IQuery {
    allUsers(where?: UserWhereInput): UserConnection | Promise<UserConnection>;
    users(): User[] | Promise<User[]>;
    user(id: number): User | Promise<User>;
    healthCheck(): string | Promise<string>;
}

export interface IMutation {
    createUser(data: CreateUserInput): User | Promise<User>;
}

export interface ISubscription {
    userCreated(): User | Promise<User>;
}

export interface User {
    id: number;
    username: string;
}

export interface UserConnection extends DefaultConnection {
    count: number;
    rows: User[];
}
