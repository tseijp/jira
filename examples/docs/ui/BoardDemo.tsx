import useJIRABoard from '../../../packages/core/react'
import { DemoContainer } from './DemoContainer'
import { DemoCopyButton } from './DemoCopyButton'
import { DemoSelectButton } from './DemoSelectButton'
import { DemoTarget } from './DemoTarget'
import { DemoTextarea } from './DemoTextarea'

export interface BoardDemoProps {
        children: string
        labels?: string[]
}

export const BoardDemo = (props: BoardDemoProps) => {
        const { children, labels } = props

        const ref = useJIRABoard({ label: labels?.[0] })

        return (
                <DemoContainer style={{ display: 'flex' }}>
                        <DemoTextarea
                                defaultValue={children}
                                onChange={ref.onChange}
                        />
                        <DemoTarget ref={ref}>{children}</DemoTarget>
                        <DemoCopyButton onClick={ref.onClick} />
                        {labels && (
                                <DemoSelectButton onClick={ref.onSelect}>
                                        {labels.map((label, index) => (
                                                <option
                                                        key={index}
                                                        value={label}
                                                >
                                                        {label}
                                                </option>
                                        ))}
                                </DemoSelectButton>
                        )}
                </DemoContainer>
        )
}
