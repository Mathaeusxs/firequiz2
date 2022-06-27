import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { DbQuiz } from '@libs/app-entities';

@EventSubscriber()
export class DbQuizzesSubscriber implements EntitySubscriberInterface<DbQuiz> {

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DbQuiz;
  }

  async beforeInsert(event: InsertEvent<DbQuiz>) {
    event.entity.created = new Date();
  }

  async beforeUpdate(event: UpdateEvent<DbQuiz>) {
    event.entity.modified = new Date();
  }
}
