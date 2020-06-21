import { Request } from 'express';
import UserModel from './UserModel';

export default interface RequestWithAuthenticatedUser extends Request {
    user?: UserModel
}