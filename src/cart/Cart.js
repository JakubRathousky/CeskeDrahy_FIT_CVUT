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
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MuiPhoneNumber from "material-ui-phone-number";
import ConnectionHeader from "../common/ConnectionHeader";
import CartCard from "./CartCard";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    if (props.tickets.length >= 1)
      this.state = {
        tickets: [...props.tickets],
        bought: false
      }
    else
      this.state = {
        tickets: [this.createNewTicket()],
        bought: false
      };
  }

  createNewTicket = () => {
    return {
      isSms: false,
      sms: "",
      isKolo: false,
      isMistenka: false,
      tarif: 10,
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
                {!this.state.bought ? (
                  <Box border={1} borderRadius={16}>
                    <Button
                      type="submit"
                      size={"large"}
                      onClick={() => {this.props.saveTickets(this.state.tickets); this.props.showResult()}}
                    >
                      Jet jindy
                    </Button>
                  </Box>) : null}
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
            { !this.state.bought ? <CartCard
              connection={this.props.connection}
              tickets={this.state.tickets}
              removeTicket={this.removeTicket}
              updateTicket={this.updateTicket}
              buyTickets={this.props.buyTickets} /> : (
                <Grid item xs={12}>
                <Grid container align="center">
                <Typography variant="h5" noWrap>
                    Děkujeme za nákup!
                </Typography>
                </Grid>
              </Grid>
              )}
              {!this.state.bought ? (
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
                    <Button type="submit" size={"large"} onClick={() => {this.props.buyTickets(this.state.tickets, this.props.connection);this.setState({bought:true})}}>
                      Přidat do košíku
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={2}></Grid>
      </Grid>
    );
  }
}
