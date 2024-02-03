export interface IUser {
    name: string;
    password: string;
}

export interface IUserData {
    name: string;
    token: string;
}

export interface ITask {
    id: string,
    message: string,
    createdAt: string,
    updatedAt: string
}