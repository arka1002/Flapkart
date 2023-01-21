import { Button } from "@aws-amplify/ui-react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getProduct } from "../graphql/queries";
import { updateProduct } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';



export default function LikeButtonOnProdPage({ id }) {

    const queryClient = useQueryClient();

    const mutationliking = useMutation({
        mutationFn: async (add) => {
            await API.graphql({
                query: updateProduct,
                variables: { input: { id: id, isLiked: add } }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prod', id] })
        },
    })
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['prod', id],
        queryFn: async () => {
            const var1 = await API.graphql({
                query: getProduct,
                variables: { id: id }
            });
            const var2 = var1.data.getProduct;
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
            {data.isLiked === "no" ? <Button onClick={() => { mutationliking.mutate("yes") }}><AddShoppingCartIcon /></Button> : <Button onClick={() => { mutationliking.mutate("no") }}><RemoveShoppingCartIcon /></Button>}
        </>
    )
};
