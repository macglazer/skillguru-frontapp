import { Resolver } from "react-hook-form";
import { AddQuestionFormTypes } from "./AddQuestionPopup";

export const resolver: Resolver<AddQuestionFormTypes> = async (values) => {
  type ErrorTypes = { [key: string]: { type: string; message: string } };
  const errors: ErrorTypes = {};

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(values.email))
    errors.email = {
      type: "incorect",
      message: "Podany e-mail jest nieprawidłowy",
    };

  if (!values.email)
    errors.email = {
      type: "incorect",
      message: "E-mail jest wymagany",
    };

  if (values.message.length < 20)
    errors.message = {
      type: "required length",
      message: "Treść wiadomości jest za krótka",
    };
  if (!values.message)
    errors.message = {
      type: "required",
      message: "Treść wiadomości jest wymagana",
    };

  return {
    values: values.email && values.message ? values : {},
    errors: errors.message || errors.email ? errors : {},
  };
};
