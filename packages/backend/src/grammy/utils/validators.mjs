import yup from 'yup';
export const numberSchema = yup.number().required().positive();