import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CartCard from "./CartCard";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from '@material-ui/icons/Edit';
import "../App.css";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    if (props.tickets.length >= 1)
      this.state = {
        tickets: [...props.tickets],
        bought: false,
        nextId: 1
      };
    else
      this.state = {
        tickets: [this.createNewTicket(true)],
        bought: false,
        nextId: 1
      };
  }

  createNewTicket = (first) => {
    return {
      id: first ? 0 : this.state.nextId,
      isSms: false,
      sms: "",
      isKolo: false,
      isMistenka: false,
      tarif: 10,
      numberOfPassangers: 1,
    };
  };
  removeTicket = (index) => {
    let tickets = this.state.tickets;
    tickets.splice(index, 1);
    console.log(tickets);
    this.setState({ tickets: tickets });
  };

  updateTicket = (ticket, index) => {
    let tickets = this.state.tickets;
    tickets[index] = ticket;
    console.log(ticket);
    this.setState({ tickets: tickets });
  };

  tarifReduction = (tarif) => {
    let cost = 40;

    if (tarif === 10) cost = 40;
    if (tarif === 20) cost = 0;
    if (tarif === 30) cost = 10;
    return cost;
  }
  calculateCost = (ticket) => {
      let cost = this.tarifReduction(ticket.tarif) * (ticket.numberOfPassangers ? ticket.numberOfPassangers : 1);
      if (ticket.isSms) cost += 5;
      if (ticket.isKolo) cost += 40;
      return cost;
  }

  calculateTotalCost = () => {
    let cost = 0;
    this.state.tickets.forEach(x => {
      cost += this.calculateCost(x);
    })
    return cost;
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
                    <Box border={1} borderRadius={16} className="tlacitko">
                        <Tooltip title="zapamatuje si zadané hodnoty a umožní vybrat jiný spoj">

                      <Button
                        type="submit"
                        size={"large"}
                        fullWidth={true}
                        onClick={() => {
                          this.props.saveTickets(this.state.tickets);
                          this.props.showResult();
                        }}
                      >
                        <EditIcon/> <Box mx={1}> <Typography> Jet jindy </Typography></Box>
                      </Button>
                      </Tooltip>
                    </Box>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6} md={6}></Grid>
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
            {!this.state.bought ? (
              <CartCard
                connection={this.props.connection}
                tickets={this.state.tickets}
                addTicket={() => this.setState({
                    tickets: [
                      ...this.state.tickets,
                      this.createNewTicket(false),
                    ],
                    nextId: this.state.nextId + 1
                  })}
                removeTicket={this.removeTicket}
                updateTicket={this.updateTicket}
                buyTickets={this.props.buyTickets}
              />
            ) : (
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

                  </Grid>
                  <Grid item xs={12} sm={6} md={8}></Grid>
                  <Grid item xs={12} sm={6} md={3} align="center">
                    <Box
                      border={1}
                      borderRadius={16}
                      className="kupit-tlacitko"
                    >
                      <Button
                        type="submit"
                        size={"large"}
                        onClick={() => {
                          this.props.buyTickets(
                            this.state.tickets,
                            this.props.connection
                          );
                          this.setState({ bought: true });
                        }}
                      >
                        <AddShoppingCartIcon />
                        <Box mx={1}>
                          <Typography>Přidat do košíku ({this.calculateTotalCost()},- Kč)</Typography>
                        </Box>
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={2}></Grid>
      </Grid>
    );
  }
}
