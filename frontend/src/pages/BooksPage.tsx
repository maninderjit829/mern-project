import { Container } from "react-bootstrap";
import BooksPageLoggedInView from "../components/BooksPageLoggedInView";
import BooksPageLoggedOutView from "../components/BooksPageLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/BooksPage.module.css";

interface NotesPageProps {
    loggedInUser: User | null,
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
    return (
        <Container className={styles.notesPage}>
            <>
                {loggedInUser
                    ? <BooksPageLoggedInView />
                    : <BooksPageLoggedOutView />
                }
            </>
        </Container>
    );
}

export default NotesPage;