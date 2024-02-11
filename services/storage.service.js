import { mkdir, writeFile, readFile, stat } from 'fs/promises'
import { homedir } from 'os'
import { join, dirname } from 'path'

const APP_STORAGE_FILE_PATH = join(homedir(), '/weather-cli/weather-data.json')
export const DATA_DICTIONARY = {
    TOKEN: 'token',
    CITY: 'city'
}
export const saveKeyValue = async (key, value) => {
    let data = {}
    if(await isExist(APP_STORAGE_FILE_PATH)){
        const file = await readFile(APP_STORAGE_FILE_PATH)

        data = JSON.parse(file.toString())
    }

    data[key] = value
    await mkdir(dirname(APP_STORAGE_FILE_PATH), { recursive: true });
    await writeFile(APP_STORAGE_FILE_PATH, JSON.stringify(data, null, 4))
}

export const getKeyValue = async (key) => {
    if(await isExist(APP_STORAGE_FILE_PATH)){
        const file = await readFile(APP_STORAGE_FILE_PATH)

        const data = JSON.parse(file.toString())

        return data[key]
    }

    return undefined;
}

const isExist = async (path) => {
    try {
        await stat(path)
        return true;
    } catch (error) {
        return false;
    }
}