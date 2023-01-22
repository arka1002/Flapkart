import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listProducts } from "../graphql/queries";
import { API } from "aws-amplify";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";


export default function Profile() {
    const location = useLocation();
    const { route } = useAuthenticator((context) => [context.route]);


    const { user, signOut } = useAuthenticator((context) => [context.user]);

    if (route !== 'authenticated') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <MainList user={user} signOut={signOut} />;
};







function MainList({ user, signOut }) {
    //access the client
    const queryClient = useQueryClient();
    //queries
    const { isLoading, isError, data: likedProducts, error } = useQuery({
        queryKey: ['special'],
        queryFn: async () => {
            const var1 = await API.graphql({
                query: listProducts,
                variables: { filter: { isLiked: { eq: "yes" } } }
            });
            const var2 = var1.data.listProducts.items;
            return var2;
        }
    })


    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }


    return (
        <>
            <p className="text-xl italic font-bold underline underline-offset-2 text-center mt-5">Hi! {user.username}</p>

            <div className='flex justify-center mt-2'>
                <Button onClick={signOut}>Sign Out</Button>
            </div>
            <p className="text-xl italic font-bold underline underline-offset-2 text-center mt-5">My Cart Items :-</p>
            <ul className="list-disc text-center">
                {
                    likedProducts.map(prod => (

                        <NavLink to={`/product/${prod.id}`}><li className='text-amber-600 italic text-center'>{prod.name}</li></NavLink>

                    ))
                }
            </ul>
        </>
    )
};
