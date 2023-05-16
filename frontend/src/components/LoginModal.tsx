import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { loginCredentials } from "../network/books_api";
import * as booksApi from "../network/books_api";
import styleUtils from "../styles/utils.module.css";
import InputFormField from "./form/InputFormField";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}
const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginCredentials>();
  async function onSubmit(credentials: loginCredentials) {
    try {
      const user = await booksApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputFormField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.name}
          />
          <InputFormField
            name="password"
            label="Password"
            type="Password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Log In Please!
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
