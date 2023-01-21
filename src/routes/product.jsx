import { useLoaderData } from "react-router-dom";
import LikeButtonOnProdPage from "../components/likeButtonOnProdPage";
export default function Product() {

    const theProd = useLoaderData();
    // console.log(theProd);

    return (
        <>
            <h1>{theProd.name}</h1>
            <p>{theProd.description}</p>
            <p>{theProd.price}</p>
            <LikeButtonOnProdPage id={theProd.id}/>
        </>
    );
};
