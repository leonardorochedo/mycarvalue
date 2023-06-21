import { rm } from "fs/promises";
import { join } from "path";

// remove test db befora tests
global.beforeEach(async () => {
    try {
        await rm(join(__dirname, '..', 'test.sqlite'))
    } catch (err) {}
});