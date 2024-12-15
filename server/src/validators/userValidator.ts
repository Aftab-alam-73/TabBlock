import  {body}  from 'express-validator';

export const loginDataValidator=[
    body("email").trim().notEmpty().withMessage("Email should not be empty").isEmail().withMessage("Email should be a valid email address"),
    body("username").trim().notEmpty().withMessage("Username should not be empty").isString(),
    body("profile").trim().notEmpty().withMessage("Profile should not be empty").isString(),
]