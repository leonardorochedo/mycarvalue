import { rm } from "fs/promises";
import { join } from "path";
import { getConnection } from "typeorm";

// remove test db befora tests
global.beforeEach(async () => {
    try {
        await rm(join(__dirname, '..', 'test.sqlite'))
    } catch (err) {}
});

global.afterEach(async () => {
    const conn = getConnection();
    await conn.close();
});