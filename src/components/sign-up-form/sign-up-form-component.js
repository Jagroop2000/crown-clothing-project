import { useState , useContext } from "react";
import { UserContext } from "../../context/user-context";
import { createAuthUserWithEmailAndPassword , createUSerDocumentsFromAuth } from "../../utils/firebase/firebase-utils";
import Button from "../button/button-component";
import FormInput from "../form-input/form-input-component";
import './sign-up-form-styles.scss';

const defaultFormFields = {
    displayName :'',
    email :'',
    password :'',
    confirmPassword:''
}
const SignUpForm = () => {
    const [ formFields , setFormFields] = useState(defaultFormFields);

    const{ displayName , email, password , confirmPassword} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const handleChange =(event) =>{
        const {name , value} = event.target;
        setFormFields({...formFields,[name] : value});
        console.log(formFields);


    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(password != confirmPassword){
            alert("Password do not match");
            return;
        }

        try{

        const {user} = await createAuthUserWithEmailAndPassword(email , password);
        setCurrentUser(user);
        await createUSerDocumentsFromAuth(user , { displayName});
        resetFormFields();
         
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot Create User , Email Already in Use !!')
            }else {

            console.log(error);
            }
        }
    }

    return(
        <div className="sign-up-container">
            <h2>Dont' have an account</h2>
            <span>Sign up  with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" required type='text' onChange={handleChange} name='displayName' value={displayName} />

                
                <FormInput label="Email" required type="email" onChange={handleChange} name='email'value={email}  />

                
                <FormInput label="Password" required type="password"  onChange={handleChange} name='password' value={password}  />

               
                <FormInput label="Confirm Password" required type="password"  onChange={handleChange} name='confirmPassword' value={confirmPassword}  />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;
