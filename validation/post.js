const Validator = require('validator');
const isEmpty = require('./is-empty');

const validatePostInput = data => {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.content = !isEmpty(data.content) ? data.content : '';

    if(!Validator.isLength(data.title, { min: 6})){
        errors.title = 'Title must have 6 chars';
    }

    if(Validator.isEmpty(data.title)){
        errors.title = 'Title is required';
    }

    if(!Validator.isLength(data.content, { min: 10})){
        errors.content = 'Content must have 10 chars';
    }

    if(Validator.isEmpty(data.content)){
        errors.content = 'Content is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validatePostInput;