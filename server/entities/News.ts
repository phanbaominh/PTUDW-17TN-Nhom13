import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import slugify from "slugify";

@Entity({ name: "news" })
class News extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  link: string;

  @Column()
  preview: string;

  @Column()
  date: Date;

  @BeforeInsert()
  setDefaultFields() {
    this.category = "Thông báo Khoa";
    this.slug = slugify(this.title);
  }
}

export default News;
