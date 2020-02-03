import { connect } from 'react-redux'
import ActivityController from './ActivityController';

const mapStateToProps = ({ auth, activity }) => {
    const { user } = auth;
    return {
      user,
      activity,
    };
  };

export default connect(mapStateToProps)(ActivityController);