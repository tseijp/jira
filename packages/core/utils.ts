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
        if (typeof id === 'string') return document.getElementById(id)
        return id
}

export const isS = (s: unknown): s is string => typeof s === 'string'

export const isE = (e: unknown): e is Element => e instanceof Element

export const isSE = (se: unknown): se is string | Element => isS(se) || isE(se)
