import React, { useState } from 'react';
import iconImg from "../images/icon-error.svg"

type formElement = React.FormEvent<HTMLFormElement>;

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface ErrorState {
    firstNameError: boolean,
    lastNameError: boolean,
    emailError: boolean,
    passwordError: boolean
}

const FormBox: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const { firstName, lastName, email, password } = formData;

    const onChange = (e: { target: { name: any; value: any; }; }): void => setFormData({ ...formData, [e.target.name]: e.target.value })

    const [inputErr, setInputError] = useState<ErrorState>({
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false
    });

    const { firstNameError, lastNameError, emailError, passwordError } = inputErr;

    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [placeholder, setPlaceHolder] = useState<string>("Email Address");

    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
    const [showList, setShowList] = useState<boolean>(false)


    const submitHandler = (e: formElement): void => {
        e.preventDefault();

        Object.keys(formData).map(ele => setInputError(prevState => ({ ...prevState, [`${ele}Error`]: isDataValid(ele) })));

        if (firstName && lastName && !emailError && !passwordError) alert("Success");
    }

    const isDataValid = (ele: string): boolean => {
        if (ele === "email") {
            const emailRegex: RegExp = /^[\w]+[^\s@]+@[^\s@.,]+\.+[^\s@.,]{2,}$/i;
            setPlaceHolder(email && emailRegex.test(email) ? "Email Address" : "name@host.tld")

            if (email && emailRegex.test(email)) return false;
            setEmailErrorMessage(!email ? "Email cannot be empty" : "Looks like this is not an email")

            return true;
        } else if (ele === "password") {
            const passwordRegex: RegExp = /.*?(?:[a-z].*?[0-9]|[0-9].*?[a-z]).*?/i;
            setShowList(password && (password.length < 8 || !passwordRegex.test(password)) ? true : false)
            if (password.length >= 8 && passwordRegex.test(password)) return false;

            setPasswordErrorMessage(!password ? "Password cannot be empty" : "Invalid Password")
            return true;
        } else {
            if (ele === "firstName" && firstName) return false;

            if (ele === "lastName" && lastName) return false;

            return true;
        }
    }

    return (

        <div className="form_box">
            <div className="text_above_form">
                <p data-testid="header_form"><strong>Try it free 7 days</strong> then $20/mo. thereafter</p>
            </div>

            <form onSubmit={submitHandler}>
                <div className="input_row">
                    <input data-testid="input_firstname"
                        name="firstName"
                        className={`input ${firstNameError ? "warn" : ""}`}
                        type="text" value={firstName}
                        onChange={onChange}
                        placeholder="First Name"
                    />
                    {firstNameError &&
                        <>
                            <img data-testid="firstname_err_image" className="err_icon" src={iconImg} alt="error" />
                            <span data-testid="firstname_err_message" className="warning_span">First Name cannot be empty</span>
                        </>
                    }
                </div>
                <div className="input_row">
                    <input data-testid="input_lastname"
                        name="lastName"
                        className={`input ${lastNameError ? "warn" : ""}`}
                        type="text" value={lastName}
                        onChange={onChange}
                        placeholder="Last Name"
                    />
                    {lastNameError &&
                        <>
                            <img data-testid="lastname_err_image" className="err_icon" src={iconImg} alt="error" />
                            <span data-testid="lastname_err_message" className="warning_span">Last Name cannot be empty</span>
                        </>

                    }
                </div>

                <div className="input_row">
                    <input data-testid="input_email"
                        name="email"
                        className={`input ${emailError ? "warn" : ""} email`}
                        type="text" value={email}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                    {emailError &&
                        <>
                            <img data-testid="email_err_image" className="err_icon" src={iconImg} alt="error" />
                            <span data-testid="email_err_message" className="warning_span">{emailErrorMessage}</span>
                        </>}
                </div>

                <div className="input_row">
                    <input data-testid="input_password"
                        name="password"
                        className={`input ${passwordError ? "warn" : ""}`}
                        type="password" value={password}
                        onChange={onChange}
                        placeholder="Password"
                    />
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
