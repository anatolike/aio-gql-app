import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";

import { MessageContext } from "./context";



export class Message extends React.Component {
  state = {
    message: { text: "", key: "0", onUndo: undefined },
    opened: false
  };
  queue = [];

  handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ opened: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  pushMessage = (message) => {
    this.queue.push({
      key: new Date().getTime(),
      ...message
    });

    if (this.state.opened) {
      this.setState({ opened: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        message: this.queue.shift(),
        opened: true
      });
    }
  };

  render() {
    const { text, key, onUndo } = this.state.message;
    return (
      <React.Fragment>
        <Snackbar
          variant="error"
          key={key}
          anchorOrigin={{
            horizontal: "right",
            vertical: "top"
          }}
          open={this.state.opened}
          autoHideDuration={3000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{text}</span>}
          action={[
            !!onUndo ? (
              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={this.handleClose}
              >
                UNDO
              </Button>
            ) : (
              undefined
            ),
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <MessageContext.Provider value={this.pushMessage}>
          {this.props.children}
        </MessageContext.Provider>
      </React.Fragment>
    );
  }
}
export default Message;
