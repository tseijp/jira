export const DemoTextarea = (props: any) => {
        return (
                <textarea
                        {...props}
                        style={{
                                minWidth: '38%',
                                padding: '32px 0px 0px 0px',
                                margin: 0,
                                border: 'none',
                                outline: 'none',
                                background: 'none',
                                resize: 'none',
                        }}
                />
        )
}
