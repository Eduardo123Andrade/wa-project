import * as Yup from "yup";

export const ArrayOfIdsShape = Yup.array().of(Yup.number())