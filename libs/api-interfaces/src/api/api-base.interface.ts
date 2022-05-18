import { Request as HttpRequest } from 'express';
import { UserJwtPayload } from '../data';

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type AuthRequest = HttpRequest & { user: UserJwtPayload }
