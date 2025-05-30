




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTURsSTRwbldKajZlcWVITTE1cnd3K3VjdFJUeDFIdUNjZGpsTE1SNlZFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkwxWnVVdVF6Sy8yeHNhVEJYVDNjZTBhTXFMQkF2aWRSOFJIL1FrYm9EVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFREMzdDduS0gyVC9rMFJxNDJESHliSWtNeEVJSmhuQnk2WmpZMlIzdTIwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpNzBmNWtSZkJvTDlSa0ROM2JIQWNOY2YybU5oaE14dDJZZmQvODNublZvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFBK1NNNFdsRXdQYVpibW9kVWVtUk52emZIRzB5WUs0dXdxUnZpTFMyMzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImYyU0FpYkpEUkF2Szg1bm1pMjVCZ0JScXR6Z2JkYXZSZHd6b2VpajVZZ3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUpWWE5xZzRWMXUraU5GajZBcUU3eFpGbXlXeFFNSkF5MGhaLzVqMkYxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2wrRWNBOWZxeVdFeGRxbzZNL2l6N1F1anBCdDdjOFhWZU1MUGMyblVFRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFFa2oxQUdMSDhPVUd5M3pLeGtCdGxqWTBtMDV5R29taTcxVjN5M3ZBNnpRQk8xS1U5NkVuQURQY1EzdmgzTGVGSWVRSlczUncyMWJZWXY0ZGdUc2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI4LCJhZHZTZWNyZXRLZXkiOiJuQTF6Q2lzZ09qc0l1c1hReitEdExldnBQR1V4YWdVRmlzMktMU3lOdXRBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0MDcxNkQ0Mjg1Q0JDQUI5NTA0Nzg2MDVBRDM5OEE0NCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4NjMxNTAzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTg0NDMxMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzBBQzBGREIyQ0ZDNTAzMkQ1QjRDOEFBMTc1ODVFN0MifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0ODYzMTUwNH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiQks4WEVZQ1MiLCJtZSI6eyJpZCI6IjI1NDc1ODQ0MzExMTo0N0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjExNzQ4MDgyNzY1ODI1MDo0N0BsaWQiLCJuYW1lIjoi4pye77iO4piF4Y6v4pi877iO4oSS4pi877iO4oSS4pyp4oSw4pyr4oSV4pmr4pig77iO77iOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNTFI4b2tFRUxyLzU4RUdHQ1lnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI4UjdCZ0t4YnZPTjdHbmpTVlhSY05zRTNDekNGbDFoZ21kNThPR2t6UmxjPSIsImFjY291bnRTaWduYXR1cmUiOiJNK1Z0SEh0VzduSzByTTlWU1Y0UnN4ZkUyem9uTWhGN3BtMWlwYXJGbkdobllhQ05DSXNPaDV5NlBoeTlNOWRiT1BWOWVxLytYenAwaHFSUVZPTHlCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZjkwMUllcUdxK3k4RGpiRFRZTnlzYWw5Rk1TU0pMR0tuYkYrd2I4S2VWQUM0STNnY0d4Ti8zRWZHUHFrMlJKQ09EVjFDdUxmMEI5T1lnNHU3Q3U5aGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NTg0NDMxMTE6NDdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZkVld1lDc1c3empleHA0MGxWMFhEYkJOd3N3aFpkWVlKbmVmRGhwTTBaWCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4NjMxNDk2LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUw4NyJ9',
    PREFIXE: process.env.PREFIX || "©",
    OWNER_NAME: process.env.OWNER_NAME || "254758443111",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "MR ΛĿĿƐИ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
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
