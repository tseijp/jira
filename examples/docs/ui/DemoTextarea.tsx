export const DemoTextarea = (props: any) => {
        return (
                <textarea
                        {...props}
                        style={{
                                // reset css
                                padding: 0,
                                margin: 0,
                                border: 'none',
                                outline: 'none',
                                background: 'none',
                                resize: 'none',
                                width: '50vw',
                        }}
                />
        )
}
