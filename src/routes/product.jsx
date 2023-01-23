import { useLoaderData, useLocation, Navigate, NavLink } from "react-router-dom";
import LikeButtonOnProdPage from "../components/likeButtonOnProdPage";
import { Button, useAuthenticator, Image } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

export default function Product() {

    const theProd = useLoaderData();
    const location = useLocation();
    const { route } = useAuthenticator((context) => [context.route]);
    if (route !== 'authenticated') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return (
        <div id="product">
            <div className='my-10 flex flex-col-reverse gap-y-8 md:flex-row md:justify-evenly items-center'>
                <div>
                    <span className='text-xl italic font-bold underline underline-offset-2'>
                        {theProd.name}
                    </span>

                    <p className='w-96'>
                        {theProd.description}
                    </p>
                    <p className='w-96 text-orange-500'>
                        Price :- {theProd.price}
                    </p>

                    <div class="flex flex-row gap-4 mt-2">
                        <div><LikeButtonOnProdPage id={theProd.id} /></div>
                        <div><NavLink to={`/buy`}><Button>Buy</Button></NavLink></div>
                    </div>



                </div>
                <div>
                    <Image
                        alt="Not found"
                        src={theProd.imageLink}
                        objectFit="initial"
                        objectPosition="50% 50%"
                        backgroundColor="initial"
                        height="75%"
                        width="75%"
                        opacity="100%"
                    />
                </div>


            </div>

        </div>
    );
};
