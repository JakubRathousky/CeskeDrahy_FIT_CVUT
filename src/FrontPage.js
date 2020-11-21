import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Form from './form/Form';
import Result from './results/Result';
import Cart from './cart/Cart'
import './App.css';
import { getStationByName } from './data/stations';

export default class FrontPage extends React.Component {
    formInit = {
        from: "",
        to: "",
        date: new Date(),
        direction: '1',
        time: (new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
    constructor() {
        super();
        this.state = {
            formState: this.formInit,
            searchHistory: [],
            buyHistory: [],
            tickets: [],
            showScene: 1,
            selectedConnection: null
        }
    }
    dateFormat = (date) => {
        return (date.getDate()) + 
        "." +  (date.getMonth() + 1) +
        "." +  date.getFullYear();
      }
    
    setTime = (time, nextDay) => {
        return time + ", " + this.dateFormat(nextDay);
      }
    updateForm = (formState) => {
        let history = this.state.searchHistory.find(x => x.to == formState.to && x.from == formState.from);
        let searchHistory = this.state.searchHistory;
        if (!history)
            searchHistory = [{from: formState.from, to: formState.to, direction: formState.direction}, ...searchHistory];
        this.setState({
            formState: formState,
            searchHistory: searchHistory
        });
    }
    showForm = (isCleanLoad) => {
        if (isCleanLoad)
            this.setState({formState: this.formInit, showScene: 1 })
        else
            this.setState({showScene: 1})
    }
    showResult = () => {
        this.setState({showScene: 2})
    }
    showCart = (connection) => {
        this.setState({showScene: 3, selectedConnection: connection})
    }
    reBuy = (historyBuy) => {
        let nextDay = new Date();
        nextDay.setDate((new Date()).getDate() + 1);
        if (new Date("1970-01-01 "+historyBuy.connection.odjezd) <= new Date("1970-01-01 "+(new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})))
            historyBuy.connection.vlak.forEach(x => x.stanice.forEach(y => y.alteredTime = this.setTime(y.cas, nextDay)));
        historyBuy.tickets.forEach(x => {x.isSms = false; x.isKolo = false; x.isMistenka = false});
        let tempState = this.formInit;
        tempState.from = getStationByName(historyBuy.connection.start).id;
        tempState.to = getStationByName(historyBuy.connection.cil).id;
        tempState.date = nextDay;
        tempState.time = historyBuy.connection.odjezd;
        this.setState({tickets: historyBuy.tickets, selectedConnection: historyBuy.connection, showScene: 3, formState: tempState})
    }
    showScene = () => {
        if (this.state.showScene === 1)
            return <Form 
                        showResult={this.showResult}
                        formState={this.state.formState}
                        buyHistory={this.state.buyHistory}
                        searchHistory={this.state.searchHistory}
                        updateForm={this.updateForm}
                        reBuy={this.reBuy}
                    />
        else if (this.state.showScene === 2)
            return <Result 
                showForm={this.showForm}
                showCart={this.showCart}
                formState={this.state.formState}
            />
        else if (this.state.showScene === 3)
            return <Cart
                showForm={this.showForm}
                showResult={this.showResult}
                saveTickets={(tickets) => this.setState({tickets: tickets})}
                buyTickets={(tickets, connections) => {this.setState({buyHistory: [{connection: connections, tickets: tickets}, ...this.state.buyHistory]})}}
                tickets={this.state.tickets}
                connection={this.state.selectedConnection}
            />
    }
  render () {
      return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative" class="appbar">
                <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    České dráhy
                </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Container>
                {/* Hero unit */}
                {this.showScene()}
                {/* End hero unit */}
                </Container>
        </main>
        </React.Fragment>
    )
    }
}
