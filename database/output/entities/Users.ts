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
import { Categories } from "./Categories";
import { Disciplines } from "./Disciplines";
import { Questions } from "./Questions";
import { ResetTokens } from "./ResetTokens";

@Index("username_UNIQUE", ["username"], { unique: true })
@Index("fk_users_users1_idx", ["modUserId"], {})
@Entity("users", { schema: "firequiz" })
export class Users {
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

  @Column("tinyint", { name: "active", width: 1 })
  active: boolean;

  @Column("int", { name: "rank" })
  rank: number;

  @Column("datetime", { name: "created" })
  created: Date;

  @Column("datetime", { name: "modified", nullable: true })
  modified: Date | null;

  @Column("int", { name: "mod_user_id", nullable: true })
  modUserId: number | null;

  @OneToMany(() => Answers, (answers) => answers.modUser)
  answers: Answers[];

  @OneToMany(() => Categories, (categories) => categories.modUser)
  categories: Categories[];

  @OneToMany(() => Disciplines, (disciplines) => disciplines.modUser)
  disciplines: Disciplines[];

  @OneToMany(() => Questions, (questions) => questions.modUser)
  questions: Questions[];

  @OneToMany(() => ResetTokens, (resetTokens) => resetTokens.users)
  resetTokens: ResetTokens[];

  @ManyToOne(() => Users, (users) => users.users, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: Users;

  @OneToMany(() => Users, (users) => users.modUser)
  users: Users[];
}
