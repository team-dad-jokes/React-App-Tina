import React, { Component } from "react";
import axios from "axios";

// import TabList from "../components/TabList";
// import CardList from "../components/CardList";
// import CardForm from "../components/CardForm";
// import { tabData } from "../data";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      selected: "all",
      tabs: [],
      cards: [],
      newPost: [],
      username: ""
    };
  }

  getProfile = () => {
    const token = localStorage.getItem("token");
    const profile = localStorage.getItem("username");
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .get(
          `https://dad-jokes2019.herokuapp.com/oauth/token${profile}`,
          options
        
        )
        .then(res => {
          if (res.status === 201 && res.data) {
            console.log("Help!", res.data);
            this.setState({ loggedIn: true, /* tabs: tabData, */ cards: res.data });
          } else {
            throw new Error();
          }
        })
        .catch(err => {
           this.props.history.push("/login");
        });
    }
  };

  componentDidMount() {
    this.getProfile();
  }
 
  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if (pathname === "/" && pathname !== prevProps.location.pathname) {
      this.getPost();
    }
    if (this.state.newPost.length > 0) {
      this.getPost();
      this.setState({
        newPost: []
      });
    }
  }

  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/Login");
  };

  changeSelected = tab => {
    this.setState({ selected: tab });
  };

  filterCards = () => {
    if (this.state.selected === "all") {
      return this.state.cards;
    } else {
      return this.state.cards.filter(
        card => card.category === this.state.selected
      );
    }
  };

  toggleCard = info => {
    const token = localStorage.getItem("token");
    const changes = { title: info.title, category: info.category, link: info.link, seen: !info.seen, public: info.public };
    const id = info.id;
    console.log(info)
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .put(
          `https://dad-jokes2019.herokuapp.com/oauth/token/${id}`,
          changes,
          options
        )
        .then(res =>
          this.setState({
            cards: this.state.cards.map(card => {
              if (card.id === id) {
                return {
                  ...card,
                  seen: !card.seen
                };
              }
              return card;
            })
          })
        )
        .catch(err => console.log(err));
    }
  };

  addNewArticle = info => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .post(
          "https://dad-jokes2019.herokuapp.com/oauth/token",
          info,
          options
        )
        .then(res => this.getPost())
        .catch(err => console.log(err));
    }
  };

  render() {
    if(!localStorage.getItem('token')) {this.props.history.push('/login')}
    return (
      <div className="content-container">
        {/* <TabList
          tabs={this.state.tabs}
          selectedTab={this.state.selected}
          selectTabHandler={this.changeSelected}
        />
        <CardList cards={this.filterCards()} toggleCard={this.toggleCard} />
        <CardForm addNewArticle={this.addNewArticle} /> */}
      </div>
    );
  }
}