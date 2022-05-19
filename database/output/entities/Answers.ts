import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Questions } from "./Questions";
import { Users } from "./Users";

@Index("fk_answers_questions1_idx", ["questionsId"], {})
@Index("fk_answers_users1_idx", ["modUserId"], {})
@Entity("answers", { schema: "firequiz" })
export class Answers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "questions_id" })
  questionsId: number;

  @Column("text", { name: "answer" })
  answer: string;

  @Column("tinyint", { name: "correct", nullable: true, width: 1 })
  correct: boolean | null;

  @Column("datetime", { name: "created", nullable: true })
  created: Date | null;

  @Column("datetime", { name: "modified", nullable: true })
  modified: Date | null;

  @Column("int", { name: "mod_user_id", nullable: true })
  modUserId: number | null;

  @ManyToOne(() => Questions, (questions) => questions.answers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "questions_id", referencedColumnName: "id" }])
  questions: Questions;

  @ManyToOne(() => Users, (users) => users.answers, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: Users;
}
