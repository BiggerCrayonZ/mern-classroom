import { connect } from 'react-redux'
import Book from './Book';

const mapStateToProps = ({ auth, activity, load }) => {
    const { user } = auth;
    const loading = Boolean(load.activity);
    return {
      user,
      loading,
      activity,
    };
  };

export default connect(mapStateToProps)(Book);