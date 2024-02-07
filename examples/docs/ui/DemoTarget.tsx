import { forwardRef } from 'react'

export const DemoTarget = forwardRef((props: any, ref: any) => {
        return (
                <pre
                        ref={ref}
                        {...props}
                        style={{
                                fontSize: 10,
                                width: '100%',
                                height: '100%',
                                margin: 0,
                                padding: 0,
                        }}
                />
        )
})
