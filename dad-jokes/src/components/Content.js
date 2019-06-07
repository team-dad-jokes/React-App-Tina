
import React, { Component } from "react";
import axios from "axios";

import CardList from "./CardList";
import CardForm from "./CardForm";


export default class Content extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      newPost: [],
      username: ""
    };
  }

  getPost = () => {
    //const token = localStorage.getItem("token");
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
      //if (token) {
        
        axios.get("https://dad-jokes2019.herokuapp.com/randomJoke",{
          /* " URL " ,*/
          options
        })
        .then(res => {
          console.log(res.data.joke)
          this.setState({
            cards: res.data.joke
          })
          // if (res.status === 200) {
            this.setState({ loggedIn: true, cards: res.data.joke })
          // } else {
          //   throw new Error()
          // }
        })
        .catch(err => {
          //this.props.history.push("/login");
          console.log(err);
        });
    //}

  };

  componentDidMount() {
    this.getPost();
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

  // changeSelected = tab => {
  //   this.setState({ selected: tab });
  // };

  // filterCards = () => {
  //   if (this.state.selected === "all") {
  //     return this.state.cards;
  //   } else {
  //     return this.state.cards.filter(
  //       card => card.category === this.state.selected
  //     );
  //   }
  // };

  // toggleCard = info => {
  //   const token = localStorage.getItem("token");
  //   const changes = { category: info.category, joke: info.joke, seen: !info.seen, public: info.public };
  //   const id = info.id;
  //   console.log(info)
  //   const options = {
  //     headers: {
  //       Authorization: token
  //     }
  //   };

  //   if (token) {
  //     axios
  //       .put(
  //         /* ` URL ` */
  //         changes,
  //         options
  //       )
  //       .then(res =>
  //         this.setState({
  //           cards: this.state.cards.map(card => {
  //             if (card.id === id) {
  //               return {
  //                 ...card,
  //                 seen: !card.seen
  //               };
  //             }
  //             return card;
  //           })
  //         })
  //       )
  //       .catch(err => console.log(err));
  //   }
  // };

  addNewJoke = info => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .post(
          /* " URL " ,*/
          info,
          options
        )
        .then(res => this.setState({ newPost: res.data }))
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
        /> */}
        <CardList card={this.state.cards} toggleCard={this.toggleCard} />
        <CardForm addNewJoke={this.addNewJoke} />
      </div>
    );
  }
}