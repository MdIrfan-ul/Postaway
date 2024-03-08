import { body, validationResult } from "express-validator";

const addValidationMiddleware = async (req, res, next) => {
  const rules = [
    body("caption").notEmpty().withMessage("Caption must be Entered"),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is Required to Upload a Post");
      }
      return true;
    })
  ];

  await Promise.all(rules.map(rule => rule.run(req)));

  const validationErrors = validationResult(req);

  // displaying the errors to the page
  if (!validationErrors.isEmpty()) {
    return res.status(400).send({ errorMessage: validationErrors.array()[0].msg });
  }

  next();
};

const userValidationMiddleware = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().isLength({ min: 8, max: 16 }).withMessage("Password must be 8-16 characters long")
  ];

  await Promise.all(rules.map(rule => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errorMessage: validationErrors.array()[0].msg });
  }

  next();
};

const loginValidationMiddleware = async (req, res, next) => {
  const rules = [
    body("email").notEmpty().isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().isLength({ min: 8, max: 16 }).withMessage("Password must be 8-16 characters long")
  ];

  await Promise.all(rules.map(rule => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errorMessage: validationErrors.array()[0].msg });
  }

  next();
};

export { addValidationMiddleware, userValidationMiddleware, loginValidationMiddleware };
