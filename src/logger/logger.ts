import { Logger } from '@nestjs/common';
import * as fs from 'fs';

export class BetterLogger extends Logger {
    logToFile(fileName: string, message: string, type: string) {
        let logLine = `[${this.context} - ${type}] - ${new Date().toISOString()} - ${message} \n`;
        fs.appendFile(fileName, logLine, () => {});
    }

    log(message: string) {
        this.logToFile('http.log', message, 'LOG');
        super.log(message);
    }

    error(message: string) {
        this.logToFile('error.log', message, 'ERROR');
        super.log(message);
    }
}
