"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const mongouri = `mongodb://${config_1.default.mongodb.hostname}/${config_1.default.mongodb.database}`;
const mongoconn = mongoose_1.createConnection(mongouri);
const mongomsg = (msg) => () => { console.log('MongoDB:', msg); };
mongoconn.on('connected', mongomsg(`Connected to ${mongouri}`));
mongoconn.on('open', mongomsg('Connection openned'));
mongoconn.on('close', mongomsg('Connection closed'));
process.on('SIGINT', function () {
    mongoconn.close();
    mongomsg('Closed by SIGINT')();
    process.exit(0);
});
exports.default = mongoconn;
//# sourceMappingURL=db.js.map