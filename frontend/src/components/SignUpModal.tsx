import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { signUpCredentials } from "../network/books_api";
import * as booksApi from "../network/books_api";
import styleUtils from "../styles/utils.module.css";
import { Button, Form, Modal, ModalBody } from "react-bootstrap";
import InputFormField from "./form/InputFormField";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpCredentials>();

  async function onSubmit(credentials: signUpCredentials) {
    try {
      const newUser = await booksApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputFormField
            name="username"
            label="Name"
            type="text"
            placeholder="Your full name"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.name}
          />
          {/* <InputFormField
            name="username"
            label="father's Name"
            type="text"
            placeholder="Father's name"
            register={register}
            registerOptions={{ required: "" }}
            error={errors.fathers_name}
          /> */}
          {/* <InputFormField
            name="text"
            label="Hobby"
            as="textarea"
            rows={7}
            placeholder="What are your hobbies and interests?"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.favorite_hobby}
          /> */}
          <InputFormField
            name="email"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <InputFormField
            name="password"
            label="Password"
            type="password"
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
            Sign Up!!
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
