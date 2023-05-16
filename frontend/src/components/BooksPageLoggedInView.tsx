import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditBookDialog from "./AddEditBookDialog";
import Book from "./Book";
import { book as bookModel } from "../models/books";
import * as BooksApi from "../network/books_api";
import styles from "../styles/BooksPage.module.css";
import styleUtils from "./styles/utils.module.css";


const BooksPageLoggedInView = () => {
    /**our react states*/
  const [books, setBooks] = useState<bookModel[]>([]);
  //const [clickCount, setClickCount] = useState(0);
  const [showAddBookDialog, setShowAddBookDialog] = useState(false);

  //show the edit version of our book
  const [bookToEdit, setBookToEdit] = useState<bookModel | null>(null);

  //state of the application when the books or book objects are loading
  const [loadingQuery, setLoadingQuery] = useState(true);

  const [showLoadQueryError, setShowLoadQueryError] = useState(false);


  useEffect(() => {
    async function loadBooks() {
      try {
        setShowLoadQueryError(false);
        setLoadingQuery(true);
        const books = await BooksApi.fetchBooks();
        setBooks(books);
      } catch (error) {
        console.error(error);
        setShowLoadQueryError(true);
      } finally {
        setLoadingQuery(false);
      }
    }
    loadBooks();
  }, []);

  
  async function deleteBook(book: bookModel) {
    try {
      await BooksApi.deleletBook(book._id);
      setBooks(books.filter((existingBook) => existingBook._id !== book._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

    //our grid of books, which is mapified to our frontend by making a fetch books request

  const booksGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.booksGrid}`}>
      {books.map((book) => (
        <Col key={book._id}>
          <Book
            book={book}
            className={styles.book}
            onDeleteBookClicked={deleteBook}
            onBookClicked={setBookToEdit}
          />
        </Col>
      ))}
    </Row>


  );

    return ( 
    <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddBookDialog(true)}
      >
        <FaPlus />
        Enter the book you read!
      </Button>

      { loadingQuery && <Spinner animation="border" variant="primary" />}
      
      {showLoadQueryError && (
        <p>
          "something went wrong when loading the books from the server. Try refresh or fix the error by yourself! mf!!"
          ""
        </p>
      )}
      {!loadingQuery && !showLoadQueryError && (
        <>
          {books.length > 0 ? (
            booksGrid
          ) : (
            <p> you must include books to your database! mf!!</p>
          )}
        </>
      )}

      {showAddBookDialog && (
        <AddEditBookDialog
          onDismiss={() => setShowAddBookDialog(false)}
          onBookSaved={(newBook) => {
            setBooks([...books, newBook]);
            setShowAddBookDialog(false);
          }}
        />
      )}
      {bookToEdit && (
        <AddEditBookDialog
          setBookToEdit={bookToEdit}
          onDismiss={() => setBookToEdit(null)}
          onBookSaved={(updateBook) => {
            setBooks(
              books.map((existingBook) =>
                existingBook._id === updateBook._id ? updateBook : existingBook
              )
            );
            setBookToEdit(null);
          }}
        />
      )} 
    );
}
 
export default BooksPageLoggedInView;