import React, { useState } from 'react';
import iconImg from "../images/icon-error.svg"

type formElement = React.FormEvent<HTMLFormElement>;

interface formState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const FormBox: React.FC = () => {
    const [formData, setFormData] = useState<formState>({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [firstNameError, setFirstNameError] = useState<boolean>(false);

    const [lastNameError, setLastNameError] = useState<boolean>(false);

    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [placeholder, setPlaceHolder] = useState<string>("Email Address");

    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
    const [showList, setShowList] = useState<boolean>(false)


    const submitHandler = (e: formElement): void => {
        e.preventDefault();
        // check if any of the info is missing

        setFirstNameError(formData.firstName ? false : true)
        setLastNameError(formData.lastName ? false : true)

        isEmailValid(formData.email);
        isPasswordValid(formData.password);

        if (formData.firstName && formData.lastName && !emailError && !passwordError) alert("Success");
    }

    const isEmailValid = (email: string): void => {
        const emailRegex: RegExp = /^[\w]+[^\s@]+@[^\s@.,]+\.+[^\s@.,]{2,}$/i;

        setEmailError((email && emailRegex.test(email)) ? false : true);
        setEmailErrorMessage(!email ? "Email cannot be empty" : "Looks like this is not an email")
        setPlaceHolder((email && emailRegex.test(email)) ? "Email Address" : "name@host.tld")
    }

    const isPasswordValid = (password: string): void => {
        const passwordRegex: RegExp = /.*?(?:[a-z].*?[0-9]|[0-9].*?[a-z]).*?/i;

        setPasswordError((password.length >= 8 && passwordRegex.test(password)) ? false : true);
        setPasswordErrorMessage(!password ? "Password cannot be empty" : "Invalid Password")
        setShowList(password && (password.length < 8 || !passwordRegex.test(password)) ? true : false)
    }

    return (
        <div className="form_box">
            <div className="text_above_form">
                <p data-testid="header_form"><strong>Try it free 7 days</strong> then $20/mo. thereafter</p>
            </div>

            <form onSubmit={submitHandler}>
                <div className="input_row">
                    <input data-testid="input_firstname" className={`input ${firstNameError ? "warn" : ""}`} type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} placeholder="First Name" />
                    {firstNameError &&
                        <>
                            <img data-testid="firstname_err_image" className="err_icon" src={iconImg} alt="error" />
                            <span data-testid="firstname_err_message" className="warning_span">First Name cannot be empty</span>
                        </>
                    }
                </div>
                <div className="input_row">
                    <input data-testid="input_lastname" className={`input ${lastNameError ? "warn" : ""}`} type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} placeholder="Last Name" />
                    {lastNameError &&
                        <>
                            <img data-testid="lastname_err_image" className="err_icon" src={iconImg} alt="error" />
                            <span data-testid="lastname_err_message" className="warning_span">Last Name cannot be empty</span>
                        </>

                    }
                </div>

                <div className="input_row">
                    <input data-testid="input_email" className={`input ${emailError ? "warn" : ""} email`} type="text" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder={placeholder} />
                    {emailError &&
                        <>
                            <img data-testid="email_err_image" className="err_icon" src={iconImg} alt="error" />
                            <span data-testid="email_err_message" className="warning_span">{emailErrorMessage}</span>
                        </>}
                </div>

                <div className="input_row">
                    <input data-testid="input_password" className={`input ${passwordError ? "warn" : ""}`} type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="Password" />
                    {passwordError &&
                        <>
                            <img data-testid="password_err_image" className="err_icon" src={iconImg} alt="error" />
                            <span data-testid="password_err_message" className="warning_span">{passwordErrorMessage}</span>
                        </>
                    }
                    {showList && <>
                        <ul>
                            <li>must be at least 8 characters long</li>
                            <li>must contain english alphabet characters</li>
                            <li>must contain numbers</li>
                        </ul>
                    </>}
                </div >
                <button data-testid="buttonEl">CLAIM YOUR FREE TRIAL</button>
                <span data-testid="form_span" className="form_bottom_span">By clicking the button, you are agreeing to our <a href="/">Terms and Services</a></span>
            </form>
        </div>
    );
}

export default FormBox;
