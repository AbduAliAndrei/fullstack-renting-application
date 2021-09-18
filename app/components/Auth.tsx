import {ReactNode} from "react";
import {useSession} from "next-auth/client";
import {useCookies} from "react-cookie";

const Auth = ({ children }: {children: ReactNode}) => {
    // const [session, loading] = useSession();
    const [sessionCookie] = useCookies(['sessionCookie']);
    console.log(sessionCookie);

    if (sessionCookie) {
        return <div>{children}</div>;
    }

    return (
        <div>
            Route is private
        </div>
    );
}


export default Auth;