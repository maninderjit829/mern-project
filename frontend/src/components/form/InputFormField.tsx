import { Form, FormLabel } from "react-bootstrap";
import { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";

//an interface is declared so that we can use these elements in our form
//and register the text input with react hook form package
interface InputFormFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

const InputFormField = ({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: InputFormFieldProps) => {
  return (
    <Form.Group className="mb-3" controlId={name + "-input"}>
      <FormLabel>{label}</FormLabel>
      <Form.Control
        {...props}
        {...register(name, registerOptions)}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
export default InputFormField;
