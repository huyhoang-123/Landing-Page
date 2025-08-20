const elements = {
coverImg : document.querySelector('.cover-img'),
 pageTitle : document.getElementById('page-title'),
 formLogin : document.querySelector('.login-form'),
 formRegister : document.querySelector('.register-form'),
 loginImg : document.querySelector('.login-img'),
 registerImg : document.querySelector('.register-img'),
};

const handleViewChange = () => {
    const isMobile = window.innerWidth <= 768;
    const isLogin = elements.pageTitle.textContent === 'Login';

    elements.coverImg.style.display = isMobile ? 'none' : 'block';
    elements.formLogin.style.display = (isMobile && !isLogin) ? 'none' : 'block';
    elements.formRegister.style.display = (isMobile && isLogin) ? 'none' : 'block';

    if (!isMobile) {
        elements.loginImg.style.display = isLogin ? 'block' : 'none';
        elements.registerImg.style.display = isLogin ? 'none' : 'block';
    }
}

window.addEventListener("resize", handleViewChange);
const navigate = (url) => {

    window.location.href = url;
};


const getScreenMode = (screen) => {
    elements.pageTitle.textContent = screen;
    elements.coverImg.classList.toggle('active');
    handleViewChange();
}

handleViewChange()

// Validator function to handle form validation
const validator = (options) => {

    const registerForm = document.forms[options.form];

    if (!registerForm) {
        throw new Error(`Form with name ${options.form} not found`);
    }
    const validate = (input, error, rule) => {
        if (input) {
            // add event listenser for input and blur events
            input.onblur = () => {
                const errorMsg = rule.test(input.value);
                if (errorMsg) {
                    error.textContent = errorMsg;
                    input.classList.add('error');
                } else {
                    error.textContent = '';
                    input.classList.remove('error');

                }

                // Add an input event listener to clear the error message when the user types
                input.oninput = () => {
                    if (errorMsg) {
                        error.textContent = '';
                        input.classList.remove('error');
                    } else {
                        error.textContent = '';
                        input.classList.remove('error');
                    }
                }
                return !errorMsg;
            }

        }

    }
    // Loop through each rule and set up validation
    options.rules.forEach(rule => {
        const inputElement = registerForm[rule.selector];
        const errorElement = inputElement.nextElementSibling;

        validate(inputElement, errorElement, rule);


    });
    registerForm.onsubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        options.rules.forEach(rule => {
            const inputElement = registerForm[rule.selector];
            const errorElement = inputElement.nextElementSibling;
            validate(inputElement, errorElement, rule);
            const errorMsg = errorElement.textContent;
            if (errorMsg) {
                isValid = false; // If any error message exists, set isValid to false
            }

        });
        if (isValid) {
            alert('Form submitted successfully!');
            resetForm(); // Reset the form if all validations pass
        }


    }

}




validator.validateName = (selector) => {

    return {
        selector: selector,
        test: (value) => {
            return value.trim() === '' ? 'Full name is required' : '';
        }
    }
};
validator.validateEmail = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() === '' ? 'Email is required' :
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? 'Invalid email format' : '';
        }
    }
};
validator.validateAddress = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() === '' ? 'Address is required' : '';
        }
    }
};
validator.validatePhoneNumber = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() === '' ? 'Phone number is required' :
                /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value) ? '' : 'Invalid phone number format';
        }
    }
};
validator.validatePassword = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() === '' ? 'Password is required' :
                value.length < 8 ? 'Password must be at least 8 characters' :
                    value.length > 20 ? 'Password must be less 20 characters' :
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$/.test(value) ? '' : 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one number';
        }
    }
};
validator.validateConfirmPassword = (selector, callback) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() === '' ? 'Confirm password is required' :
                value !== callback() ? 'Password does not match' : '';
        }
    }
};

const resetForm = () => {
    const form = document.forms['register'];
    form.reset();
    const errorMessages = document.querySelectorAll('.form-validation__error-msg');
    errorMessages.forEach(msg => {
        msg.textContent = '';
    });
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}