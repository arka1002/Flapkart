import { Amplify } from "aws-amplify";
import awsExports from '../aws-exports';



Amplify.configure(awsExports);



export default function Product() {
    return <p>Hello world</p>
};
