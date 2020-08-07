const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const formcontrol = document.querySelector('#form-control');





// show error
const showError = (input, message) => {

    //selecting the parent element username >>> form-control element
    const formControl = input.parentElement;

    //adding className to a existing class more like overwriting, classname in this will not have prefix dots
    formControl.className = 'form-control error';
    //selecting smalltag for error display
    const small = formControl.querySelector('small');
    small.textContent = message;
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}





//checkRequired

const checkRequired = (inputArr) => {
    inputArr.forEach(input => {
        //trim is used to remove whitespaces
        if (input.value.trim() === '') {

            // dot id gives us the id of the html element
            showError(input, `${getFieldName(input)} is required`);

        } else {
            checkLength(username, 3, 10);
            checkLength(password, 8, 20);
            emailValidity(email);
            confirmPassword(password, password2);
        }
    })
}


const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} should be atleast ${min} characters `);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} should not be more than ${max} characters `)
    } else {
        showSuccess(input);
        passwordValidity(password);
    }
}


// check email validity

const emailValidity = (email) => {

    //regex for email will return true or false
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // making sure its string and lowercase
    if (re.test(String(email.value).toLowerCase())) {
        showSuccess(email)
    } else {
        showError(email, 'Please enter the correct email')
    }

}


//confirm password

const confirmPassword = (password, password2) => {
    if (password.value !== password2.value) {
        showError(password2, 'Password do not match')
    } else {
        showSuccess(password2);
    }
}

// check password

const passwordValidity = (password) => {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (reg.test(password.value)) {
        showSuccess(password)
    } else {
        showError(password, 'Password should be complicated')
    }
}




//to capitalize first letter
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}






// button event listener
form.addEventListener('submit', function (e) {
    // prevent the default value from submitting
    e.preventDefault();


    checkRequired([username, email, password, password2])

})