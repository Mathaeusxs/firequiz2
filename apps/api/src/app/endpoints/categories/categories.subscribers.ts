import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { DbCategories } from '@libs/app-entities';

@EventSubscriber()
export class DbCategoriesSubscriber implements EntitySubscriberInterface<DbCategories> {

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DbCategories;
  }

  async beforeInsert(event: InsertEvent<DbCategories>) {
    event.entity.created = new Date();
  }

  async beforeUpdate(event: UpdateEvent<DbCategories>) {
    event.entity.modified = new Date();
  }
}
