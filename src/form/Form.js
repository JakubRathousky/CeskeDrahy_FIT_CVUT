import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/CardActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup  from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from '@date-io/date-fns';
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';


function MaterialUIPickers({changeDate, date}) {
    // The first commit of Material-UI
    const handleDateChange = (date) => {
        changeDate(date);
    };
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd.MM.yyyy"
            margin="normal"
            id="date-picker-inline"
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            from: props.formState.from,
            to: props.formState.to,
            searchHistory: props.searchHistory,
            buyHistory: props.buyHistory,
            date: props.formState.date,
            direction: props.formState.direction,
            dayOfDeparture: '0',
            time: props.formState.time,
            hasError: false
        }
    }

    destinations = [{name:'Říčany', id:10},{name:'Praha', id: 20},{name: 'Hr. Králové', id:30}]

    onFromChange = (event) => { this.setState({from: event.target.value}) }
    onToChange = (event) => { this.setState({to: event.target.value}) }
    onTimeChange = (event) => { this.setState({time: event.target.value}) }
    changeDate = (date) => { this.setState({date: date, dayOfDeparture: 0}) }
    onDepartureDayChange = (event) => {
        event.preventDefault();
        let today = new Date();
        if (event.target.value === '1') {
            this.setState({date: today, dayOfDeparture: '1'})
        } else if (event.target.value === '2') {
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1)
            this.setState({date: tomorrow, dayOfDeparture: '2'})
        }
    }
    onDirectionChange = (event) => {
        event.preventDefault();
        this.setState({direction: event.target.value})
    }
    onSearch = (event) => {
        if (!this.state.to || !this.state.from || !this.state.time || !this.state.date || !this.state.direction) {
            this.setState({hasError: true})
        } else {
            this.setState({hasError: false, searchHistory: [...this.state.searchHistory, {from: this.state.from, to: this.state.to}]})
            this.props.updateForm({...this.state})
            this.props.showResult();
        }
    }

  render () {
      console.log(this.state);
      return (
            <Grid container >
                <Grid item xs={12} sm={6} md={3}>
                        <Skeleton variant="rect" width={210} height={400} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} >
                    <FormControl>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                                    <Grid item xs={11}>
                                        <Grid item xs={12}>
                                        {this.state.hasError && !this.state.from && <FormHelperText error>Toto je povinná položka!</FormHelperText>}
                                            <Select
                                                fullWidth
                                                value={this.state.from}
                                                onChange={this.onFromChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                <MenuItem value="" disabled>
                                                    Stanice odkud
                                                </MenuItem>
                                                {this.destinations.map(x => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12}>
                                        {this.state.hasError && !this.state.to && <FormHelperText error>Toto je povinná položka!</FormHelperText>}
                                            <Select
                                                fullWidth
                                                value={this.state.to}
                                                onChange={this.onToChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                <MenuItem value="" disabled>
                                                    Stanice kam
                                                </MenuItem>
                                                {this.destinations.map(x => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} align="center">
                                        <ImportExportIcon fontSize="large" xs={12} onClick={() => { this.setState({from: this.state.to, to: this.state.from}) }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <Box my={1}>
                                <Divider variant="middle" />
                                </Box>
                                <Grid container spacing={1}>
                                    <Grid item sm={3}>
                                    </Grid>
                                    <Grid item sm={5}>
                                    </Grid>
                                    <Grid item sm={4}>
                                    {this.state.hasError && !this.state.date && <FormHelperText error>Toto je povinná položka!</FormHelperText>}
                                    <FormHelperText></FormHelperText>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item sm={3}>
                                        <Typography variant="subtitle1" align="left" component="p">
                                            Datum
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={5}>
                                        <RadioGroup row aria-label="position" name="position" onChange={this.onDepartureDayChange} value={this.state.dayOfDeparture}>
                                            <FormControlLabel value="1" control={<Radio color="primary" />} label="Dnes" />
                                            <FormControlLabel value="2" control={<Radio color="primary" />} label="Zítra" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item sm={4}>
                                    <MaterialUIPickers changeDate={this.changeDate} date={this.state.date}/>
                                    </Grid>
                                </Grid>
                                <Box my={1}>
                                <Divider variant="middle" />
                                </Box>
                                <Grid container spacing={1}>
                                    <Grid item sm={3} align="left">
                                    </Grid>
                                    <Grid item sm={9}>
                                    {this.state.hasError && !this.state.direction && <FormHelperText error>Toto je povinná položka!</FormHelperText>}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item sm={3} align="left">
                                    {this.state.hasError && !this.state.time && <FormHelperText error>Toto je povinná položka!</FormHelperText>}
                                    <TextField
                                            id="time"
                                            type="time"
                                            value={this.state.time}
                                            format="hh:mm"
                                            onChange={this.onTimeChange}
                                            InputLabelProps={{ shrink: true}}
                                            inputProps={{style: { textAlign: 'right' }, step: 300}}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <RadioGroup row aria-label="position" name="position" onChange={this.onDirectionChange} value={this.state.direction}>
                                            <FormControlLabel value="1" control={<Radio color="primary" />} label="Odjezd" />
                                            <FormControlLabel value="2" control={<Radio color="primary" />} label="Příjezd" />
                                        </RadioGroup>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item sm={4}>
                                    </Grid>
                                    <Grid item sm={4}>
                                    </Grid> 
                                    <Grid item sm={4} align="right">
                                        <Button type="submit" onClick={this.onSearch} > Vyhledat </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FormControl>
                    <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <Grid item xs={12}>
                                <Typography variant="h5"  align="left" component="p">
                                    Předchozí hledané spoje
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                        <Box border={1}  >
                            <List component="nav" aria-label="main mailbox folders">
                                {this.state.searchHistory.map(x => (
                                    <ListItem button>
                                        <ListItemText primary={this.destinations.find(y => y.id === x.from).name + " -> " + this.destinations.find(y => y.id === x.to).name} />
                                        <ListItemIcon>
                                            <SearchIcon />
                                        </ListItemIcon>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Skeleton variant="rect" width={210} height={400} />
                </Grid>
            </Grid>
        )
    }
}
