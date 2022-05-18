import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { DbQuestions } from '@libs/api-interfaces/db-entities';

@EventSubscriber()
export class DbQuestionsSubscriber implements EntitySubscriberInterface<DbQuestions> {

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DbQuestions;
  }

  async beforeInsert(event: InsertEvent<DbQuestions>) {
    event.entity.created = new Date();
  }

  async beforeUpdate(event: UpdateEvent<DbQuestions>) {
    event.entity.modified = new Date();
  }
}
