/* import { parse } from 'csv-parse';

const parseCsv = (data: string): Promise<Record<string, string>[]> => {
    return new Promise((resolve, reject) => {
        parse(data, 
            {
                columns: true, // Infer the columns names from the first line. (header)
                skip_empty_lines: true, // skips any line which is empty.
                trim: true, // removes whitespace from both ends of a string
            }, 
            (err, records: Record<string, string>[]) => {
                if (err) {
                    reject(err)
                } else {
                    return resolve(records);
                }  
            })
}   )}

export default parseCsv; */

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