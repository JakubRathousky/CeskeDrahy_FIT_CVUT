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

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
        isSms: false,
        sms: "",
        isKolo: false,
        isMistenka: false,
        tarif: "",
        numberOfPassangers: 1
    };
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
                      <Grid item xs={12} sm={6} md={8}>
                        <Typography>
                          <Box fontWeight="fontWeightBold">R 158 Krakomor</Box>
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
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12}>
                    <Box my={1}>
                      <Divider variant="middle" />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={8}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={2}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <InputLabel>Tarif</InputLabel>
                        <Select
                          fullWidth
                          value={this.state.tarif}
                          onChange={(event) => this.setState({tarif: event.target.value})}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="" disabled>
                            Zvolte tarif
                          </MenuItem>
                          <MenuItem value={10}>Dospělý</MenuItem>
                          <MenuItem value={20}>Senior</MenuItem>
                          <MenuItem value={10}>Junior</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={12} sm={6} md={1}></Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <InputLabel>Počet</InputLabel>
                        <TextField
                          id="standard-number"
                          type="number"
                          value={this.state.numberOfPassangers}
                          onChange={(event) => {this.setState({numberOfPassangers: event.target.value})}}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}></Grid>
                      <Grid item xs={9}>
                        <Box border={1} align={"center"}>
                          Cena: 40 kč
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={8}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={2}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.isMistenka}
                              onChange={(event) => {this.setState({isMistenka: event.target.checked })}}
                              name="mistenka"
                            />
                          }
                          label="Místenka (zdarma)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={1}></Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {this.state.isMistenka ? (
                          <Box border={1} py={1} align={"center"}>
                            {" "}
                            Místo 105 | Vůz 369{" "}
                          </Box>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={8}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={2}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.isSms}
                              onChange={(event) => {this.setState({isSms: event.target.checked })}}
                              name="sms"
                            />
                          }
                          label="SMS info (5 Kč)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={1}></Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {this.state.isSms ? (
                            <MuiPhoneNumber defaultCountry={'cz'} onChange={(value) => this.setState({sms: value})}/>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6} md={8}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={2}></Grid>
                      <Grid item xs={12} sm={6} md={5}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.isKolo}
                              onChange={(event) => {this.setState({isKolo: event.target.checked })}}
                              name="kolo"
                            />
                          }
                          label="Kolo (40 Kč)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={1}></Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {this.state.isKolo ? (
                          <Box border={1} py={1} align={"center"}>
                            Kolo 2 | Vůz 369
                          </Box>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}></Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={6} md={1} align="center">
                  <Box border={1} borderRadius={16}>
                    <Button
                      type="submit"
                      size={"large"}
                      onClick={() => this.props.showForm(false)}
                    >
                      +
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={8}></Grid>
                <Grid item xs={12} sm={6} md={3} align="center">
                  <Box border={1} borderRadius={16}>
                    <Button
                      type="submit"
                      size={"large"}
                      onClick={() => {}}
                    >
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
