import { connect } from 'react-redux';
import NavbarComponent from '../components/navbar/topNavbar';

const mapStateToProps = state => {
  return {
    isLogedIn: state.auth.isLogedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const NavbarView = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarComponent);

export default NavbarView;
