import stylesOfBook from "../styles/Book.module.css";
import { Card } from "react-bootstrap";
import { book, book as bookModel } from "../models/books";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";

interface BookProps {
  book: bookModel;
  className?: string;
  onDeleteBookClicked: (book: bookModel) => void;
  onBookClicked: (book: bookModel) => void;
}

const Book = ({
  book,
  className,
  onDeleteBookClicked,
  onBookClicked,
}: BookProps) => {
  const { title, author, description, ISBN, downloadedAt, reviewedAt } = book;

  let createdUpdatedText: string;

  if (reviewedAt > downloadedAt) {
    createdUpdatedText = "Reviewed on: " + formatDate(reviewedAt);
  } else {
    createdUpdatedText = "Downloaded on: " + formatDate(downloadedAt);
  }

  return (
    <Card
      className={`${stylesOfBook.bookCover} ${className}`}
      onClick={() => onBookClicked(book)}
    >
      <Card.Body className={stylesOfBook.bookBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteBookClicked(book);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={stylesOfBook.bookText}>{author}</Card.Text>
        <Card.Subtitle className={stylesOfBook.bookText}>
          {description}
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer className="text-mute">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Book;
