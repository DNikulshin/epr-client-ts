
import {Navigate, Outlet} from "react-router-dom";

export interface PrivateRoutesProps {
    userId: string | number | null
}
export const PrivateRoutes = ({userId}: PrivateRoutesProps) => {
    return (
        userId ? <Outlet/> : <Navigate to='/login' replace/>
    )
}