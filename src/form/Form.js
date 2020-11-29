import React from "react";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/CardActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import Skeleton from "@material-ui/lab/Skeleton";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import SearchIcon from "@material-ui/icons/Search";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Box from "@material-ui/core/Box";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  getStations,
  getStationById,
  getStationByName,
} from "../data/stations";
import "../App.css";

function MaterialUIPickers({ changeDate, date }) {
  // The first commit of Material-UI
  const handleDateChange = (date) => {
    changeDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd.MM.yyyy"
          margin="normal"
          id="date-picker-inline"
          value={date}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: props.formState.from,
      to: props.formState.to,
      searchHistory: props.searchHistory,
      buyHistory: props.buyHistory,
      date: props.formState.date,
      direction: props.formState.direction,
      dayOfDeparture: "0",
      time: props.formState.time,
      hasError: false,
      toInputValue: "",
      fromInputValue: "",
    };
  }

  calculateCost = (tickets) => {
    let cost = 0;
    tickets.forEach((x) => {
      console.log(x);
      if (x.tarif === 10) cost += 40 * x.numberOfPassangers;
      if (x.tarif === 20) cost += 0 * x.numberOfPassangers;
      if (x.tarif === 30) cost += 10 * x.numberOfPassangers;
    });
    return cost;
  };

  convertTarif = (number) => {
    if (number === 10) return "dospělý";
    if (number === 20) return "senior";
    if (number === 30) return "junior";
    return "";
  };

  destinations = getStations();

  reBuy = (historyBuy) => {
    this.props.reBuy(historyBuy);
  };

  onFromChange = (newValue) => {
    if (!newValue) this.setState({ from: "" });
    else if (this.state.to !== newValue.id)
      this.setState({ from: newValue.id });
  };
  onToChange = (newValue) => {
    if (!newValue) this.setState({ to: "" });
    else if (this.state.from !== newValue.id)
      this.setState({ to: newValue.id });
  };
  onTimeChange = (event) => {
    this.setState({ time: event.target.value });
  };
  changeDate = (date) => {
    this.setState({ date: date, dayOfDeparture: 0 });
  };
  onDepartureDayChange = (event) => {
    event.preventDefault();
    let today = new Date();
    if (event.target.value === "1") {
      this.setState({ date: today, dayOfDeparture: "1" });
    } else if (event.target.value === "2") {
      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      this.setState({ date: tomorrow, dayOfDeparture: "2" });
    }
  };
  onDirectionChange = (event) => {
    event.preventDefault();
    this.setState({ direction: event.target.value });
  };
  onSearch = () => {
    if (
      !this.state.to ||
      !this.state.from ||
      !this.state.time ||
      !this.state.date ||
      !this.state.direction
    ) {
      this.setState({ hasError: true });
    } else {
      this.setState({
        hasError: false,
        searchHistory: [
          ...this.state.searchHistory,
          { from: this.state.from, to: this.state.to },
        ],
      });
      this.props.updateForm({ ...this.state });
      this.props.showResult();
    }
  };
  onHistorySearch = (history) => {
    let stateCopy = {
      ...this.state,
      from: history.from,
      to: history.to,
      direction: history.direction,
    };
    stateCopy.time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    stateCopy.date = new Date();
    this.props.updateForm({ ...stateCopy });
    this.props.showResult();
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rect" width={210} height={400} />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <FormControl>
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={11}>
                    <Grid item xs={12}>
                      {this.state.hasError && !this.state.from ? (
                        <FormHelperText error>
                          Toto je povinná položka!
                        </FormHelperText>
                      ) : (
                        <FormHelperText>
                          Toto je povinná položka!
                        </FormHelperText>
                      )}
                      <Autocomplete
                        id="combo-box-demo"
                        options={this.destinations}
                        value={getStationById(this.state.from)}
                        inputValue={this.state.fromInputValue}
                        getOptionLabel={(option) => option.name}
                        onInputChange={(event, newInputValue) => {
                          this.setState({ fromInputValue: newInputValue });
                        }}
                        onChange={(event, newValue) =>
                          this.onFromChange(newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Stanice odkud"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box my={1}>
                        {this.state.hasError && !this.state.from ? (
                          <FormHelperText error>
                            Toto je povinná položka!
                          </FormHelperText>
                        ) : (
                          <FormHelperText>
                            Toto je povinná položka!
                          </FormHelperText>
                        )}
                        <Autocomplete
                          id="combo-box-demo"
                          options={this.destinations}
                          value={getStationById(this.state.to)}
                          inputValue={this.state.toInputValue}
                          onInputChange={(event, newInputValue) => {
                            this.setState({ toInputValue: newInputValue });
                          }}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) =>
                            this.onToChange(newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Stanice kam"
                              variant="outlined"
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} align="center">
                    <Button>
                      <ImportExportIcon
                        fontSize="large"
                        xs={12}
                        onClick={() => {
                          this.setState({
                            from: this.state.to,
                            fromInputValue: this.state.toInputValue,
                            to: this.state.from,
                            toInputValue: this.state.fromInputValue,
                          });
                        }}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box my={1}>
                  <Divider variant="middle" />
                </Box>
                <Grid container spacing={1}>
                  <Grid item sm={3}></Grid>
                  <Grid item sm={5}></Grid>
                  <Grid item sm={4}>
                    {this.state.hasError && !this.state.date && (
                      <FormHelperText error>
                        Toto je povinná položka!
                      </FormHelperText>
                    )}
                    <FormHelperText></FormHelperText>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item sm={3}>
                    <Typography variant="subtitle1" align="left" component="p">
                      Datum
                    </Typography>
                  </Grid>
                  <Grid item sm={5}>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      onChange={this.onDepartureDayChange}
                      value={this.state.dayOfDeparture}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="Dnes"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label="Zítra"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item sm={4}>
                    <MaterialUIPickers
                      changeDate={this.changeDate}
                      date={this.state.date}
                    />
                  </Grid>
                </Grid>
                <Box my={1}>
                  <Divider variant="middle" />
                </Box>
                <Grid container spacing={1}>
                  <Grid item sm={3} align="left"></Grid>
                  <Grid item sm={5}>
                    {this.state.hasError && !this.state.direction && (
                      <FormHelperText error>
                        Toto je povinná položka!
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item sm={4}>
                    {this.state.hasError && !this.state.time && (
                      <FormHelperText error>
                        Toto je povinná položka!
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item sm={3} align="left"></Grid>
                  <Grid item sm={5}>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      onChange={this.onDirectionChange}
                      value={this.state.direction}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="Odjezd"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label="Příjezd"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item sm={3} align="left">
                    <TextField
                      id="time"
                      type="time"
                      value={this.state.time}
                      format="hh:mm"
                      onChange={this.onTimeChange}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ style: { textAlign: "right" }, step: 300 }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item sm={4}></Grid>
                  <Grid item sm={4}></Grid>
                  <Grid item sm={4} align="right">
                    <Button
                      className="search-tlacitko"
                      type="submit"
                      onClick={this.onSearch}
                    >
                      <SearchIcon />
                      <Box mx={1}>
                        <Typography>Vyhledat</Typography>
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography variant="h5" align="left" component="p">
                  Předchozí hledané spoje
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Box border={1}>
                <List component="nav" aria-label="main mailbox folders">
                  {this.state.searchHistory.map((x) => (
                    <ListItem
                      button={true}
                      onClick={() => {
                        this.onHistorySearch(x);
                      }}
                    >
                      <ListItemText
                        primary={
                          getStationById(x.from).name +
                          " -> " +
                          getStationById(x.to).name
                        }
                      />
                      <ListItemText primary={this.state.time} />
                      <ListItemIcon>
                        <SearchIcon className="search-icon" />
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={1}></Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Grid container>
            {this.state.buyHistory.length > 0 ? (
              <Box border={1} my={3} className="result">
                <Grid container>
                  <Grid item xs={12} sm={6} md={2}></Grid>
                  <Grid item xs={12} sm={6} md={8}>
                    <Box m={1} align="center">
                      <Typography>
                        {" "}
                        <Box fontWeight="fontWeightBold">Historie nákupů</Box>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                {this.state.buyHistory.map((x) => (
                  <React.Fragment>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography align="center">
                          {x.connection.start}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Typography align="center">-></Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography align="center">
                          {x.connection.cil}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography align="center">
                          {x.connection.odjezd}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Typography align="center">-</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography align="center">
                          {x.connection.prijezd}
                        </Typography>
                      </Grid>
                      {x.tickets.map((y) => (
                        <Grid item xs={12} sm={12} md={12}>
                          <Box mx={1}>
                            <Typography align="left">
                              {" "}
                              - {y.numberOfPassangers}x -{" "}
                              {this.convertTarif(y.tarif)}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                      <Grid item xs={12} sm={6} md={2}></Grid>
                      <Grid item xs={12} sm={6} md={8}>
                        <Box m={1} className="search-tlacitko">
                          <Tooltip title="přejít k nákupu">
                            <Button
                              fullWidth={true}
                              onClick={() => this.reBuy(x)}
                            >
                              <AddShoppingCartIcon />
                              <Box mx={1}>
                                <Typography>
                                  {this.calculateCost(x.tickets)},- KČ
                                </Typography>
                              </Box>
                            </Button>
                          </Tooltip>
                        </Box>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
