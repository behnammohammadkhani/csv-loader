import fs from "fs"
import csv from "csv-parser"

interface Type {
    txId: string,
    timestamp: number,
    market: number
}

const writeStream = fs.createWriteStream("./public/out.csv", { encoding: "utf-8" })
fs.createReadStream("./public/input.csv")
    .pipe(csv())
    .once("data", (row) => {
        const header = "txid,timestamp,market"
        writeStream.write(header)
        writeStream.write('\n')
    })
    .on("data", (row: Type) => {
        const marketData = 123 // fetch from provider
        // some error handling for fetched market data
        const {timestamp,txId}=row

        const data = `${txId?txId:""},${timestamp?timestamp:""},${marketData}\n`
        writeStream.write(data)
    })
    .on("end", () => {
        console.log("---END---");
    })

