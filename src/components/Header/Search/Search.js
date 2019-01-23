import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT


export default class Search extends Component {
  constructor() {
    super();
    
    this.state = {
      text: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this)
  } 
  
  updateText(val){
    this.setState({text: val})
  }

  handleInputChange(){
    this.props.handleInputChangeFn(this.state.text)
  }
  
  
  render() {
    console.log(this.props)
    console.log(this.state.text)
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={(e) => this.updateText(e.target.value)} placeholder="Search Your Feed" />

          <SearchIcon onClick={this.handleInputChange} id="Search__icon" />
        </div>
        
      </section>
    )
  }
}