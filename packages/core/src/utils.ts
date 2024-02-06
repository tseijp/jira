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
