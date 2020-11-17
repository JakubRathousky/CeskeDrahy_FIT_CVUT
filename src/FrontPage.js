import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Form from './form/Form';
import Result from './results/Result';
import Cart from './cart/Cart'

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
            showScene: 1,
            selectedConnection: null
        }
    }
    updateForm = (formState) => {
        let history = this.state.searchHistory.find(x => x.to == formState.to && x.from == formState.from);
        const searchHistory = this.state.searchHistory;
        if (!history)
            searchHistory.push({from: formState.from, to: formState.to});
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
    showScene = () => {
        if (this.state.showScene === 1)
            return <Form 
                        showResult={this.showResult}
                        formState={this.state.formState}
                        buyHistory={this.state.buyHistory}
                        searchHistory={this.state.searchHistory}
                        updateForm={this.updateForm} />
        else if (this.state.showScene === 2)
            return <Result showForm={this.showForm} showCart={this.showCart} formState={this.state.formState}/>
        else if (this.state.showScene === 3)
            return <Cart showForm={this.showForm} showResult={this.showResult} connection={this.state.selectedConnection}/>
    }
  render () {
      return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
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
