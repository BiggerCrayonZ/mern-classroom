import { connect } from 'react-redux'
import SearchBar from './SearchBar';

const mapStateToProps = ({ auth }) => {
    const { user } = auth;
    return {
      user
    };
  };

export default connect(mapStateToProps)(SearchBar);