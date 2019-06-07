import React, { Component } from "react";

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "public",
      joke: "",
      username: localStorage.getItem("username"),
      seen: false,
      public: true
     
    };
  }

  addJoke = event => {
    event.preventDefault();
    this.props.addNewJoke(this.state);

    this.setState({
      ...this.state,
      title: "",
      category: "public",
      joke: "",
      username: localStorage.getItem("username"),
      seen: false

    });
  };

  handleInputChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="input-form">
        <h2>Add Joke</h2>
        <form onSubmit={this.addJoke}>
          <div className="input">
            <input
              onChange={this.handleInputChange}
              placeholder="Title"
              value={this.state.title}
              name="title"
              className="input-box"
            />
            <input
              onChange={this.handleInputChange}
              placeholder="Joke"
              value={this.state.joke}
              name="joke"
              className="input-box"
            />
            <div className="category-select">
              <label className="category-label">Category:</label>
              <select name="category" onChange={this.handleInputChange}>
                <option value="public">Public</option>
                <option value="private">Private</option>
                
              </select>
            </div>
          </div>
         

          <button className="save-joke-btn"type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default CardForm;