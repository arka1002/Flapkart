import { useLoaderData } from "react-router-dom";
import LikeButtonOnProdPage from "../components/likeButtonOnProdPage";
import { Button } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

export default function Product() {

    const theProd = useLoaderData();

    return (
        <>
            <h1 className="text-xl italic font-bold underline underline-offset-2">{theProd.name}</h1>
            <p>{theProd.description}</p>
            <p>{theProd.price}</p>
            <LikeButtonOnProdPage id={theProd.id}/>
            <p><Button>Buy</Button></p>

        </>
    );
};
