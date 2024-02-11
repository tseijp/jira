import { useJIRAHour } from '../../../packages/core/react'
import { DemoContainer } from './DemoContainer'
import { DemoCopyButton } from './DemoCopyButton'
import { DemoSelectButton } from './DemoSelectButton'
import { DemoTarget } from './DemoTarget'
import { DemoTextarea } from './DemoTextarea'
export interface HourDemoProps {
        children: string
        labels?: string[]
}

export const HourDemo = (props: HourDemoProps) => {
        const { children, labels } = props

        const ref = useJIRAHour()

        return (
                <DemoContainer style={{ display: 'flex' }}>
                        <DemoTextarea
                                defaultValue={children}
                                onChange={ref.onChange}
                        />
                        <DemoTarget ref={ref}>{children}</DemoTarget>
                        <DemoCopyButton onClick={ref.onClick} />
                        {labels && (
                                <DemoSelectButton onChange={ref.onSelect}>
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
