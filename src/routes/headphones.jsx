import { useLoaderData } from "react-router-dom";
import { Flex, Divider, Button } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


export default function Headphones() {
    //use the loader data
    const headphoneList = useLoaderData();
    const map1 = headphoneList.map(x => x.price).sort((a, b) => a - b);
    console.log(headphoneList);
    console.log(map1);

    return (
        <>
            <p>Price Range</p>
            <ul className="list-none mb-2">
                <li className="mt-2 ml-2"><Button>All</Button></li>
                <li className="mt-2 ml-2"><Button>₹0 - ₹1,000</Button></li>
                <li className="mt-2 ml-2"><Button>₹1,000 - ₹5,000</Button></li>
                <li className="mt-2 ml-2"><Button>₹5,000 - ₹10,000</Button></li>
            </ul>
            <Flex direction="column">
                <Divider
                    orientation="horizontal" />
            </Flex>

            <Grid container spacing={2}>
                {
                    headphoneList.map((headphone) => (
                        <Grid item xs={12} md={3}>
                            <div className='flex justify-center'>
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

                                        <Typography variant="body2" color="text.secondary">
                                            {headphone.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button>Buy</Button>
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
