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
        direction: 0,
        time: (new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
    constructor() {
        super();
        this.state = {
            formState: this.formInit,
            searchHistory: [],
            buyHistory: [],
            showScene: 1
        }
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
    showCart = () => {
        this.setState({showScene: 3})
    }
    showScene = () => {
        if (this.state.showScene === 1)
            return <Form 
                        showResult={this.showResult}
                        formState={this.state.formState}
                        buyHistory={this.state.buyHistory}
                        searchHistory={this.state.searchHistory}
                        updateForm={(formState) => this.setState({formState: formState})} />
        else if (this.state.showScene === 2)
            return <Result showForm={this.showForm} showCart={this.showCart} />
        else if (this.state.showScene === 3)
            return <Cart showForm={this.showForm} showResult={this.showResult}/>
    }
  render () {
      console.log(this.state);
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
