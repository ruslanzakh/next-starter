import React from 'react';
import { connect } from 'react-redux';
import { Wrapper } from './style';
import * as authGetters from 'store/auth/reducer';
import { authRequest, authLogout, authGetTokenAndUserRequest} from 'store/auth/actions';
import { userRequest } from 'store/user/actions';
import { IRootState, IProfile, TypeOfConnect, ThunkDispatch } from 'store/interfaces';

function mapStateToProps(state: IRootState) {
	return {
	  status: authGetters.getAuthStatus(state),
	  token: state.auth.token,
	  user: state.user.profile,
	  isAuthenticated: authGetters.getIsAuthenticated(state)
	};
}
const mapDispatchToProps = (dispatch: ThunkDispatch) => {
	return {
		authLogin: (user:IProfile) => dispatch(authRequest(user)),
		authLogout: () => dispatch(authLogout()),
		userAuth: () => dispatch(userRequest()),
		getTokenAndUserRequest: () => dispatch(authGetTokenAndUserRequest()),
	};
};

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);

type AppProps = {}
  & TypeOfConnect<typeof storeEnhancer>;

class AuthBlock extends React.Component<AppProps> {
	componentDidMount(){
		this.props.getTokenAndUserRequest();
	}
	loginClick = () => {
		this.props.authLogin({name: '123'})
	}
	logoutClick = () => {
		this.props.authLogout()
	}
	render(){
		const userName = this.props.user ? this.props.user.name : '';
		let button;
		if(this.props.isAuthenticated) {
			// button = <mts-button onClick={this.logoutClick}>Выйти</mts-button>
			button = <button onClick={this.logoutClick}>Выйти</button>
		} else {
			// button = <mts-button onClick={this.loginClick}>Авторизоваться</mts-button>
			button = <button onClick={this.loginClick}>Авторизоваться</button>
		}
		return (
			<div>
				{this.props.status && <Wrapper>{this.props.status}</Wrapper>}
				{userName && <Wrapper>{userName}</Wrapper>}
				{button}
			</div>
		)
	}
}

export default storeEnhancer(AuthBlock)