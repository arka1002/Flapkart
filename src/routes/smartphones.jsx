import { useLoaderData, NavLink } from "react-router-dom";
import { Flex, Divider, Button } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { getProduct } from "../graphql/queries";
import { updateProduct } from "../graphql/mutations";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';




export default function Smartphones() {
    const smartphonesList = useLoaderData();
    const [price, setPrice] = useState(smartphonesList);

    function lessthanall() {
        const map1 = smartphonesList.filter(prod => prod);
        setPrice(map1);
    }
    function lessthan5000() {
        const map2 = smartphonesList.filter(prod => prod.price < 5000)
        setPrice(map2);
    }
    function lessthan10000() {
        const map3 = smartphonesList.filter(prod => prod.price < 10000 && prod.price > 5000)
        setPrice(map3);
    }
    function lessthan15000() {
        const map3 = smartphonesList.filter(prod => prod.price < 15000 && prod.price > 10000)
        setPrice(map3);
    }




    return (
        <>
            <p>Price Range</p>
            <ul className="list-none mb-2">
                <li className="mt-2 ml-2"><Button onClick={lessthanall}>All</Button></li>
                <li className="mt-2 ml-2"><Button onClick={lessthan5000}>₹0 - ₹5,000</Button></li>
                <li className="mt-2 ml-2"><Button onClick={lessthan10000}>₹5,000 - ₹10,000</Button></li>
                <li className="mt-2 ml-2"><Button onClick={lessthan15000}>₹10,000 - ₹15,000</Button></li>
            </ul>
            <Flex direction="column">
                <Divider
                    orientation="horizontal" />
            </Flex>

            <Grid container spacing={2}>
                {
                    price.map((headphone) => (
                        <Grid item xs={12} md={3}>
                            <div className='flex justify-center' key={headphone.id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image="#"
                                        title="green iguana"
                                    />
                                    <CardContent>

                                        <Typography gutterBottom variant="h5" component="div">
                                            {headphone.name}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" component={'span'} >
                                            {headphone.description}
                                            <span>Price :- {headphone.price}</span>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <NavLink to={`/buy`}><Button>Buy</Button></NavLink>
                                        <CartButton id={headphone.id} />
                                    </CardActions>
                                </Card>
                            </div>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
};




function CartButton({ id }) {
    const queryClient = useQueryClient();
    const mutationliking = useMutation({
        mutationFn: async (add) => {
            await API.graphql({
                query: updateProduct,
                variables: { input: { id: id, isLiked: add } }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
        },
    })

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['carts', id],
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
    );
}
