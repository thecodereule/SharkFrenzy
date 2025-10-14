import { Typography } from "@mui/material";
import { useAccount } from "../../lib/hooks/useAccount"
import { Navigate, Outlet, useLocation } from "react-router";

export default function RequireAuth() {
    const { currentUser, loadingUserInfo } = useAccount();
    const location = useLocation();

    if (loadingUserInfo) return <Typography>Loading...</Typography>

    if (!currentUser) return <Navigate to='/login' state={{from: location}} />

    return (
        <Outlet />
    )
}