import React from "react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MuiPhoneNumber from "material-ui-phone-number";
import ConnectionHeader from "../common/ConnectionHeader";
import CartCard from "./CartCard";

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      tickets: [this.createNewTicket()],
    };
  }

  createNewTicket = () => {
    return {
      isSms: false,
      sms: "",
      isKolo: false,
      isMistenka: false,
      tarif: "",
      numberOfPassangers: 1,
    }
  }
  removeTicket = (index) => {
    this.setState({tickets: this.state.tickets.splice(index, 1)});
  }

  updateTicket = (ticket, index) => {
    let tickets = this.state.tickets;
    tickets[index] = ticket;
    this.setState({tickets: tickets});
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6} md={2}></Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={6} md={3} align="center">
                  <Box border={1} borderRadius={16}>
                    <Button
                      type="submit"
                      size={"large"}
                      onClick={() => this.props.showResult()}
                    >
                      Jet jindy
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}></Grid>
                <Grid item xs={12} sm={6} md={3} align="center">
                  <Box border={1} borderRadius={16}>
                    <Button
                      type="submit"
                      size={"large"}
                      onClick={() => this.props.showForm(true)}
                    >
                      Nové vyhledání
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {<CartCard connection={this.props.connection} tickets={this.state.tickets} removeTicket={this.removeTicket} updateTicket={this.updateTicket}/>}
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={6} md={1} align="center">
                  <Box border={1} borderRadius={16}>
                    <Button type="submit" size={"large"}
                      onClick={() => this.setState({tickets: [...this.state.tickets, this.createNewTicket()] })}
                    >
                      +
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={8}></Grid>
                <Grid item xs={12} sm={6} md={3} align="center">
                  <Box border={1} borderRadius={16}>
                    <Button type="submit" size={"large"} onClick={() => {}}>
                      Přidat do košíku
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={2}></Grid>
      </Grid>
    );
  }
}
