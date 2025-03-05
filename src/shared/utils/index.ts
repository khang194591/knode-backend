import { Request } from 'express';

export function extractToken(request: Request): Nullable<string> {
  return request.headers.authorization?.split(' ')[1] || null;
}
