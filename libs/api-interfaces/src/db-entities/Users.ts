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
import { DbCategories } from "./Categories";
import { DbDisciplines } from "./Disciplines";
import { DbQuestions } from "./Questions";
import { DbResetTokens } from "./ResetTokens";

@Index("username_UNIQUE", ["username"], { unique: true })
@Index("fk_users_users1_idx", ["modUserId"], {})
@Entity("users", { schema: "firequiz" })
export class DbUsers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 200 })
  name: string;

  @Column("varchar", { name: "username", unique: true, length: 200 })
  username: string;

  @Column("varchar", { name: "email", length: 200 })
  email: string;

  @Column("varchar", { name: "password", length: 90 })
  password: string;

  @Column("varchar", { name: "salt", length: 90 })
  salt: string;

  @Column("boolean", { name: "active" })
  active: boolean;

  @Column("int", { name: "rank" })
  rank: number;

  @Column("datetime", { name: "created" })
  created: Date;

  @Column("datetime", { name: "modified", nullable: true })
  modified: Date | null;

  @Column("int", { name: "mod_user_id", nullable: true })
  modUserId: number | null;

  @OneToMany(() => DbAnswers, (answers) => answers.modUser)
  answers: DbAnswers[];

  @OneToMany(() => DbCategories, (categories) => categories.modUser)
  categories: DbCategories[];

  @OneToMany(() => DbDisciplines, (disciplines) => disciplines.modUser)
  disciplines: DbDisciplines[];

  @OneToMany(() => DbQuestions, (questions) => questions.modUser)
  questions: DbQuestions[];

  @OneToMany(() => DbResetTokens, (resetTokens) => resetTokens.users)
  resetTokens: DbResetTokens[];

  @ManyToOne(() => DbUsers, (users) => users.users, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: DbUsers;

  @OneToMany(() => DbUsers, (users) => users.modUser)
  users: DbUsers[];
}
