import ApiErr from "@src/util/err/api-err";
import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export class RateLimiter {
    private allowedRequestCount: number;

    constructor(allowedRequestCount: number) {
        this.allowedRequestCount = allowedRequestCount;
    }

    getMiddleware() {
        const rateLimitInterval = 1 * 60 * 60 * 1000 // 1 hour 
                
        return rateLimit({
            windowMs: rateLimitInterval,
            max: this.allowedRequestCount,
            keyGenerator(req: Request): string {
                return req.ip;
            },
            handler(_, res: Response): void {
                res.status(429).send(
                    ApiErr.format({
                        code: 429,
                        message: 'Too many requests, please try again later.',
                    })
                );
            },
        });
    }
}