type Nullable<T> = T | null;

interface IUserPayload {
  email: string;
  sub: number;
  role: string;
  permissions: string[];
}

declare namespace Express {
  export interface Request {
    user?: Nullable<IUserPayload>;
  }
}
