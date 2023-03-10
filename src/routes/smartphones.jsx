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
    );
};







