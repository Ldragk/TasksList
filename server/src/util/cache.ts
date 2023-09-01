import NodeCache from 'node-cache';

interface HasId {
    id: any;
}

class Cache {
    constructor(protected cacheService = new NodeCache()) { }

    public set<T>(key: string, value: T, ttl = 3600): boolean {
        return this.cacheService.set(key, value, ttl);
    }

    public get<T>(key: string): T | undefined {
        return this.cacheService.get<T>(key);
    }

    public flushAll(): void {
        return this.cacheService.flushAll();
    }

    public find<T extends HasId>(key: string, id: any): T[] | undefined {
        const cached = this.get<T[]>(key);
        if (cached) {
            const cacheWhereDifferentId = cached.filter((cache: T) => { return cache.id !== id })
            return cacheWhereDifferentId;
        }
        return
    }
}

export default new Cache();
