import { isArray } from 'class-validator';
import NodeCache from 'node-cache';

interface HasId {
    id?: string;
    userId?: string
}

class Cache {
    constructor(protected cacheService = new NodeCache()) { }

    public set<T extends HasId>(key: string, value: T | T[], userId: string, ttl = 3600): boolean {
        const cached = value
        let authzValue

        if (isArray(cached)) {
            authzValue = cached.filter((cache: T) => {
                return cache.userId === userId
            })
        }
        return this.cacheService.set(key, authzValue, ttl);
    }

    public get<T extends HasId>(key: string, userId: string): T[] | undefined {
        const cached = this.cacheService.get<T>(key)
        let authz

        if (isArray(cached)) {
            authz = cached.filter((cache: T) => {
                return cache.userId === userId
            })
        }
        return authz
    }

    public flushAll(): void {
        return this.cacheService.flushAll();
    }

    public del(key: string){
        return this.cacheService.del(key)
    }

    public find<T extends HasId>(key: string, id: string, userId: string): T[] | undefined {
        const cached = this.get<T>(key, userId);
        if (cached) {
            const cacheWhereDifferentId = cached.filter((cache: T) => { return cache.id !== id })
            return cacheWhereDifferentId;
        }
        return
    }
}

export default new Cache();
