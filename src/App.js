import React, { Component } from 'react';
import './App.css';
import BookList from './bookList/bookList';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          searchTerm: "george",
          printType: ["ebooks"],
          bookType: [],
          searchedBooks: []
    }
  }

  filterResults(input){
    const filteredBooks = []
    let bookObject = {}
    input.items.map(index => {
        bookObject = {
            title : index.volumeInfo.title, 
            authors: index.volumeInfo.authors, 
            thumbnail: index.volumeInfo.imageLinks.thumbnail ? index.volumeInfo.imageLinks.thumbnail : null, 
            // snippet: index.searchInfo.textSnippet ? index.searchInfo.textSnippet : null,
            // cost: index.saleInfo.listPrice.amount ? index.saleInfo.listPrice.amount : null,
            purchaseLink: index.saleInfo.buyLink
          }
        filteredBooks.push(bookObject)
    })
    // return filteredBooks;
    this.setState({
      searchedBooks: filteredBooks 
    })
        //items.
  }

checkResults(response) {
    if (response.ok) {
      return Promise.resolve(response);
    }
    throw new Error(response.statusText);
  }

  componentDidMount() {
      const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`
      const searchURLs = [{baseURL}, `${baseURL}&filter=${this.state.printType}`]  //`${baseURL}&filter=partial`, `${baseURL}&filter=full`, `${baseURL}&filter=paid-ebooks`, `${baseURL}&filter=ebooks`]

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
