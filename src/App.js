import React, { Component } from 'react';
import './App.css';
import BookList from './bookList/bookList';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          searchTerm: "orwell",
          printType: ["ebooks"],
          bookType: [],
          searchedBooks: []
    }
  }

  filterResults(input){
    const filteredBooks = 
    input.items.map(index => {
      return {
            title : index.volumeInfo.title, 
            authors: index.volumeInfo.authors, 
            thumbnail: index.volumeInfo.imageLinks.thumbnail ? index.volumeInfo.imageLinks.thumbnail : null, 
            snippet: index.searchInfo.textSnippet,
            cost: index.saleInfo.listPrice ? index.saleInfo.listPrice.amount : null,
            purchaseLink: index.saleInfo.buyLink,
      }
    });
    console.log(filteredBooks);
    this.setState({
      searchedBooks: filteredBooks 
    })
  }

checkResults(response) {
    if (response.ok) {
      return Promise.resolve(response);
    }
    throw new Error(response.statusText);
  }

  componentDidMount() {
      const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`
      const searchURLs = [ baseURL, `${baseURL}&filter=${this.state.printType}`]  //`${baseURL}&filter=partial`, `${baseURL}&filter=full`, `${baseURL}&filter=paid-ebooks`, `${baseURL}&filter=ebooks`]

      Promise.all(searchURLs.map(url => 
          fetch(url)
          .then(this.checkResults)
          .then(response => response.json())
          .then(data => {
              if(this.state.bookType !== "No Filter") {
                  this.filterResults(data);
              }
              else {
                  this.filterResults(data[0]);
              }
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
        })
      ))
  }
  
  render() {
    const error = this.state.error ? <div>{this.state.error}</div> : "";
    return (
      <div className="App">
        {error}
        <BookList  searchedBooks={this.state.searchedBooks}  />
      </div>
    );
  }
}

export default App;
