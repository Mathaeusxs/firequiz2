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
import { Users } from "./Users";

@Index("fk_questions_categories1_idx", ["categoriesId"], {})
@Index("fk_questions_disciplines1_idx", ["disciplinesId"], {})
@Index("fk_questions_users1_idx", ["modUserId"], {})
@Entity("questions", { schema: "firequiz" })
export class Questions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "categories_id" })
  categoriesId: number;

  @Column("int", { name: "disciplines_id" })
  disciplinesId: number;

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

  @ManyToOne(() => Categories, (categories) => categories.questions, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "categories_id", referencedColumnName: "id" }])
  categories: Categories;

  @ManyToOne(() => Disciplines, (disciplines) => disciplines.questions, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "disciplines_id", referencedColumnName: "id" }])
  disciplines: Disciplines;

  @ManyToOne(() => Users, (users) => users.questions, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "mod_user_id", referencedColumnName: "id" }])
  modUser: Users;
}