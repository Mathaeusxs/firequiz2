
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { DbUsers } from '@libs/app-entities';
import { UserUpdate } from '@libs/app-interfaces/data';

@EventSubscriber()
export class DbUsersSubscriber implements EntitySubscriberInterface<DbUsers> {

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DbUsers;
  }

  async beforeInsert(event: InsertEvent<DbUsers>) {
    const { salt, passwordHash } = await this.genPassHash(event.entity);
    const created = new Date();

    event.entity.password = passwordHash;
    event.entity.salt = salt;

    event.entity.created = created;
  }

  async beforeUpdate(event: UpdateEvent<UserUpdate>) {

    if (event.entity.password &&  event.entity.passwordConfirm &&  event.entity.passwordChange) {
      const { salt, passwordHash } = await this.genPassHash(event.entity as DbUsers);
      event.entity.password = passwordHash;
      event.entity.salt = salt;
    } else {
      delete event.entity.password;
    }

    delete event.entity.passwordChange;
    delete event.entity.passwordConfirm;

    event.entity.modified = new Date();
  }


  private async genPassHash(user: DbUsers) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, salt)
    return { salt, passwordHash }
  }
}
