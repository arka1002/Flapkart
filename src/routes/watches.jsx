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



export default function Watches() {
    const watchList = useLoaderData();
    const [price, setPrice] = useState(watchList);


    function lessthanall() {
        const map1 = watchList.filter(prod => prod);
        setPrice(map1);
    }
    function lessthan500() {
        const map2 = watchList.filter(prod => prod.price < 500)
        setPrice(map2);
    }
    function lessthan1000() {
        const map3 = watchList.filter(prod => prod.price < 1000 && prod.price > 500)
        setPrice(map3);
    }
    function lessthan5000() {
        const map3 = watchList.filter(prod => prod.price < 5000 && prod.price > 1000)
        setPrice(map3);
    }



    return (
        <>
            <p>Price Range</p>
            <ul className="list-none mb-2">
                <li className="mt-2 ml-2"><Button onClick={lessthanall}>All</Button></li>
                <li className="mt-2 ml-2"><Button onClick={lessthan500}>₹0 - ₹500</Button></li>
                <li className="mt-2 ml-2"><Button onClick={lessthan1000}>₹500 - ₹1,000</Button></li>
                <li className="mt-2 ml-2"><Button onClick={lessthan5000}>₹10,000 - ₹15,000</Button></li>
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
                                        image={headphone.imageLink}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <NavLink to={`/product/${headphone.id}`}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                <div className="text-cyan-500">{headphone.name}</div>
                                            </Typography>
                                        </NavLink>


                                        <Typography variant="body2" color="text.secondary" component={'span'} >
                                            {headphone.description} <br />
                                            <span className="text-orange-500">Price :- {headphone.price}</span>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>

                                    </CardActions>
                                </Card>
                            </div>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
};
