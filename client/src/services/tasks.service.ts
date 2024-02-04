import { instance } from "../api/axios.api";
import { ITask, ITaskData } from "../types/types";

export class TasksService {
    static async getAll(): Promise<ITask[]> {
        const response = await instance.get("tasks")
        return response.data
    }

    static async create(task: ITaskData): Promise<ITask> {
        return await instance.post("tasks", task)
    } 
}