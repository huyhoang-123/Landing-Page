const elements = {
    coverImg: document.querySelector('.cover-img'),
    pageTitle: document.getElementById('page-title'),
    formLogin: document.querySelector('.login-form'),
    formRegister: document.querySelector('.register-form'),
    loginImg: document.querySelector('.login-img'),
    registerImg: document.querySelector('.register-img'),
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

const getScreenMode = (screen) => {
    elements.pageTitle.textContent = screen;
    elements.coverImg.classList.toggle('active');
    handleViewChange();
}

handleViewChange();

const checkRequired = (value, requiredMessage) => {
    if (value.trim() === "") {
        return requiredMessage;
    }
    return null;
}

const validateConfig = {
    name: {
        requiredMessage: 'Full name is required',
    },
    email: {
        requiredMessage: 'Email is required',
        messages: {
            invalid: 'Invalid email format'
        },
        formats: {
            invalid: (value) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        }
    },
    address: {
        requiredMessage: 'Address is required'
    },

    phone: {
        requiredMessage: 'Phone number is required',
        messages: {
            invalid: 'Invalid phone number format'
        },
        formats: {
            invalid: (value) => !/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)
        }
    },

    password: {
        requiredMessage: 'Password is required',
        messages: {
            minLength: 'Password must be at least 8 characters',
            maxLength: 'Password must be less than 20 characters',
            format: 'Password must contain uppercase, lowercase and number'
        },
        formats: {
            minLength: (value) => value.length < 8,
            maxLength: (value) => value.length > 20,
            format: (value) => !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$/.test(value)
        }
    },

    confirmPassword: {
        requiredMessage: 'Confirm password is required',
        messages: {
            notMatch: 'Password does not match'
        },
        formats: {
            notMatch: (value, compareValue) => value.trim() !== '' && value !== compareValue
        }
    }

}

const createValidationRule = (fieldType, selector, compareCallback = null) => {
    const config = validateConfig[fieldType];

    if (!config) {
        throw new Error(`Validation config for '${fieldType}' not found`);
    }

    return {
        selector,
        test: (value) => {
            const requiredError = checkRequired(value, config.requiredMessage);
            if (requiredError) {
                return requiredError;
            }
            if (config.formats) {
                for (const [formatType, formatFn] of Object.entries(config.formats)) {

                    let isInvalid;

                    // Special case cho confirmPassword
                    if (fieldType === 'confirmPassword' && formatType === 'notMatch') {
                        isInvalid = formatFn(value, compareCallback ? compareCallback() : '');
                    } else {
                        isInvalid = formatFn(value);
                    }

                    if (isInvalid) {
                        return config.messages[formatType];
                    }
                }
            }
            return ''; // No error
        }
    };

}

// Validator function to handle form validation
const validator = (options) => {

    const registerForm = document.forms[options.form];
    const submitButton = registerForm.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');

    if (!registerForm) {
        throw new Error(`Form with name ${options.form} not found`);
    }
    const validateField = (input, error, rule) => {
        const errorMsg = rule.test(input.value);
        error.textContent = errorMsg;
        input.classList.toggle('error', !!errorMsg);
        return !errorMsg;
    };

    const checkFormValidity = () => {
        const isValid = options.rules.every(rule => {

            const input = registerForm[rule.selector];
            if (!input || !input.value.trim()) return false; // Required fields must have value
            return !rule.test(input.value); // No error message = valid
        });

        if (submitButton) {
            submitButton.disabled = !isValid;
            submitButton.style.opacity = isValid ? '1' : '0.5';
            submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
        }

        return isValid;
    };
    // Loop through each rule and set up validation
    options.rules.forEach(rule => {
        const input = registerForm[rule.selector];
        const error = input?.parentElement.querySelector('.form-validation__error-msg');
        if (input && error) {
            input.onblur = () => {
                validateField(input, error, rule);
                checkFormValidity();
            }
            input.oninput = () => {
                if (input.classList.contains('error')) {
                    error.textContent = '';
                    input.classList.remove('error');
                }
                checkFormValidity();
            };
        }
    });


    checkFormValidity();
    registerForm.onsubmit = (e) => {
        e.preventDefault();

        const isValid = options.rules.every(rule => {
            const input = registerForm[rule.selector];
            const error = input?.nextElementSibling;
            return input && error ? validateField(input, error, rule) : true;
        });

        if (isValid) {
            alert('Form submitted successfully!');
            resetForm();
        } else {
            form.querySelector('.error')?.focus();
        }
    };
}

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

validator.validateName = (selector) => createValidationRule('name', selector)
validator.validateEmail = (selector) => createValidationRule('email', selector)
validator.validateAddress = (selector) => createValidationRule('address', selector)
validator.validatePhoneNumber = (selector) => createValidationRule('phone', selector)
validator.validatePassword = (selector) => createValidationRule('password', selector)
validator.validateConfirmPassword = (selector, checkPw) => createValidationRule('confirmPassword', selector, checkPw)


document.addEventListener('DOMContentLoaded', () => {
    validator({
        form: 'register',
        rules: [
            validator.validateName('fullname'),
            validator.validateEmail('email'),
            validator.validateAddress('address'),
            validator.validatePhoneNumber('phone-number'),
            validator.validatePassword('password'),
            validator.validateConfirmPassword('confirm-password', checkPassword = () => {
                const password = document.querySelector('input[name="password"]').value;
                return password;
            })
        ]
    })
})

