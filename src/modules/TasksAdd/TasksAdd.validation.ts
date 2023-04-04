import * as Yup from 'yup';

export const validationScheme = Yup.object().shape({
  name: Yup.string().required('Обязательное поле!'),
  description: Yup.string().required('Обязательное поле!'),
  isImportant: Yup.bool().oneOf([true, false]),
});
