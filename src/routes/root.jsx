import HomeIcon from '@mui/icons-material/Home';
import { Flex, Divider } from "@aws-amplify/ui-react";
import PersonIcon from '@mui/icons-material/Person';
import { Outlet } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);



export default function Root() {

    console.log(`Hi mom!!`);
    return (
        <>
            <div className="flex flex-row h-24 items-center justify-evenly">

                <h1 className='text-xl italic font-bold underline underline-offset-2'>Home <HomeIcon /> </h1>

                <h1 className='text-xl italic font-bold underline underline-offset-2'>My Profile <PersonIcon /> </h1>
            </div>
            <Flex direction="column">
                <Divider
                    orientation="horizontal" />
            </Flex>
            <div id="detail"><Outlet /></div>
        </>
    );
};
