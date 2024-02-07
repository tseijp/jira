import useJIRABoard from '../../../packages/core/react'
import { DemoContainer } from './DemoContainer'
import { DemoCopyButton } from './DemoCopyButton'
import { DemoTarget } from './DemoTarget'
import { DemoTextarea } from './DemoTextarea'
export interface HourDemoProps {
        children: string
}

export const HourDemo = (props: HourDemoProps) => {
        const { children } = props

        const ref = useJIRABoard()

        return (
                <DemoContainer style={{ display: 'flex' }}>
                        <DemoTextarea
                                defaultValue={children}
                                onChange={ref.onChange}
                        />
                        <DemoTarget ref={ref}>{children}</DemoTarget>
                        <DemoCopyButton onClick={ref.onClick} />
                </DemoContainer>
        )
}
