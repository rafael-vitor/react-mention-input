import React from "react";
import "./App.css";

import ContentEditable from "react-contenteditable";

const data = ["ravi", "gene", "dart", "murtinha"];

const trimSpaces = string => {
  return string
    .replace(/&nbsp;/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<");
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  handleContentEditable = e => {
    console.log("handle content editable change", e);
    const { value } = e.target;
    const stripedHtml = value.replace(/<[^>]+>/g, "");

    const splitValue = stripedHtml.split(" ");

    const formattedValue = splitValue
      .map(word =>
        word.match(/@\w/) && data.includes(trimSpaces(word).replace("@", ""))
          ? `<span class="highlighted">${word}</span>`
          : word
      )
      .join(" ");

    this.setState({
      value: formattedValue
    });
  };

  handleInputChange = e => {
    console.log("handle input change", e);
    this.setState({
      value: e.target.value
    });
  };

  pasteAsPlainText = event => {
    event.preventDefault();

    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  highlightAll = () => {
    setTimeout(() => {
      document.execCommand("selectAll", false, null);
    }, 0);
  };

  render() {
    const { value } = this.state;

    return (
      <div className="App">
        <div className="stage">
          <input
            className="form-control"
            value={value}
            onChange={this.handleInputChange}
          />

          <ContentEditable
            html={value}
            className="mention-input form-control"
            onChange={this.handleContentEditable}
            onPaste={this.pasteAsPlainText}
            onFocus={this.highlightAll}
          />

          <h3>{value}</h3>
        </div>
      </div>
    );
  }
}

export default App;
