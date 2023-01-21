import { useLoaderData } from "react-router-dom";

export default function Product() {

    const theProd = useLoaderData();
    console.log(theProd);

    return (
        <>
            <p>Hello World</p>
        </>
    );
};
