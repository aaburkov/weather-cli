#!/usr/bin/env node
import {getArgs} from './helpers/args.js'

const ARGS_KEYS = {
    HELP: 'h',
    CITY: 's',
    TOKEN: 't'
}
const initCLI = () => {
    const args = getArgs(process.argv)
    console.log(args)
    if(args[ARGS_KEYS.HELP]){
        // Вывод help
    }

    if(args[ARGS_KEYS.CITY]){
        // Сохранение города

    }

    if(args[ARGS_KEYS.TOKEN]){
        // Сохранение токена

    }
}

initCLI();