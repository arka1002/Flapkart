import { Amplify } from "aws-amplify";
import awsExports from '../aws-exports';
import { useLoaderData } from "react-router-dom";



Amplify.configure(awsExports);



export default function Product() {
    const product = useLoaderData();


    return (
        <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
        </div>
    );
};
