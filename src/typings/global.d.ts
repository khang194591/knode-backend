type Nullable<T> = T | null;

interface IUserPayload {
  id: string;
  email: string;
  roleId: string;
  permissions: string[];
  organizationId: string;
}

declare namespace Express {
  export interface Request {
    user?: Nullable<IUserPayload>;
  }
}
