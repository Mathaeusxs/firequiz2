import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { DbUsers } from "./Users";

@Index("fk_reset_tokens_users_idx", ["usersId"], {})
@Entity("reset_tokens", { schema: "firequiz" })
export class DbResetTokens {
  @Column("int", { primary: true, name: "users_id" })
  usersId: number;

  @Column("varchar", { primary: true, name: "token", length: 200 })
  token: string;

  @Column("datetime", { name: "created" })
  created: Date;

  @Column("datetime", { name: "expires" })
  expires: Date;

  @ManyToOne(() => DbUsers, (users) => users.resetTokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "users_id", referencedColumnName: "id" }])
  users: DbUsers;
}
