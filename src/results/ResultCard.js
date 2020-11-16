import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TrainIcon from "@material-ui/icons/Train";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MuiPhoneNumber from "material-ui-phone-number";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default class ResultCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isDetail: false
    };
  }

  renderShortTrainConnection = (train) => {
    return (
        <React.Fragment>
        <Grid container>
          <Grid item xs={12} sm={6} md={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3} align="center"></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} md={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Typography>
                  <Typography>{train.stanice[0].nazev}</Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={9}>
                <Typography>
                  <Typography>{train.stanice[0].alteredTime}</Typography>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} md={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={2}>
                <ArrowDropDownIcon fontSize="large" />
              </Grid>
              <Grid item xs={12} sm={6} md={9}></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} md={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={2}>
                  <Typography>{train.stanice[train.stanice.length - 1].nazev}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={9}>
                  <Typography>{train.stanice[train.stanice.length - 1].alteredTime}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </React.Fragment>
    )
  }
  renderDetailTrainConnection = (train) => {
    let counter = 0;
    return (
        <React.Fragment>
        {train.stanice.map(x => (
            <Box py={1}>
            <Grid container>
                <Grid item xs={12} sm={6} md={12}>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={1}></Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography>{counter++ === 0 || counter === train.stanice.length ? <Box  fontWeight="fontWeightBold">{x.nazev}</Box> : x.nazev}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                            <Typography>{x.alteredTime}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        ))}
        </React.Fragment>
    )
  }
  renderTrainConnection = (train) => {
    if (this.state.isDetail)
        return this.renderDetailTrainConnection(train);
    return this.renderShortTrainConnection(train);
  }
  renderTrain = (train) => {
      return (
        <React.Fragment>
        <Grid container>
          <Grid item xs={12} sm={6} md={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={1}>
                <TrainIcon />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Typography>
                  <Box  fontWeight="fontWeightBold">{train.kod}</Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.renderTrainConnection(train)}
        </React.Fragment>
      );
  }

  render() {
    return (
        <Box border={this.props.isActual ? 3 : 1} p={1} borderRadius={16}>
        <Grid container>
          <Grid item xs={12} sm={6} md={5}>
            <Grid container>
              <Grid item xs={12} sm={6} md={4}>
                <AccessTimeIcon />
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <Typography component="p">
                  <Typography>{this.props.connection?.doba}</Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
              <Button type="submit" size={"large"} onClick={() => {this.setState({isDetail: !this.state.isDetail})}}>
                Detail
              </Button>
            </Box>
          </Grid>
        </Grid>
        {this.props.connection?.vlak.map(x => this.renderTrain(x))}
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <Grid container>
              <Grid item xs={12} sm={6} md={4}></Grid>
              <Grid item xs={12} sm={6} md={5}>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
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
    );
  }
}
