import React, { Component } from 'react';
import './App.css';

import bookList from './booklist';

class App extends Component {

constructor(props) {
    super(props);
    this.state = {
        searchTerm: "",
        printType: [],
        bookType: []  
 }
}

componentDidMount() {
    const baseURL = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`
    const searchURLs = [{baseURL}, `${baseURL}&filter=free-ebooks`, `${baseURL}&filter=partial`, `${baseURL}&filter=full`, `${baseURL}&filter=paid-ebooks`, `${baseURL}&filter=ebooks`]

    Promise.all(searchURLs.map(url =>
        fetch(url)
        .then(checkResults)
        .then(response => response.json())
        .catch(err => {
            throw new Error(err.message);
        })
        .then(data => {
            if(this.state.bookType !== "no filter") {
                filterResults(data[1]);
            }
            else {
                filterResults(data[0]);
            }
        })
     ))
}

filterResults(input){
    const filteredBooks = []
    const bookObject = {}
    input.items.map(index => {
        bookObject = {
            title : index.volumeInfo.title, 
            authors: index.volumeInfo.authors, 
            thumbnail: index.imageLinks.smallThumbnail, 
            snippet: index.searchInfo.textSnippet, 
            cost: index.saleInfo.listPrice.amount, 
            purchaseLink: index.saleInfo.buyLink}

        filteredBooks.push(bookObject)
    })

return filteredBooks;
    //items.
}


checkResults(response) {
    if (response.ok) {
      return Promise.resolve(response);
    }
    throw new Error(response.statusText);
  }
  
  render() {
    return (
      <div className="App">
        <bookList  prop={}  />
      </div>
    );
  }
}

export default App;
