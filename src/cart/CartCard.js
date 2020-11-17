import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ConnectionHeader from "../common/ConnectionHeader";
import Ticket from "./Ticket";

export default class CartCard extends React.Component {
  render() {
    let counter = 0;
    return (
      <Grid item xs={12}>
        <Box border={1} p={1} borderRadius={16}>
          <ConnectionHeader connection={this.props.connection} />
         {this.props.tickets.map(x => <Ticket ticket={x} index={counter++} removeTicket={this.props.removeTicket} updateTicket={this.props.updateTicket}/>)}
        </Box>
      </Grid>
    );
  }
}
