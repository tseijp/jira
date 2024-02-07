import { useRef } from 'react'
import { createJIRABoard } from './jira'
import { JIRABoardConfigArgs } from './jira/types'

const useOnce = <T, Args extends any[] = any[]>(
        callback: (...args: Args) => T,
        args: Args
) => {
        const ref = useRef<T>()
        return ref.current ?? (ref.current = callback(...args))
}

export const useJIRABoard = (...args: JIRABoardConfigArgs) => {
        return useOnce(createJIRABoard, args)
}

export default useJIRABoard
