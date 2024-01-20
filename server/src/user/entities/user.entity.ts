import { Task } from "src/task/entities/task.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    name: string

    @Column("text")
    password: string

    @OneToMany(() => Task, task => task.user)
    tasks: Task[]
}
