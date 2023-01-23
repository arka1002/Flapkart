import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Root from './routes/root';
import Headphones from './routes/headphones';
import Smartphones from './routes/smartphones';
import Index from "./routes/index";
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from './aws-exports';
import { listProducts, getProduct } from "./graphql/queries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Buy from './routes/buy';
import Product from './routes/product';
import Profile from './routes/profile';
import { Authenticator } from '@aws-amplify/ui-react';
import Login from './routes/login';
import Success from './routes/success';
import Watches from './routes/watches'



Amplify.configure(awsExports);


const queryClient = new QueryClient()

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
        element: <Headphones />,
        path: "category/headphones",
        loader: async () => {
          const listofHeadphones = await API.graphql({
            query: listProducts,
            variables: { filter: { category: { eq: "headphones" } } }
          })
          const theList = listofHeadphones.data.listProducts.items;
          return theList;
        }
      },
      {
        element: <Smartphones />,
        path: "category/smartphones",
        loader: async () => {
          const listofSmartphones = await API.graphql({
            query: listProducts,
            variables: { filter: { category: { eq: "smartphones" } } }
          })
          const phonesList = listofSmartphones.data.listProducts.items;
          return phonesList;
        }
      },
      {
        element: <Watches/>,
        path: "category/watches",
        loader: async () => {
          const listOfWatches = await API.graphql({
            query: listProducts,
            variables: { filter: { category: { eq: "watches" } } }
          })
          const watches = listOfWatches.data.listProducts.items;
          return watches;
        }
      },
      {
        element: <Buy />,
        path: "buy"
      },
      {
        element: <Product />,
        path: "product/:productID",
        loader: async ({ params }) => {
          const oneProd = await API.graphql({
            query: getProduct,
            variables: { id: params.productID }
          });
          const oneProdItem = oneProd.data.getProduct;
          return oneProdItem;
        }
      },
      {
        element: <Profile />,
        path: "myprofile"
      },
      {
        path: "login/",
        element: <Login />
      },
      {
        path: "buy/success",
        element: <Success />
      }
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Authenticator.Provider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Authenticator.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
