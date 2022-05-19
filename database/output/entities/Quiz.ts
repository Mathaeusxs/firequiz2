import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Questions } from "./Questions";
import { Categories } from "./Categories";
import { Disciplines } from "./Disciplines";
import { Users } from "./Users";

@Index("fk_quiz_categories1_idx", ["categoriesId"], {})
@Index("fk_quiz_disciplines1_idx", ["disciplinesId"], {})
@Index("fk_quiz_users1_idx", ["modUserId"], {})
@Entity("quiz", { schema: "firequiz" })
export class Quiz {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "categories_id" })
  categoriesId: number;

  @Column("int", { name: "disciplines_id" })
  disciplinesId: number;

  @Column("varchar", { name: "name", length: 200 })
  name: string;

  @Column("datetime", { name: "created", nullable: true })
  created: Date | null;

  @Column("datetime", { name: "modified", nullable: true })
  modified: Date | null;

  @Column("int", { name: "mod_user_id", nullable: true })
  modUserId: number | null;

  @OneToMany(() => Questions, (questions) => questions.quiz)
  questions: Questions[];

  @ManyToOne(() => Categories, (categories) => categories.quizzes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "categories_id", referencedColumnName: "id" }])
  categories: Categories;

  @ManyToOne(() => Disciplines, (disciplines) => disciplines.quizzes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "disciplines_id", referencedColumnName: "id" }])
  disciplines: Disciplines;

  @ManyToOne(() => Users, (users) => users.quizzes, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: Users;
}
