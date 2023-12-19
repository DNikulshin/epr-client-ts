import {Link} from 'react-router-dom'

interface navigationProps {
    onClick: () => void
    buttonTypeText: string,
    linkTo: string
    currentRoute: string
    logout: () => void
}

export const Navigation = ({onClick, buttonTypeText, linkTo, currentRoute, logout}: navigationProps) => {
    return (
        <>
            <div
                className="d-flex justify-content-center text-center gap-4 align-items-center bg-secondary bg-opacity-50 w-100 flex-nowrap rounded">
                <Link to={currentRoute} className="btn btn-primary fs-4 my-3 mx-3 btn-hover btn-shadow"
                      onClick={onClick}>
                    <i className="bi bi-arrow-clockwise"/>
                </Link>
                <Link to={linkTo}
                      className="d-flex btn btn-sm btn-success btn-outline-success btn-hover text-white fs-6 flex-nowrap btn-shadow">{buttonTypeText}</Link>
                <Link
                    className="btn btn-sm btn-danger text-white btn-shadow"
                    to='/login'
                    title="Выйти"
                    onClick={logout}
                >
                    Выйти
                </Link>
            </div>
        </>
    )
}
