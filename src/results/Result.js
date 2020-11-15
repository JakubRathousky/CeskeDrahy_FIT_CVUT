import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/CardActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TrainIcon from "@material-ui/icons/Train";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Box from "@material-ui/core/Box";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default class Result extends React.Component {
  constructor() {
    super();
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
    };
  }

  render() {
    console.log(this.state);
    return (
      <Grid container>
        <Grid item xs={12} sm={6} md={2}></Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} sm={6} md={3} align="center">
                    <Box border={1} borderRadius={16}>
                      <Button type="submit" size={"large"} onClick={()=>this.props.showForm(false)}>
                        Upravit vyhledávání
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}></Grid>
                  <Grid item xs={12} sm={6} md={3} align="center">
                    <Box border={1} borderRadius={16}>
                      <Button type="submit" size={"large"} onClick={()=>this.props.showForm(true)}>
                        Nové vyhledání
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box border={1} p={1} borderRadius={16}>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        <AccessTimeIcon />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography component="p">
                          <Typography>27 min</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography component="p">
                          Aktuální zpoždění: 245 m
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center">
                    <Box border={1} borderRadius={16}>
                      <Button type="submit" size={"large"} onClick={this.onSearch}>
                        Detail
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        <TrainIcon />
                      </Grid>
                      <Grid item xs={12} sm={6} md={8}>
                        <Typography>
                          <Box  fontWeight="fontWeightBold">R 158 Krakomor</Box>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography>
                          <Typography>Říčany</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography>
                          <Typography>6:55</Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <ArrowDropDownIcon fontSize="large" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography>
                          <Typography>Praha, hl. n</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        7:12
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center">
                    <Box border={1} borderRadius={16}>
                      <Button type="submit" size={"large"} onClick={this.props.showCart}>
                        40,- Kč
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box border={1} p={1} borderRadius={16}>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        <AccessTimeIcon />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography component="p">
                          <Typography>27 min</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography component="p">
                          Aktuální zpoždění: 5 dnů
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center">
                    <Box border={1} borderRadius={16}>
                      <Button
                        type="submit"
                        size={"large"}
                        onClick={this.onSearch} 
                      >
                        Detail
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        <TrainIcon />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography>
                          <Box fontWeight="fontWeightBold">R9587</Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography>
                          <Typography>Říčany</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography>
                          <Typography>6:55</Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <ArrowDropDownIcon fontSize="large" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography>
                          <Typography>Praha, hl. n</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                      <Typography>
                          <Typography>7:12</Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>{" "}
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        <TrainIcon />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography>
                          <Box fontWeight="fontWeightBold">R9587</Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography>
                          <Typography>Říčany</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography>
                          <Typography>6:55</Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <ArrowDropDownIcon fontSize="large" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center"></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <Typography>
                          <Typography>Praha, hl. n</Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                      <Typography>
                          <Typography>7:12</Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} align="center">
                    <Box border={1} borderRadius={16}>
                      <Button
                        type="submit"
                        size={"large"}
                        onClick={this.props.showCart} >
                        40,- Kč
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={2}></Grid>
      </Grid>
    );
  }
}
