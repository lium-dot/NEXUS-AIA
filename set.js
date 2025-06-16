




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU12ZDFHcjBlY3JMcnZ4SEc3d0ZkUlNqNjdhVjdRZkhJakhTaU96SFVGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUhkNG1lcGlzcDR4cytFMkQ5cVkxRGtIdExFem96aktmcitNekZnQXJYMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZRmU5bWpUQmhpS0EyWUFmanQ1dThhQUtWN0cwcEJpL0duWVg0Mi9aa213PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQdXNsdzdRWVR5dkI2NnRXT1BER3NvTWxIRTl3cGx3bEJmQW0zYVNRK2pRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNMZUdHQ25md3BoN1FPaUJrWnFvUEdLVGtzNjFBZ29naCtONzhJeGczWFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxGSmt6bUh4RE5wa3prczlzZEF1c2NtWG1LK1BkTjBpSE42TzRRc0FVblU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0UxaVNBekJxaUs4MU1wblVMOGFPZ2lrY1U0NUZDUlYzYlFncUw1dUxWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXNIWFM1WVRHbXliMjM5WEtObk5jRW1mVlhVWjhNQS9XWmp3aWo0ZXpXST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZ3YjNYZjVkT0sxZzdHY2tXek1jOFVkUmp3Z3ltZkhaSmM0ZkkwaHo5Y0lGV3ZMK25DTnUxMmI4aTFSZjZZeWFkM0Jrcm52ZzhQNXVpOGduV3dmNkNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcyLCJhZHZTZWNyZXRLZXkiOiJxcTRmQVhFbzdsS3RQMlVjZUpZYUVObitpZlIyUk5nNFRKMFFEUzM2dE5VPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3NzczOTU2MTc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjAwQTk4M0I4MUU5QjYyOTNDRkUyQUU2NTA4RDcxQjUxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTAwOTg5ODB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3NzczOTU2MTc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFCMzMzN0ZFQkEwNUVFNzE0QkY4OTQxMEMxQjM5ODMzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTAwOTg5ODh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjhGUFdNWThMIiwibWUiOnsiaWQiOiIyNzc3Mzk1NjE3NjoyNEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLihJXwnZS48J2Vi/CdlYDwnZWG4oSVIPCdlLnwnZWG8J2VkCIsImxpZCI6IjE4NzM1MTM1NTY3MDc0ODoyNEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ00zaGhLa0NFSWZJd2NJR0dCZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkR3aWI1WWZJMHc3cVdPVlgrY1U5QXZzWDZTeGFWMGFRNDhzY1JNNHFNenM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IllwREY3aXZQbzRXNFhEYk96cUdnaWZSUGV0dVNqdGg1L3FnVE1oNHliRG5RRW05b0cxaHRCYitOZ2RzZmlveVlzakcyaXpEbENpSWRBckg1K0ltYUNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJVT1ZGZzRWTWlodys5dzFFamhZS2lFdG5KK3QxQ2V4ZmdPQzZhV3NYRFVNV3lUSDZwS01IUDBTNytEaGVmd09aaVFQNUJFUk5ZamU1Zi9aTFpGRE5Ddz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NzczOTU2MTc2OjI0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlE4SW0rV0h5Tk1PNmxqbFYvbkZQUUw3Ritrc1dsZEdrT1BMSEVUT0tqTTcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDA5ODk2NSwibGFzdFByb3BIYXNoIjoiMlY3N3FVIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFa2gifQ==',
    PREFIXE: process.env.PREFIX || "∆",
    OWNER_NAME: process.env.OWNER_NAME || "27773956176",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "✞︎𝙆𝘼𝙍𝘼𝘽𝙊❥︎☠︎︎",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/zTWL7Ghp/file-1596.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
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
