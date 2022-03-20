"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const csv_writer_1 = require("csv-writer");
const data = [];
const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
    path: "./public/out.csv",
    // header: ["txid", "ts"]
    header: [
        { id: "txid", title: "TRANSACTION_ID" },
        { id: "ts", title: "TIMESTAMP" },
        { id: "market", title: "Market" },
    ],
    append: true,
    // encoding:"utf-8"
});
const writeStream = fs_1.default.createWriteStream("./public/out.csv", { encoding: "utf-8" });
fs_1.default.createReadStream("./public/input.csv")
    .pipe((0, csv_parser_1.default)())
    .once("data", (row) => {
    const header = "txid,timestamp,market";
    writeStream.write(header);
    writeStream.write('\n');
})
    .on("data", (row) => {
    const marketData = 123; // fetch from provider
    const data = `${row.txId},${row.timestamp},${marketData}\n`;
    writeStream.write(data);
})
    .on("end", () => {
    console.log("---END---");
});
