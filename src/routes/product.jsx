import { useLoaderData, useLocation, Navigate } from "react-router-dom";
import LikeButtonOnProdPage from "../components/likeButtonOnProdPage";
import { Button, useAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

export default function Product() {

    const theProd = useLoaderData();
    const location = useLocation();
    const { route } = useAuthenticator((context) => [context.route]);
    if (route !== 'authenticated') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return (
        <>
            <h1 className="text-xl italic font-bold underline underline-offset-2">{theProd.name}</h1>
            <p>{theProd.description}</p>
            <p>{theProd.price}</p>
            <LikeButtonOnProdPage id={theProd.id} />
            <p><Button>Buy</Button></p>

        </>
    );
};
