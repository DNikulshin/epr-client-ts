interface  ErrorItemProps {
    text : string
}
export const ErrorItem = ({text}: ErrorItemProps) => {
    return (
        <>
            <h3 className="text-danger text-center mt-5">
                <br/>
                {text}
            </h3>
        </>
    )
}
