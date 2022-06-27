import { HttpStatus } from "@nestjs/common";

export type DefaultApiData = null | unknown;

export interface ApiResponse<P = DefaultApiData, E = string | unknown> {
  success: boolean;
  statusCode?: HttpStatus;
  data?: P;
  error?: E;
  message?: string;
  path?: string;
}
