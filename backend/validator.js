import { body } from "express-validator";

const validateFormData = [
  body('firstName')
    .notEmpty()
    .withMessage('Поле "Имя" обязательно для заполнения')
    .isAlpha('ru-RU')
    .withMessage('Поле должно содержать только кириллицу'),
  body('lastName')
    .notEmpty()
    .withMessage('Поле "Фамилия" обязательно для заполнения')
    .isAlpha('ru-RU')
    .withMessage('Поле должно содержать только кириллицу'),
  body('patronymic')
    .optional({ nullable: true })
    .isAlpha('ru-RU')
    .withMessage('Поле должно содержать только кириллицу'),
  body('snils')
    .optional({ nullable: true })
    .isNumeric()
    .isLength({ min: 11, max: 11 })
    .withMessage('Снилс должен быть вида "123-456-789-12"'),
  body('position')
    .notEmpty()
    .withMessage('Поле "Должность" обязательно для заполнения'),
  body('tel')
    .notEmpty()
    .withMessage('Поле "Телефон" обязательно для заполнения')
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage('Телефон должен быть вида "+7-000-000-0000"'),
  body('email')
    .notEmpty()
    .withMessage('Поле "Электронная почта" обязательно для заполнения')
    .isEmail()
    .withMessage('Электронная почта должна быть вида "example@mail.ru"')
];

export default validateFormData;