




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUd3S1RkRzlBaUlBYWRjS2ZIZTMxZisvYUd2QU5lZ0NjN0F3cEFhRnZrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUm4vYStLZDZQNWJsTjVQaGF4cXU5aXRtYko2enFrcHdBR2VOUUgxZlAzWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNT3BiWGE5eFJ5Y0ZVdlhpVzE3TmkxZUIvVDNkcHdZUy85UW10cSs5QW1rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOM0hsVDNRZ3lTa0JlTzdDNXVOVldsLzM5WDV0dVhrbWU2VkVicGhRcnpJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1PZXFSZzNFdDljRTZXZWhRVzRXbDlXRHRhbHBBN0ZzcWJjTlNiUi9OWDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1qVFlLOUVpdVdDQWVxaVNFS1ZWWFZ1bDk1RVM2WDYyM1c0RkZOVHRHUm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkZMZnZ3RzM0SU41eElaUEJHWDZUUFp6dUlrQmxkSTkyVitBZCtkTUtudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHRKcURhUFdnYlh1eGgvMC9HWVU2ZWMrRjJmL2MwUFFkcmFEZ3FMVVhrOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRXcUFHcDYrYUVHNzYzSWM1VUltRWYzaHZSemplaTRZbkUxSjZQb1ZZWE9JQmlVZmRnZXRNTVZxNXRrbGo3UzF1WlZoU1ZWZzdiVUVnQVBjemh0VkRBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDUsImFkdlNlY3JldEtleSI6IkFML3VMZ2NtQ25pVzhoK1FpeDV0bFBBbjJIeGVTUWg5SU9rOEN2bFh1WG89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzU4NDQzMTExQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQ4NThDRTFBQ0I2NkIzQTQ5ODhFMDIzOTVGMkQwODRDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDg0MTA1MjF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxOEZDODA2RENCRjlFRTJFQkFCNDJEMDI3ODcwNTlBRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4NDEwNTIyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJSWDg0VjFXNCIsIm1lIjp7ImlkIjoiMjU0NzU4NDQzMTExOjQxQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTE3NDgwODI3NjU4MjUwOjQxQGxpZCIsIm5hbWUiOiLinJ7vuI7imIXhjq/imLzvuI7ihJLimLzvuI7ihJLinKnihLDinKvihJXimavimKDvuI7vuI4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01MUjhva0VFSWZCMnNFR0dDQWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjhSN0JnS3hidk9ON0dualNWWFJjTnNFM0N6Q0ZsMWhnbWQ1OE9Ha3pSbGM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlgrbW10bnFnRmJDRlZ3WlBjbXVrOXdQeUJKZnArWXhJKzNmUjZCM1ZDR0t3QmtsRFhmeERtSzREVnBUdWxVOUNLRHZoZnVZYlM3NWVhV1RPKzZMREN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSa2V2OHRHbUdTZmRzNi92QzFnMHFuQWx5Q3hxNmFBaG5VZWVKZ3A4dzdjT09vNE9kaG9MN2xjRXMrTlYyVFM5RXRyUitxSWJLT1kyckY4U004TnhEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMTo0MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmRWV3WUNzVzd6amV4cDQwbFYwWERiQk53c3doWmRZWUpuZWZEaHBNMFpYIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDg0MTA1MTYsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTDg3In0=',
    PREFIXE: process.env.PREFIX || "©",
    OWNER_NAME: process.env.OWNER_NAME || "254758443111",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "MR ΛĿĿƐИ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/tMZ8f8cG/file-1127.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "no",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
