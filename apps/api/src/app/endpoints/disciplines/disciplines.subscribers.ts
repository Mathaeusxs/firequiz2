import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { DbDisciplines } from '@libs/api-interfaces/db-entities';

@EventSubscriber()
export class DbDisciplinesSubscriber implements EntitySubscriberInterface<DbDisciplines> {

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DbDisciplines;
  }

  async beforeInsert(event: InsertEvent<DbDisciplines>) {
    event.entity.created = new Date();
  }

  async beforeUpdate(event: UpdateEvent<DbDisciplines>) {
    event.entity.modified = new Date();
  }
}
