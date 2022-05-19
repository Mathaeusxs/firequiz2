import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answers } from "./Answers";
import { Quiz } from "./Quiz";
import { Users } from "./Users";

@Index("fk_questions_users1_idx", ["modUserId"], {})
@Index("fk_questions_quiz1_idx", ["quizId"], {})
@Entity("questions", { schema: "firequiz" })
export class Questions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "quiz_id" })
  quizId: number;

  @Column("tinyint", { name: "active", nullable: true, width: 1 })
  active: boolean | null;

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

  @OneToMany(() => Answers, (answers) => answers.questions)
  answers: Answers[];

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "quiz_id", referencedColumnName: "id" }])
  quiz: Quiz;

  @ManyToOne(() => Users, (users) => users.questions, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: Users;
}
