import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Root from './routes/root';
import Product from './routes/product';
import Index from "./routes/index";
import Purchase from "./routes/purchase";
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from './aws-exports';
import { listProducts, getProduct } from "./graphql/queries";
Amplify.configure(awsExports);


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: async () => {
          const listOfProducts = await API.graphql(graphqlOperation(listProducts));
          const listOfProductsItems = listOfProducts.data.listProducts.items;
          return listOfProductsItems;
        }
      },
      {
        element: <Product />,
        path: "products/:productID",
        loader: async ({ params }) => {
          const oneProd = await API.graphql(graphqlOperation(getProduct, { id: params.productID }));
          const product = oneProd.data.getProduct;
          return product;
        }

      },
      {
        element: <Purchase/>,
        path: "products/:productID/purchased"
      }
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
