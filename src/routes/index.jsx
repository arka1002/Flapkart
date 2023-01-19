import { Amplify } from "aws-amplify";
import awsExports from '../aws-exports';
import { useLoaderData, NavLink } from "react-router-dom";
import HeadsetIcon from '@mui/icons-material/Headset';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WatchIcon from '@mui/icons-material/Watch';

Amplify.configure(awsExports);


export default function Index() {
    console.log(`From index.jsx`);
    //use loader data here
    const theList = useLoaderData();
    return (
        <div className="flex flex-col place-items-center md:flex-row md:justify-evenly mt-10 gap-y-4">
            <NavLink to={`/category/headphones`}><div className="p-3 border-4 border-sky-500 rounded-md"><HeadsetIcon/></div></NavLink>
            <div className="p-3 border-4 border-sky-500 rounded-md"><PhoneAndroidIcon/></div>
            <div className="p-3 border-4 border-sky-500 rounded-md"><RestaurantIcon/></div>
            <div className="p-3 border-4 border-sky-500 rounded-md"><WatchIcon/></div>
        </div>
    );

};
