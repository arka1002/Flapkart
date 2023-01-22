import { useForm } from "react-hook-form";
import '@aws-amplify/ui-react/styles.css';
import { TextField, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

export default function Buy() {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        navigate("/buy/success");
    }
    const { route } = useAuthenticator((context) => [context.route]);
    if (route !== 'authenticated') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-8 py-10'>
                
                <TextField
                    descriptiveText="Enter a valid address"
                    placeholder="Address"
                    label="Address"
                    errorMessage={errors.name} {...register("address", { required: true })}
                    
                />



                {errors.address && <span className="text-red-700">This field is required</span>}

                <button type="submit" className="border-2 border-sky-500 rounded-lg w-20 block m-auto">Submit</button>
                <button onClick={() => { navigate(-1) }} className='border-2 border-sky-500 rounded-lg w-20 block m-auto'>Cancel</button>
            </form>
        </>
    );
};
