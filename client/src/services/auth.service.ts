import { instance } from "../api/axios.api";
import { IUser } from "../types/types";

export class AuthService {
    static async login() {

    }
    static async registrate(user: IUser): Promise<any> {
        return await instance.post("user", user)
    }
    static async getMe() {

    }
}