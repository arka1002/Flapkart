import { Amplify } from "aws-amplify";
import awsExports from '../aws-exports';
import { useLoaderData } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import { useState } from "react";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);



export default function Product() {
    const product = useLoaderData();
    const [count, setCount] = useState(0);

    function increaseCount() {
        if (count >= 0 && count < 10) {
            setCount(count + 1)
        }
    }

    function decreaseCount() {
        if (count >= 1) {
            setCount(count - 1)
        }
    }

    return (
        <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <Button onClick={decreaseCount}>-</Button><p>{count}</p><Button onClick={increaseCount}>+</Button>
        </div>
    );
};
