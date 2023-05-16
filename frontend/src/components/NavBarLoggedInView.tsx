import { User } from "../models/user";
import * as booksApi from "../network/books_api";
import { Button, Navbar } from "react-bootstrap";

interface NavBarLoggedInViewProps {
  user: User;
  onLogOutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogOutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await booksApi.logout();
      onLogOutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    //returning two items, so use <> 1. 2. </>
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Log Out</Button>
    </>
  );
};

export default NavBarLoggedInView;
