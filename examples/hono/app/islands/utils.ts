import { useEffect, useState } from 'hono/jsx'
import { mutable, event } from 'reev'

const isServer = typeof window === 'undefined'

export const $ = isServer ? () => {} : document.querySelector.bind(document)

export const useOnce = <T, Args extends any[] = any[]>(
        callback: (...args: Args) => T,
        args: Args = [] as unknown as Args
): T => {
        const [memo] = useState({ current: null as null | T })

        if (isServer) return memo.current as T

        return memo.current ?? (memo.current = callback(...args))
}

export const useMutable = (...args: [any]) => {
        const memo = useOnce(() => mutable(...args))
        return memo?.(...args)
}

export const useEvent = (...args: [any]) => {
        const memo = useMutable(...args)
        return useOnce(() => event(memo))
}

let _id = 0

type Clean = (el?: Element | null) => void

type Mount = (el: Element | null) => void | Clean

export const use$ = (mount: Mount) => {
        const id = useOnce(() => `id_${_id}`)

        useEffect(() => {
                if (!id) return
                const el = $(`#${id}`)
                const clean = mount(el)
                return () => clean?.(el)
        }, [])

        return id
}

export const use$$ = (...args: [any]) => {
        const memo = useMutable(...args) as any
        return use$((el) => {
                for (const key in memo) el?.addEventListener(key, memo[key])
                return () => {
                        console.log('use$$ cleaning up')
                        for (const key in memo)
                                el?.removeEventListener(key, memo[key])
                }
        })
}
