import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DbQuestions } from "./Questions";
import { DbUsers } from "./Users";

@Index("fk_answers_questions1_idx", ["questionsId"], {})
@Index("fk_answers_users1_idx", ["modUserId"], {})
@Entity("answers", { schema: "firequiz" })
export class DbAnswers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "questions_id" })
  questionsId: number;

  @Column("text", { name: "answer" })
  answer: string;

  @Column("boolean", { name: "correct", nullable: true })
  correct: boolean | null;

  @Column("datetime", { name: "created", nullable: true })
  created: Date | null;

  @Column("datetime", { name: "modified", nullable: true })
  modified: Date | null;

  @Column("int", { name: "mod_user_id", nullable: true })
  modUserId: number | null;

  @ManyToOne(() => DbQuestions, (questions) => questions.answers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "questions_id", referencedColumnName: "id" }])
  questions: DbQuestions;

  @ManyToOne(() => DbUsers, (users) => users.answers, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: DbUsers;
}
