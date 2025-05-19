




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUcxdjg1dVZGQUdGaWtnN0UvKy93VFRKd3hxQWZ6UHI0MlJCK21wWktuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibm9JOW5YTkFnRFNBbk5jZ3R6RXFlMkJyQmFyeU1pQXVkVTgwQWZ5TklUWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhS3JzZWJubVF5LytwUG91eUIzNFJDNHR4OGk0WEZQN1FBMDVSaW5XVjF3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiR1dKN0hJMTFYNFRFMTg3YVlqbFM0cE9jazdWNUJLMG5OdmkrWlo0MlNRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdMZ2dtZDJqa1JwMFphZDIrcUtFSTBmL3BOVFdrcnhZV2tLdFdpQUxvbUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdWcGVXZ0FwY1lUMlVXWVFYL3ZDdThWZjBkdlhpUStQYi9laEYwYVpNQVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid09kbTVaUGk3YWJHTGF2ZGRtUEJGcU1Nd003cEY4VWpaVmxZeGJDMG0zRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHhEMG4yS0w4S2ExYmZQNS82TkZlUkd3UnBHeTg5anNkdlgyeHNpamlHWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imgyb2xqY3hianRkRHFwR294dTA0ZUFLaERaVE9MbDBDMkFQcnloeDVWS0pHR1FYQWpEWTZ5Z1VSRVZRRHdDUXRQLzdLb3l6dTJqa0JVUldXT3c3UUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ5LCJhZHZTZWNyZXRLZXkiOiI1aXRjZjErYVp4ZkM0bkdCOU0yWjY0bERML0xvZDZ1dlFBR3FSQzNBTmxNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1NkFDQzJFREM3MUM4NzJCMjIzQUZCNUI4QURCMzJCMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3NjgzMTQxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTg0NDMxMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjRBQzM5NjM0ODAyNjAxQzAxM0ZBQjFEREIyNkZEMjMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzY4MzE0Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiU0ROWDFaN1giLCJtZSI6eyJpZCI6IjI1NDc1ODQ0MzExMTozQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTE3NDgwODI3NjU4MjUwOjNAbGlkIiwibmFtZSI6IuKcnu+4juKYheGOr+KYvO+4juKEkuKYvO+4juKEkuKcqeKEsOKcq+KEleKZq+KYoO+4ju+4jiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUhSOG9rRUVKaU9yc0VHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiOFI3QmdLeGJ2T043R25qU1ZYUmNOc0UzQ3pDRmwxaGdtZDU4T0drelJsYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTWNFWGVDaDVOTU9Gak05bmM5eUc0djdGc3VTRm5uWnk5eGtUWjJKZmN1eVNWejl6WElqaEI5TWRJZlNzSkFvdGlkaGZkdURjTlphWUd5UWdBWnZkRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IlVuWkowcnVzZ0dxZ0JtNk5CRElwVndUYU5vVmtnMmpJSS8wVWx6ckZnTkNpMEViQkZOamtQN0k3Q3lJWkhuSlJEYjV0ejZBVG1OTzFKRzJPVk53V0NnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzU4NDQzMTExOjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZkVld1lDc1c3empleHA0MGxWMFhEYkJOd3N3aFpkWVlKbmVmRGhwTTBaWCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3NjgzMTA5LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUw4NyJ9',
    PREFIXE: process.env.PREFIX || ".",
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
