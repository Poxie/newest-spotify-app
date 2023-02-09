import { selectProfileToken, selectProfileTokenLoading } from "@/redux/profile/selectors"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProfileTops } from "./ProfileTops";

export default function Profile() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectProfileToken);
    const loading = useAppSelector(selectProfileTokenLoading);

    // If user is not logged in, redirect to login page
    useEffect(() => {
        if(loading || token) return;
        router.replace('/login');
    }, [token, loading]);
    if(!token) return null;

    return(
        <div>
            <ProfileTops />
        </div>
    )
}