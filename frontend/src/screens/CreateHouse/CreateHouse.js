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
import { createHouseAction } from "../../actions/housesAction";
import ErrorMessage from "../../components/Header/ErrorMessage";
import ReactMarkdown from "react-markdown";

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

function CreateHouse({ history }) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Namas" || "Daugiabutis");

  const dispatch = useDispatch();

  const houseCreate = useSelector((state) => state.houseCreate);
  const { error, house } = houseCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createHouseAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/");
  };

  useEffect(() => {}, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create House
        </Typography>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form className={classes.form} noValidate onSubmit={submitHandler}>
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
            defaultValue={category || ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"Daugiabutis"}>Daugiabutis</MenuItem>
            <MenuItem value={"Namas"}>Namas</MenuItem>
          </TextField>
          {console.log(category)}
          <Box display="flex" justifyContent="space-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Create House
            </Button>
            <Button
              onClick={resetHandler}
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Reset Fields
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  );
}

export default CreateHouse;
