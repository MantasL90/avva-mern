import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { listHouses, deleteHouseAction } from "../../actions/housesAction";
import ErrorMessage from "../../components/Header/ErrorMessage";
import ReactMarkdown from "react-markdown";

import {
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
} from "@material-ui/core";
import "./Houses.css";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "auto",
    borderRadius: 0,
  },
  title: { flex: 1, alignSelf: "center", fontSize: "18", color: "black" },
  danger: {
    backgroundColor: "#ff4136",
    color: "#fff",
    textTransform: "none",
    marginLeft: 5,
    "&$danger:hover": {
      backgroundColor: "#FC1C10",
    },
  },

  primary: {
    backgroundColor: "#158cba",
    color: "#fff",
    textTransform: "none",
    "&$primary:hover": {
      backgroundColor: "#04B0F1",
    },
  },
  desc: { display: "block", backgrounColor: "#f2f6fc" },
}));

function Houses({ search }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const houseList = useSelector((state) => state.houseList);
  const { error, houses } = houseList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const houseCreate = useSelector((state) => state.houseCreate);
  const { success: successfullyCreated } = houseCreate;

  const houseUpdate = useSelector((state) => state.houseUpdate);
  const { success: successfullyUpdated } = houseUpdate;

  const houseDelete = useSelector((state) => state.houseDelete);
  const { error: errorDelete, success: successfullyDeleted } = houseDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteHouseAction(id));
    }
    history.push("/");
  };

  useEffect(() => {
    dispatch(listHouses());
    if (!userInfo) {
      history.push("/login");
    }
  }, [
    dispatch,
    successfullyCreated,
    history,
    userInfo,
    successfullyUpdated,
    successfullyDeleted,
  ]);

  const comparefunction = (a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  };

  return (
    <div className="houses-page">
      {errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {houses &&
        houses
          .filter((filteredHouse) =>
            filteredHouse.title.toLowerCase().includes(search.toLowerCase())
          )
          .sort(comparefunction)
          .map((house, i) => (
            <Accordion key={i}>
              <AccordionSummary>
                <Typography className={classes.title}>{house.title}</Typography>
                <Button
                  href={`/house/${house._id}`}
                  size="small"
                  className={classes.primary}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  className={classes.danger}
                  onClick={() => deleteHandler(house._id)}
                >
                  Delete
                </Button>
              </AccordionSummary>
              <AccordionDetails className={classes.desc}>
                <ReactMarkdown>{house.content}</ReactMarkdown>
                <Grid>
                  <Chip label={house.category} variant="outlined" />
                  <Typography variant="caption" style={{ marginLeft: 120 }}>
                    Updated : {house.createdAt.substring(0, 10)}
                  </Typography>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
    </div>
  );
}

export default Houses;
