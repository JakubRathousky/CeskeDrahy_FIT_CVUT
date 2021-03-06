import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TrainIcon from "@material-ui/icons/Train";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Box from "@material-ui/core/Box";
import { getConnections } from "../data/connections";
import ResultCard from "./ResultCard";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    this.state = {
      from: "",
      to: "",
      searchHistory: [],
      buyHistory: [],
      date: currentDate,
      direction: 0,
      dayOfDeparture: "0",
      time: currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      hasError: false,
      before: null,
      actual: null,
      future: [],
    };
  }

  componentDidMount() {
    this.findResults();
  }
  convertTarif = (number) => {
    if (number === 10) return "dospělý";
    if (number === 20) return "senior";
    if (number === 30) return "junior";
    return "";
  };

  findResults = () => {
    let connections = getConnections(
      this.props.formState.from,
      this.props.formState.to
    );
    let before;
    let actual = null;
    let future = [];
    let result;

    if (this.props.formState.direction === "1") {
      result = connections.sort((x, y) =>
        new Date(x.odjezd) > new Date(y.odjezd) ? -1 : 1
      );
      result.forEach((x) => {
        if (
          new Date("1970-01-01 " + x.odjezd) >=
            new Date("1970-01-01 " + this.props.formState.time) &&
          actual == null
        ) {
          actual = x;
        } else if (
          new Date("1970-01-01 " + x.odjezd) >
            new Date("1970-01-01 " + this.props.formState.time) &&
          future.length < 2
        ) {
          future.push(x);
        } else if (
          new Date("1970-01-01 " + x.odjezd) <
          new Date("1970-01-01 " + this.props.formState.time)
        ) {
          before = x;
        }
      });
    } else {
      result = connections.sort((x, y) =>
        new Date(x.prijezd) > new Date(y.prijezd) ? -1 : 1
      );
      console.log(result);
      result.forEach((x) => {
        if (
          new Date("1970-01-01 " + x.prijezd) >=
            new Date("1970-01-01 " + this.props.formState.time) &&
          actual == null
        ) {
          actual = x;
        } else if (
          new Date("1970-01-01 " + x.prijezd) <=
          new Date("1970-01-01 " + this.props.formState.time)
        ) {
          before = x;
        } else if (future.length < 2) {
          future.push(x);
        }
      });
    }
    let nextDay = new Date();
    if (before == null) {
      nextDay.setDate(this.props.formState.date.getDate() - 1);
      // before = result[result.length - 1];
      // before.vlak.forEach((x) =>
      //   x.stanice.forEach((y) => (y.alteredTime = this.setTime(y.cas, nextDay)))
      // );
    } else {
      before.vlak.forEach((x) =>
        x.stanice.forEach(
          (y) =>
            (y.alteredTime = this.setTime(y.cas, this.props.formState.date))
        )
      );
    }

    if (actual == null) {
      nextDay.setDate(this.props.formState.date.getDate() + 1);
      actual = result[0];
      actual.vlak.forEach((x) =>
        x.stanice.forEach((y) => (y.alteredTime = this.setTime(y.cas, nextDay)))
      );
      future.push(result[1]);
      future[0].vlak.forEach((x) =>
        x.stanice.forEach((y) => (y.alteredTime = this.setTime(y.cas, nextDay)))
      );
      future.push(result[2]);
      future[1].vlak.forEach((x) =>
        x.stanice.forEach((y) => (y.alteredTime = this.setTime(y.cas, nextDay)))
      );
    } else {
      actual.vlak.forEach((x) =>
        x.stanice.forEach(
          (y) =>
            (y.alteredTime = this.setTime(y.cas, this.props.formState.date))
        )
      );

      if (future.length !== 0) {
        future[0]?.vlak.forEach((x) =>
          x.stanice.forEach(
            (y) =>
              (y.alteredTime = this.setTime(y.cas, this.props.formState.date))
          )
        );
        future[1]?.vlak.forEach((x) =>
          x.stanice.forEach(
            (y) =>
              (y.alteredTime = this.setTime(y.cas, this.props.formState.date))
          )
        );
      }
    }
    if (future.length === 0) {
      nextDay.setDate(this.props.formState.date.getDate() + 1);
      future.push(result[0]);
      future[0].vlak.forEach((x) =>
        x.stanice.forEach((y) => (y.alteredTime = this.setTime(y.cas, nextDay)))
      );
      future.push(result[1]);
      future[1].vlak.forEach((x) =>
        x.stanice.forEach((y) => (y.alteredTime = this.setTime(y.cas, nextDay)))
      );
    }

    this.setState({ before: before, actual: actual, future: future });
  };

  dateFormat = (date) => {
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  };

  setTime = (time, nextDay) => {
    return time + ", " + this.dateFormat(nextDay);
  };

  render() {
    console.log(this.props);
    return (
      <Grid container>
        <Grid item xs={12} sm={6} md={2}></Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4} align="center">
                    <Box border={1} borderRadius={16} className="tlacitko">
                      <Button
                        type="submit"
                        size={"large"}
                        fullWidth={true}
                        onClick={() => this.props.showForm(false)}
                      >
                        <EditIcon />
                        <Box mx={1}>
                          <Typography> Upravit vyhledávání </Typography>
                        </Box>
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Box mx={1}>
                      <Typography align="center">
                        Hledaný čas: {this.props.formState.time}, {this.props.formState.date.toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center">
                    <Box border={1} borderRadius={16} className="tlacitko">
                      <Button
                        type="submit"
                        fullWidth={true}
                        size={"large"}
                        onClick={() => this.props.showForm(true)}
                      >
                        <SearchIcon />
                        <Box mx={1}>
                          <Typography>Nové vyhledání</Typography>
                        </Box>
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ResultCard
                connection={this.state.actual}
                isActual={true}
                showCart={() => this.props.showCart(this.state.actual)}
              />
            </Grid>
            {this.state.future.map((x) => (
              <Grid item xs={12}>
                <ResultCard
                  connection={x}
                  isActual={false}
                  showCart={() => this.props.showCart(x)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              {this.props.isFromCart ? (
                <Box border={1} ml={1} my={11} align="center">
                  <Grid item xs={12}>
                    <Typography>
                      <Box align="center" fontWeight="fontWeightBold">
                        Uložená data:
                      </Box>
                    </Typography>
                  </Grid>
                  {this.props.tickets.map((x) => {
                    return (
                      <Grid item xs={12}>
                        <Box mx={1}>
                          <Typography align="left">
                            {x.numberOfPassangers}x -{" "}
                            {this.convertTarif(x.tarif)}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
