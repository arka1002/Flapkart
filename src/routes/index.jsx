import { Amplify } from "aws-amplify";
import awsExports from '../aws-exports';
import { useLoaderData, NavLink } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



Amplify.configure(awsExports);


export default function Index() {
    console.log(`From index.jsx`);
    //use loader data here
    const theList = useLoaderData();
    return (
        <Grid container spacing={2}>
            {
                theList.map((product) => (
                    <Grid item xs={12} md={3}>
                        <div className='flex justify-center'>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="#"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <NavLink to={`product/${product.id}`}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                    </NavLink>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <NavLink to={`products/${product.id}`}><Button size="small">Buy Now</Button></NavLink>
                                </CardActions>
                            </Card>
                        </div>
                    </Grid>
                ))
            }
        </Grid>
    );

};
