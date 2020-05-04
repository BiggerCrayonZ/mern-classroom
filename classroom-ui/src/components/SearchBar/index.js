import { connect } from 'react-redux'
import SearchBar from './SearchBar';

const mapStateToProps = ({ activity }) => {
    const { filterParam } = activity;
    return {
      filterParam
    };
  };

export default connect(mapStateToProps)(SearchBar);