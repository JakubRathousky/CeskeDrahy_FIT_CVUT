import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ConnectionHeader from "../common/ConnectionHeader";
import Ticket from "./Ticket";

export default class CartCard extends React.Component {
  render() {
    return (
      <Grid item xs={12}>
        <Box border={1} p={1} borderRadius={16} className="result">
          <ConnectionHeader connection={this.props.connection} />
         {this.props.tickets.map((x, i) => <Ticket
            ket= {x.id}
            ticket={x}
            index={i}
            showPlus={this.props.tickets.length === i + 1}
            addTicket={this.props.addTicket}
            buyTickets={this.props.buyTickets}
            removeTicket={this.props.removeTicket}
            updateTicket={this.props.updateTicket}/>)}
        </Box>
      </Grid>
    );
  }
}
