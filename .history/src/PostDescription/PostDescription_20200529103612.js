import React, { Component } from 'react'
import getPostDescription from '../Api/Api'


class PostDescription extends component {
    componentDidMount(){
        const { id } = this.props.match.params
        const result = await getPost(id);
        
    }
    render(){

    }

}

export default PostDescription;