import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DbQuestions } from "./Questions";
import { DbCategories } from "./Categories";
import { DbDisciplines } from "./Disciplines";
import { DbUsers } from "./Users";

@Index("fk_quiz_categories1_idx", ["categoriesId"], {})
@Index("fk_quiz_disciplines1_idx", ["disciplinesId"], {})
@Index("fk_quiz_users1_idx", ["modUserId"], {})
@Entity("quiz", { schema: "firequiz" })
export class DbQuiz {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "categories_id" })
  categoriesId: number;

  @Column("int", { name: "disciplines_id" })
  disciplinesId: number;

  @Column("varchar", { name: "name", length: 200 })
  name: string;

  @Column("boolean", { name: "active" })
  active: boolean;

  @Column("datetime", { name: "created", nullable: true })
  created: Date | null;

  @Column("datetime", { name: "modified", nullable: true })
  modified: Date | null;

  @Column("int", { name: "mod_user_id", nullable: true })
  modUserId: number | null;

  @OneToMany(() => DbQuestions, (questions) => questions.quiz)
  questions: DbQuestions[];

  @ManyToOne(() => DbCategories, (categories) => categories.quizzes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "categories_id", referencedColumnName: "id" }])
  categories: DbCategories;

  @ManyToOne(() => DbDisciplines, (disciplines) => disciplines.quizzes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "disciplines_id", referencedColumnName: "id" }])
  disciplines: DbDisciplines;

  @ManyToOne(() => DbUsers, (users) => users.quizzes, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: DbUsers;
}
