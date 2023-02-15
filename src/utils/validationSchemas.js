import * as Yup from 'yup';

export const LOGIN_SCHEMA = Yup.object().shape({
    documento: Yup.number()
        .required("Documento es requerido"),
      password: Yup.string()
        .min(8, "debe tener al menos 8 caracteres")
        .max(15, "debe tener máximo 15 caracteres")
        .required("Contraseña es requerida"),
});