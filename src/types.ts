import {Request, Response} from 'express'
import { Redis } from "ioredis";

declare module 'express-session' {
    interface SessionData {
        userId: number
    }
}

export type MyContext = {
    req: Request
    redis: Redis
    res: Response
}