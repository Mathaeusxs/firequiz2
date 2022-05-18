import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Questions } from "./Questions";

@Index("fk_categories_users1_idx", ["modUserId"], {})
@Entity("categories", { schema: "firequiz" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 200 })
  name: string;

  @Column("tinyint", { name: "active", width: 1, default: () => "'1'" })
  active: boolean;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("datetime", { name: "created", nullable: true })
  created: Date | null;

  @Column("datetime", { name: "modified", nullable: true })
  modified: Date | null;

  @Column("int", { name: "mod_user_id", nullable: true })
  modUserId: number | null;

  @ManyToOne(() => Users, (users) => users.categories, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: Users;

  @OneToMany(() => Questions, (questions) => questions.categories)
  questions: Questions[];
}
