import { Blog } from "src/blog/entities/blog.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    name : string

    @OneToMany(()=> Blog,(blog: Blog)=> blog.category)
    blog : Blog[]
}
