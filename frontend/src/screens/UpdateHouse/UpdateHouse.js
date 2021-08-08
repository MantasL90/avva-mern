import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
} from "@material-ui/core/";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  updateHouseAction,
  deleteHouseAction,
} from "../../actions/housesAction";
import ErrorMessage from "../../components/Header/ErrorMessage";
import ReactMarkdown from "react-markdown";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Avva Database {new Date().getFullYear()}
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    width: "49%",
  },
}));

function UpdateHouse({ match, history }) {
  const classes = useStyles();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();

  const dispatch = useDispatch();

  const houseUpdate = useSelector((state) => state.houseUpdate);
  const { error } = houseUpdate;

  const houseDelete = useSelector((state) => state.houseDelete);
  const { error: errorDelete, success: successfullyDeleted } = houseDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteHouseAction(id));
    }
    history.push("/");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
    };

    fetching();
  }, [match.params.id]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateHouseAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit House
        </Typography>
        {errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form className={classes.form} noValidate onSubmit={updateHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content"
            label="Content"
            name="content"
            autoComplete="content"
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {content && (
            <Card>
              <CardHeader
                titleTypographyProps={{ variant: "subtitle1" }}
                title="House preview"
              />
              <CardContent>
                <ReactMarkdown>{content}</ReactMarkdown>
              </CardContent>
            </Card>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            select
            name="category"
            label="Category"
            id="category"
            autoComplete="category"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          ></TextField>

          <Box display="flex" justifyContent="space-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Update House
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete House
            </Button>
          </Box>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default UpdateHouse;
