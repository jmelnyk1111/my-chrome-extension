/* global chrome */

import React from "react";
import "./App.css";
import Button from "./Button";
import Report from "./Report";
import { getCurrentTab } from "./Utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showReport: false,
      orderHistory: {},
    };
    this.toggleReport = this.toggleReport.bind(this);
  }

  componentDidMount() {
    getCurrentTab((tab) => {
      chrome.runtime.sendMessage(
        { type: "get-show-report", tabId: tab.id },
        (response) => {
          console.log("received show-report in cDM: ", response);
          this.setState({ showReport: response });
        }
      );
      chrome.runtime.sendMessage(
        { type: "get-order-history", tabId: tab.id },
        (response) => {
          console.log("received order-history in cDM: ", response);
          this.setState({ orderHistory: response });
        }
      );
    });
  }

  toggleReport = (showReport) => {
    this.setState({ showReport: showReport });
  };

  render() {
    console.log("showReport: ", this.state.showReport);
    return (
      <div>
        {this.state.showReport ? (
          <Report
            toggleReport={this.toggleReport}
            showReport={this.state.showReport}
            orderHistory={this.state.orderHistory}
          />
        ) : (
          <div className="App">
            <img
              src="./sprout-logo-small.png"
              className="App-logo"
              alt="logo"
            />
            <h1>Welcome To EcoMate</h1>
            <Button
              toggleReport={this.toggleReport}
              showReport={this.state.showReport}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
