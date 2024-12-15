import  {body}  from 'express-validator';


export const auditLogDataValidator = [
  // Validate user_id
  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("User_id should not be empty")
    .isMongoId()
    .withMessage("User_id should be a valid Mongo ID"),
  
  // Validate action_type
  body("action_type")
  .trim()
  .notEmpty()
  .withMessage("Action type should not be empty")
  .isString()
  .withMessage("Action type must be a string")
  .isIn(["login", "app_selection", "tab_conflict"])
  .withMessage("Action type must be one of 'login', 'app_selection', or 'tab_conflict'"),
  
  // Validate details
  body("details")
    .notEmpty()
    .withMessage("Details should not be empty")
    .custom(value => {
      if (typeof value !== "object" || Array.isArray(value)) {
        throw new Error("Details must be an object");
      }
      // Add specific key validations here
      if (!value.app_id || typeof value.app_id !== "string") {
        throw new Error("app_id is required and must be a string");
      }
      if (!value.app_name || typeof value.app_name !== "string") {
        throw new Error("app_name is required and must be a string");
      }
      return true;
    }),
];
