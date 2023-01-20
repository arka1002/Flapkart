import { NavLink, useLoaderData } from "react-router-dom";
import { API } from "aws-amplify";
import { Flex, Divider, Button } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getProduct } from "../graphql/queries";
import { updateProduct } from "../graphql/mutations";

export default function Headphones() {
    //use the loader data
    const headphoneList = useLoaderData();
    const [state, setState] = useState(headphoneList);


    function lessthan1000() {
        const map1000 = headphoneList.filter(product => product.price < 1000);
        setState(map1000);
    }

    function lessthan5000() {
        const map5000 = headphoneList.filter(product => product.price < 5000 && product.price > 1000);
        setState(map5000);
    }

    function lessthan10000() {
        const map10000 = headphoneList.filter(product => product.price < 10000 && product.price > 5000);
        setState(map10000);
    }

    function lessthanall() {
        const mapAll = headphoneList.filter(product => product);
        setState(mapAll);
    }


    return (
        <>
            <p>Price Range</p>
            <ul className="list-none mb-2">
                <li className="mt-2 ml-2"><Button onClick={lessthanall}>All</Button></li>
                <li className="mt-2 ml-2"><Button onClick={lessthan1000}>₹0 - ₹1,000</Button></li>
                <li className="mt-2 ml-2"><Button onClick={lessthan5000}>₹1,000 - ₹5,000</Button></li>
                <li className="mt-2 ml-2"><Button onClick={lessthan10000}>₹5,000 - ₹10,000</Button></li>
            </ul>
            <Flex direction="column">
                <Divider
                    orientation="horizontal" />
            </Flex>

            <Grid container spacing={2}>
                {
                    state.map((headphone) => (
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
                                        <NavLink to={`/buy`}><Button>Buy</Button></NavLink><LikeButton id={headphone.id} isLiked={headphone.isLiked} />
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



function LikeButton({ id }) {
    const queryClient = useQueryClient();

    const mutationliking = useMutation({
        mutationFn: async (add) => {
            await API.graphql({
                query: updateProduct,
                variables: { input: { id: id, isLiked: add } }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['likes'] })
        },
    })


    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['likes', id],
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
            {data.isLiked === "no" ? <Button onClick={() => {mutationliking.mutate("yes")}}><ThumbUpIcon /></Button> : <Button onClick={() => {mutationliking.mutate("no")}}><ThumbDownAltIcon /></Button>}
        </>
    );
}