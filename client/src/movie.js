// SECOND COMPONENT DEDICATED FOR ONE MOVIE
import React from 'react';
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Movie extends React.Component {
  constructor(props){
    super(props);
    this.favoris= this.favoris.bind(this)
    this.state = {
      liked: this.props.isliked,
    };
    }
    favoris(){
      // console.log('click detecte')
      this.setState({
        liked: !this.state.liked
      })
    if (!this.state.liked) {
      fetch('http://localhost:3000/mymovies', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${this.props.movieName}&desc=${this.props.movieDesc}&img=${this.props.movieImg}&id=${this.props.idMovieDB}`}
    )
    }else {
      fetch(`http://localhost:3000/mymovies/${this.props.idMovieDB}`, {
      method: 'DELETE'
      });
    }
      this.props.likeClickParent(this.props.movieName,!this.state.liked)

    }



  render(){

    var styleHeart = {
      color: '#FFFFFF',
      position: 'absolute',
      top: '5%',
      left: '80%',
      cursor: 'pointer'
    }
    if (this.state.liked==true) {
      styleHeart.color = '#fc6861'
    }

var display =null;
if (!this.state.liked && this.props.viewOnlyLike) {
  display={display:'none'}
}

    return(

          <Col style={display} xs="12" sm="6" md="4" lg="3">
            <div style={{marginBottom:30}}>
              <Card >
                <CardImg top width="100%" src={this.props.movieImg} alt="Card image cap" />
                <FontAwesomeIcon onClick={this.favoris}size="2x" style={styleHeart} icon={faHeart} />
                  <CardBody style={{height:220,textOverflow:'ellipsis', overflowY:'scroll'}}>
                    <CardTitle style={{fontWeight:'bold'}}>{this.props.movieName}</CardTitle>
                    <CardText>{this.props.movieDesc}</CardText>
                  </CardBody>
                </Card>
            </div>
          </Col>

    )
  }
}
