import { Category } from "src/category/entities/category.entity";
import { PrimaryGeneratedColumn,Column, Entity, ManyToOne,  } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    title : string


    @Column()
    description : string

    @Column()
    blogImage : string

    @Column({
        nullable : true
    })
    publish_date : Date
    @Column({
        nullable : true
    })
    slug : string
    

    @ManyToOne(()=> Category,(category) => category.blog)
    category  : Category
}
