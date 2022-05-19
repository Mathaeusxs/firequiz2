import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DbAnswers } from "./Answers";
import { DbQuiz } from "./Quiz";
import { DbUsers } from "./Users";

@Index("fk_questions_categories1_idx", ["categoriesId"], {})
@Index("fk_questions_disciplines1_idx", ["disciplinesId"], {})
@Index("fk_questions_users1_idx", ["modUserId"], {})
@Entity("questions", { schema: "firequiz" })
export class DbQuestions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "categories_id" })
  categoriesId: number;

  @Column("int", { name: "disciplines_id" })
  disciplinesId: number;

  @Column("boolean", { name: "active" })
  active: boolean;

  @Column("text", { name: "question" })
  question: string;

  @Column("varchar", { name: "type", length: 45 })
  type: string;

  @Column("int", { name: "points", default: () => "'1'" })
  points: number;

  @Column("datetime", { name: "created", nullable: true })
  created: Date | null;

  @Column("datetime", { name: "modified", nullable: true })
  modified: Date | null;

  @Column("int", { name: "mod_user_id", nullable: true })
  modUserId: number | null;

  @OneToMany(() => DbAnswers, (answers) => answers.questions,  { cascade: ['insert', 'update'] })
  answers: DbAnswers[];

  @ManyToOne(() => DbQuiz, (quiz) => quiz.questions, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "quiz_id", referencedColumnName: "id" }])
  quiz: DbQuiz;

  @ManyToOne(() => DbUsers, (users) => users.questions, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: DbUsers;
}
