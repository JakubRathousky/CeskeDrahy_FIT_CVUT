import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Box from "@material-ui/core/Box";
import ConnectionHeader from "../common/ConnectionHeader";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export default class ResultCart extends React.Component {
  render() {
    return (
        <Box border={this.props.isActual ? 3 : 1} p={1} borderRadius={16} className="result">
        <ConnectionHeader connection={this.props.connection} />
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
            <Box border={1} borderRadius={16} className="kupit-tlacitko">
              <Button type="submit" size={"large"} fullWidth={true} onClick={this.props.showCart}>
              <AddShoppingCartIcon />
                <Box mx={1}>
                    <Typography>40,- Kč</Typography>
                </Box>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
