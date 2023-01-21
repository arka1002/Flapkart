import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listProducts } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { NavLink } from "react-router-dom";



export default function Profile() {
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
