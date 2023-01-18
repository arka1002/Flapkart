import { Amplify } from "aws-amplify";
import awsExports from '../aws-exports';
import { useLoaderData, Link, redirect, useNavigate } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import { useState } from "react";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);



export default function Product() {
    const product = useLoaderData();
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

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
    let content;
    if (count >= 1) {
        content = <Button onClick={() => {
            alert(`Are you sure want to buy ${count} ${product.name}?`);
            navigate(`/products/${product.id}/purchased`);
        }}>Buy</Button>
    }
    return (
        <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <Button onClick={decreaseCount}>-</Button><p>{count}</p><Button onClick={increaseCount}>+</Button>
            {content}
        </div>
    );
};
