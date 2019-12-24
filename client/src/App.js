import React from 'react';
import {
	Row,
	Container,
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink,
	Button,
	Popover,
	PopoverHeader,
	PopoverBody,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movie from './movie';

// FIRST BIG COMPONENT DEDICATED TO THE HEADER AND THE RENDERING OF MULTIPLE MOVIES (forloop with the Movie component)
class App extends React.Component {
	constructor(props) {
		super(props);
		this.toggleNavBar = this.toggleNavBar.bind(this);
		this.togglePopOver = this.togglePopOver.bind(this);

		this.state = {
			isOpenNavBar: false,
			isOpenPopOver: false,
			viewOnlyLike: false,
			movieLikedname: [],
			movies: [],
			moviesLiked: [],
		};
		this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
		this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
		this.likeClick = this.likeClick.bind(this);
	}
	// Opening of the navbar : this function is used to change isOpenNavBar state to true or false
	componentDidMount() {
		var ctx = this;
		fetch('/movies')
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				ctx.setState({ movies: data.result });
				console.log('===allFILMs', ctx.state.movies);
			})
			.catch(function(error) {
				console.log('Request failed', error);
			});

		fetch('/mymovies')
			.then(function(response) {
				return response.json();
			})
			.then(function(movies) {
				var moviesName = movies.result.map(movie => {
					return movie.title;
				});
				ctx.setState({
					moviesLiked: movies.result,
					movieLikedname: moviesName,
				});
				console.log('=====>>>>movieLikedBDD', ctx.state.moviesLiked);
			})
			.catch(function(error) {});
	}
	likeClick(name, liked) {
		var movieLikedCopy = [...this.state.movieLikedname];
		console.log(name, liked);
		const index = movieLikedCopy.indexOf(name);
		if (liked) {
			movieLikedCopy.push(name);
		} else {
			movieLikedCopy.splice(index, 1);
		}
		this.setState({
			movieLikedname: movieLikedCopy,
		});
	}

	handleClickLikeOn() {
		this.setState({
			viewOnlyLike: true,
		});
	}
	handleClickLikeOff() {
		this.setState({
			viewOnlyLike: false,
		});
	}

	toggleNavBar() {
		this.setState({
			isOpenNavBar: !this.state.isOpenNavBar,
		});
	}

	// Opening of the popover : this function is used to change isOpenPopOver state to true or false
	togglePopOver() {
		this.setState({
			isOpenPopOver: !this.state.isOpenPopOver,
		});
	}

	render() {
		var movieList = this.state.movies.map((movie, i) => {
			var isliked = false;
			for (var x = 0; x < this.state.moviesLiked.length; x++) {
				if (movie.id == this.state.moviesLiked[x].idMovieDB) {
					isliked = true;
					break;
				}
			}

			return (
				<Movie
					likeClickParent={this.likeClick}
					movieName={movie.title}
					movieDesc={movie.overview}
					idMovieDB={movie.id}
					movieImg={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
					isliked={isliked}
					viewOnlyLike={this.state.viewOnlyLike}
					key={i}
				/>
			);
		});

		// Number of liked films
		var moviesCount = this.state.movieLikedname.length;
		// SECOND POWERFULL WAY : USING THE JS METHOD JOIN
		let moviesLast = this.state.movieLikedname.slice(-3);
		if (moviesCount === 0) {
			moviesLast = 'Aucun film sélectionné.';
		} else if (moviesCount > 3) {
			moviesLast = moviesLast.join(', ') + '...';
		} else {
			moviesLast = moviesLast.join(', ') + '.';
		}

		return (
			<div>
				<div style={{ marginBottom: 90 }}>
					<Navbar color='dark' dark expand='md' fixed='top'>
						<span className='navbar-brand'>
							<img
								src='./logo.png'
								width='30'
								height='30'
								className='d-inline-block align-top'
								alt='logo myMoviz'
							/>
						</span>
						<NavbarToggler onClick={this.toggleNavBar} />
						<Collapse isOpen={this.state.isOpenNavBar} navbar>
							<Nav className='' navbar>
								<NavItem>
									<NavLink href='#' onClick={this.handleClickLikeOff} style={{ color: '#FFFFFF' }}>
										Last Releases
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										href='#'
										onClick={this.handleClickLikeOn}
										style={{ color: '#FFFFFF', marginRight: 10 }}
									>
										My Movies
									</NavLink>
								</NavItem>
								<Button id='Popover1' onClick={this.togglePopOver} color='secondary'>
									{moviesCount}
									{moviesCount > 1 ? ' films' : ' film'}
								</Button>
								<Popover
									placement='bottom'
									isOpen={this.state.isOpenPopOver}
									target='Popover1'
									toggle={this.togglePopOver}
								>
									<PopoverHeader>Derniers films</PopoverHeader>
									<PopoverBody>{moviesLast}</PopoverBody>
								</Popover>
							</Nav>
						</Collapse>
					</Navbar>
				</div>

				<Container>
					<Row>{movieList}</Row>
				</Container>
			</div>
		);
	}
}

export default App;
