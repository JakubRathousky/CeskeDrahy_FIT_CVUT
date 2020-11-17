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
import ConnectionHeader from "../common/ConnectionHeader";

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSms: props.ticket.isSms,
      sms: props.ticket.sms,
      isKolo: props.ticket.iskolo,
      isMistenka: props.ticket.isMistenka,
      tarif: props.ticket.tarif,
      numberOfPassangers: props.ticket.numberOfPassangers,
      cost: 40
    };
  }

  updateTicket = (newState) => {
      this.props.updateTicket(newState, this.props.index);
        this.setState({...newState});
  }
  tarifReduction = () => {
      let cost = 40;

      if (this.state.tarif === 10) cost = 40;
      if (this.state.tarif === 20) cost = 0;
      if (this.state.tarif === 30) cost = 10;
      return cost;
  }
  calculateCost = () => {
      let cost = this.tarifReduction() * (this.numberOfPassangers ? this.numberOfPassangers : 1);
      if (this.state.isSms) cost += 5;
      if (this.state.isKolo) cost += 40;
      return cost;
  }

  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Box my={1}>
              <Divider variant="middle" />
            </Box>
          </Grid>
        </Grid>
        {this.props.index !== 0 ? (        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={9}>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Box border={1} my={1} borderRadius={16} align={"center"} className="odebrat-tlacitko">
                  <Button onClick={() => this.props.removeTicket(this.props.index)}>Odebrat</Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>) : null}
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InputLabel>Tarif</InputLabel>
                <Select
                  fullWidth
                  value={this.state.tarif}
                  onChange={(event) => this.updateTicket({...this.props.ticket, ...{ tarif: event.target.value }})}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    Zvolte tarif
                  </MenuItem>
                  <MenuItem value={10}>Dospělý</MenuItem>
                  <MenuItem value={20}>Senior</MenuItem>
                  <MenuItem value={30}>Junior</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={4}>
                <InputLabel>Počet</InputLabel>
                <TextField
                  id="standard-number"
                  type="number"
                  value={this.state.numberOfPassangers}
                  onChange={(event) => event.target.value >= 1 ? this.updateTicket({...this.props.ticket, ...{numberOfPassangers: event.target.value}}) : null}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Box border={1} align={"center"}>
                  Cena: {this.calculateCost()} kč
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} md={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.isMistenka}
                      onChange={(event) => {
                        this.updateTicket({...this.props.ticket, ...{ isMistenka: event.target.checked }});
                      }}
                      name="mistenka"
                    />
                  }
                  label="Místenka (zdarma)"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={3}>
                {this.state.isMistenka ? (
                  <Box border={1} mt={1} py={1} align={"center"}>
                    {" "}
                    Místo 105 | Vůz 369{" "}
                  </Box>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={3}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.isSms}
                      onChange={(event) => {
                        this.updateTicket({...this.props.ticket, ...{ isSms: event.target.checked }});
                      }}
                      name="sms"
                    />
                  }
                  label="SMS info (5 Kč)"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={3}>
                {this.state.isSms ? (
                  <MuiPhoneNumber
                    defaultCountry={"cz"}
                    onChange={(value) => this.updateTicket({...this.props.ticket, ...{ sms: value }})}
                  />
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={3}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.isKolo}
                      onChange={(event) => {
                        this.updateTicket({...this.props.ticket, ...{ isKolo: event.target.checked }});
                      }}
                      name="kolo"
                    />
                  }
                  label="Kolo (40 Kč)"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={1}></Grid>
              <Grid item xs={12} sm={6} md={3}>
                {this.state.isKolo ? (
                  <Box border={1} py={1} align={"center"}>
                    Kolo 2 | Vůz 369
                  </Box>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={3}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
