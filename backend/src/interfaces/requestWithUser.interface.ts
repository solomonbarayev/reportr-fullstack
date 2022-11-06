import { Request } from 'express';

export default interface RequestWithUser extends Request {
    user?:
        | {
              _id: string;
          }
        | undefined;
}
