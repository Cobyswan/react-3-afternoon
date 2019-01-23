import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Search from './Header/Search/Search'



class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      userSearch: ''
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then((response) => { 
      this.setState({posts: response.data})
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then((response) => {
      this.setState({posts: response.data})
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then((response) => {
      this.setState({posts: response.data})
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then((response) => {
      this.setState({posts: response.data})
    })
  }

  searchPosts(text){
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter/?text=${text}`).then((response) => {
      this.setState({posts: response.data})
    })
  }

  handleInputChange(val){
    this.searchPosts(val)

  }

  
  render() {
    const { posts } = this.state;
    console.log(this.state.userSearch)
    return (
      <div className="App__parent">
        <Header handleInputChangeFn={this.handleInputChange}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          
          {
            posts.map((post) => {
              return <Post 
              key={post.id} 
              text={post.text} 
              date={post.date}
              updatePostFn={this.updatePost}
              id={post.id}
              deletePostFn={this.deletePost}
              />
            })
          }
          
        </section>
      </div>
    );
  }
}

export default App;
