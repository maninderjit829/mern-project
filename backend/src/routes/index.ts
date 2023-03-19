import express from "express";
import * as libControllers from "../controllers/libControl";

const router: express.Router = express.Router();
//using router to retrieve our endpoints

/** End-points collection*/
router.get("/", libControllers.getBooks);

router.get("/:bookId", libControllers.getaBook);

router.post("/", libControllers.createBook);

router.patch("/:bookId", libControllers.updateBook);

router.delete("/:bookId", libControllers.deleteBook);

export default router;