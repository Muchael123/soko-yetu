// import { Request } from 'express';
export { }
declare global{
    namespace Express {
        export interface Request{
            userId?: number;
            cleanBody?: any
            role?: string
        }
    }
}