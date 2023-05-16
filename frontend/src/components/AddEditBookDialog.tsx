import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { book } from "../models/books";
import { BookInput } from "../network/books_api";
import * as BooksApi from "../network/books_api";
import InputFormField from "./form/InputFormField";

interface AddEditBookDialogProps {
  //close when click on cross
  onDismiss: () => void;

  //callback
  onBookSaved: (book: book) => void;

  //Book to edit
  bookToEdit?: book;
}

const AddEditBookDialog = ({
  onDismiss,
  onBookSaved,
  bookToEdit,
}: AddEditBookDialogProps) => {
  //using the hook functionality, the following is the format.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookInput>({
    defaultValues: {
      title: bookToEdit?.title || "",
      author: bookToEdit?.author || "",
      description: bookToEdit?.description || "",
    },
  });

  //the function handles submitting book and calling api endpoint
  //That means, the following function will execute the RESTAPI commands[CRUD],
  //and also takes the input in the modale further below in the way of forms.
  async function onSubmit(input: BookInput) {
    try {
      let bookResponse: book;
      if (bookToEdit) {
        bookResponse = await BooksApi.updateBook(bookToEdit._id, input);
      } else {
        bookResponse = await BooksApi.createBook(input);
      }
      onBookSaved(bookResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={() => onDismiss()}>
      <ModalHeader closeButton>
        <ModalTitle>{bookToEdit ? "Edit Book" : "Add book"}</ModalTitle>
      </ModalHeader>

      <Modal.Body>
        <Form id="addEditBookForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.author?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="LastName, MI, Firstname"
              isInvalid={!!errors.author}
              {...register("author", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.author?.message}
            </Form.Control.Feedback>
          </Form.Group> */}
          <InputFormField
            name="author"
            label="Author"
            type="text"
            placeholder="Author"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          {
            <Form.Group className="mb_3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                placeholder="Describe this book please..."
                {...register("description")}
              />
            </Form.Group>
          }
          {/* <InputFormField
            name="text"
            label="Description"
            as="textarea"
            rows={7}
            placeholder="Describe your book please..."
            register={register}
          /> */}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditBookForm" disabled={isSubmitting}>
          click to save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditBookDialog;
