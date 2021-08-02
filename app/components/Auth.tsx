import {ReactNode} from "react";
import {useSession} from "next-auth/client";

const Auth = ({ children }: {children: ReactNode}) => {
    const [session, loading] = useSession();

    if (session) {
        return <div>{children}</div>;
    }

    return (
        <div>
            Route is private
        </div>
    );
}


export default Auth;