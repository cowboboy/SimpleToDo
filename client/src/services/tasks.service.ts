import { instance } from "../api/axios.api";
import { ITask } from "../types/types";

export class TasksService {
    static async getAll(): Promise<ITask[]> {
        const response = await instance.get("tasks")
        return response.data
    }
}