import { useLoaderData } from "react-router-dom";



export default function Headphones() {
    //use the loader data
    const headphoneList = useLoaderData();
    console.log(headphoneList);

    return <p>Hello! World</p>
};
