import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DbUsers } from "./Users";
import { DbQuestions } from "./Questions";

@Index("fk_diciplines_users1_idx", ["modUserId"], {})
@Entity("disciplines", { schema: "firequiz" })
export class DbDisciplines {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 200 })
  name: string;

  @Column("boolean", { name: "active" })
  active: boolean;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("datetime", { name: "created", nullable: true })
  created: Date | null;

  @Column("datetime", { name: "modified", nullable: true })
  modified: Date | null;

  @Column("int", { name: "mod_user_id", nullable: true })
  modUserId: number | null;

  @ManyToOne(() => DbUsers, (users) => users.disciplines, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: DbUsers;

  @OneToMany(() => DbQuestions, (questions) => questions.disciplines)
  questions: DbQuestions[];
}
