import { useState } from "react";
import {  createUSerDocumentsFromAuth , signInWithGooglePopup , signInAuthUserWithEmailAndPAssword} from "../../utils/firebase/firebase-utils";
import Button from "../button/button-component";
import FormInput from "../form-input/form-input-component";
import './sign-in-styles.scss';

const defaultFormFields = {
    email :'',
    password :'',
}
const SignInForm = () => {
    const [ formFields , setFormFields] = useState(defaultFormFields);

    const{ email, password } = formFields;

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


        try{
          
            const response  = await signInAuthUserWithEmailAndPAssword(email , password);
            resetFormFields();  
         
        }
        catch(error){

            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect Password for Email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default :
                    console.log(error);

            }
        
        }
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef =  await createUSerDocumentsFromAuth(user)
       // console.log(user);
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an Account</h2>
            <span>Sign In  with your email and password</span>
            <form onSubmit={handleSubmit}>
        
                <FormInput label="Email" required type="email" onChange={handleChange} name='email'value={email}  />

                
                <FormInput label="Password" required type="password"  onChange={handleChange} name='password' value={password}  />

                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type='button' onClick={signInWithGoogle} buttonType='google' >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
