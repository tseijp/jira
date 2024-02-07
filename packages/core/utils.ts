export const reduce = <
        T extends any,
        Callback extends (...args: any[]) => string
>(
        target: T[],
        callback: Callback,
        interval = ''
) => {
        return target.reduce((acc, ...args: any[]) => {
                return acc + interval + callback(...args)
        }, '')
}

export const writeClipboard = (text = '') => {
        if (typeof navigator === 'undefined' || !navigator.clipboard)
                return console.warn('Error: Clipboard API not available')
        navigator.clipboard.writeText(text)
}

export const getElement = (id?: string | Element) => {
        if (!id) return
        if (typeof id !== 'string') return id
        return document.getElementById(id)
}

export const isS = (s: unknown): s is string => typeof s === 'string'

export const isE = (e: unknown): e is Element => !!e && e instanceof Element

export const isSE = (se: unknown): se is string | Element => isS(se) || isE(se)

export const parseConfig = <
        T extends object,
        Arg extends T[keyof T] | Partial<T> = T[keyof T] | Partial<T>
>(
        defaultConfig: T,
        ...args: Arg[]
) => {
        const config = { ...defaultConfig } as any
        const [arg0, arg1, arg2, arg3, arg4] = args as any
        let override: T[keyof T]
        if (isSE(arg0)) {
                config.target = arg0
                if (isSE(arg1)) {
                        config.button = arg1
                        if (isSE(arg2)) {
                                config.select = arg2
                                if (isSE(arg3)) {
                                        config.input = arg3
                                        override = arg4
                                } else override = arg3
                        } else override = arg2
                } else override = arg1
        } else override = arg0

        if (override) Object.assign(config, override)

        return config
}
