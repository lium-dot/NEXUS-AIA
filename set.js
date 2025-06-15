




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0JHS0t0VGp2L0ZBbkdyNGxkckEwMk1jWmxIYUw3TnN4bGhKOFduUExIMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFlCZWhDai9XeEowSVJMZ1JoREFhRHpCVEJFcHlLNG55cEVtQWtURTBsYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5TmFEMGJ3ejdaUTBDUGxHbXFuVE93VWx5TkVtdjk4SForV3NpckVSR1hvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhRys0TTRKR2tLMEtpalpoTVcwWlF3R01rUkpodzhnU09NZjlyUHliUFhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFLTlkvbEVjaXFJTXYyQVpxNWEyQUh2Uy9MR3h4RUZ6T2xQVlhmbFdhR289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNVak9abDRyb1RCelo3UC9IU1Q3VXluV2phUXVUY2xUQzlDem5wQXVVMkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0hHKzRhb0t3a1N3b3p1THl5RVF6RWdVeG1aZDVhRWRZdlVHYTZDNXgzaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNm50VDZnMWVCdkltaTFCemdkcWRqOE9YQTRkQ1pDWW1IV25rSGhHVmJVOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlB2a0hwdnZiOW5YdDYyQ3FIN05iNHRnWDJ2ajJraTh5Rzd2Uys2Z3lseDVaSzB4Wkg3OHZINWV6WTBtSnNlZlkveHU0OUo5ZUxObFIwVS8rNFpqQ2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc3LCJhZHZTZWNyZXRLZXkiOiJ1UDEvcDdNNU5CUnVTbTJ6MmRncVZGY0ZLM0xCWjZOK1hqcko1b2NUdGs4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxMzZEMUQ1MEMyQ0YwQUIzQjFGRkRGRDhGQjlCRTA0RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwMDEyODM0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTg0NDMxMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjI1MkU0MTFEQ0I5NkFDQkIzODYxODU2NjE2MzgzMkIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDAxMjgzNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUEc2S1dWTkYiLCJtZSI6eyJpZCI6IjI1NDc1ODQ0MzExMTo5MkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjExNzQ4MDgyNzY1ODI1MDo5MkBsaWQiLCJuYW1lIjoi4pye77iO4piF4Y6v4pi877iO4oSS4pi877iO4oSS4pyp4oSw4pyr4oSV4pmr4pig77iO77iOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOKzQ3ZE1FRUpDbnZNSUdHQ1FnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIvMmxXQkN5b0ErVmZpZm9TNlQwbmFGbk4wVnAwL01qTWhVeVJPWUxRUWxNPSIsImFjY291bnRTaWduYXR1cmUiOiJKUTQvM3kyL05QeWdsdmN3NjViVElOVEdUWHdudFE0MDU4dHU3c0JXb2JFQnZJcDE3d2RxMjdRUzVOdW5wbEZkMUtjS0ZMSWJEUC9DL1VJemc3UFBCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiR0dLQ2F6Y0FQbU9IbldjU2NmSVhRWEZnekJ5UFlmRGZNd0M2N0lLelZSMTRwc1FDcUF4Rjd6dGpXWDNIU2gxU3Y2NFhwZDdYbHJMenNKajNGMEgzZ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NTg0NDMxMTE6OTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZjlwVmdRc3FBUGxYNG42RXVrOUoyaFp6ZEZhZFB6SXpJVk1rVG1DMEVKVCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwMDEyODI5LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUE2TyJ9',
    PREFIXE: process.env.PREFIX || "∆",
    OWNER_NAME: process.env.OWNER_NAME || "254758443111",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "✞︎ ΛĪ ❥︎ ŔƐ√ᎾĿƱŦФЯ☠︎︎",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/zTWL7Ghp/file-1596.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
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
