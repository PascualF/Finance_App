import Papa from 'papaparse'
import { ParseResult } from 'papaparse';

function parseCsv<T>(file: string): Promise<ParseResult<T>> {
    return new Promise((resolve, reject) => {
        Papa.parse<T>(file, {
            header: true,
            skipEmptyLines: true,
            transform: (value: string): string => {
                return value.trim();
            },
            complete: (results: ParseResult<T>) => {
                return resolve(results)
            },
            error: (error: Error, csvData?: unknown) => {
                return reject(error)
            }
        })
    })
}

export default parseCsv;