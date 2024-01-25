import { instance } from "../api/axios.api";
import { IUser, IUserData } from "../types/types";

export class AuthService {
    static async login(user: IUser): Promise<IUserData> {
        return await instance.post("auth/login", user)
    }
    static async registrate(user: IUser): Promise<IUserData> {
        return await instance.post("user", user)
    }
    static async getMe(): Promise<IUser> {
        return await instance.get("auth/profile")
    }
}