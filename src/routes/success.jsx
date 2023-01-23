import '@aws-amplify/ui-react/styles.css';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate, useLocation } from "react-router-dom";


export default function Success() {
    const location = useLocation();
    const { route } = useAuthenticator((context) => [context.route]);
    if (route !== 'authenticated') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    return <div className="flex flex-row justify-center mt-10">
        <iframe src="https://giphy.com/embed/W8AgFR0fy0SGY" width="480" height="392" frameBorder="0" class="giphy-embed" allowFullScreen title="This is a unique title"></iframe>
    </div>
};
