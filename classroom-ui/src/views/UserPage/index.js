import { connect } from 'react-redux';
import UserPage from './UserPage';

const mapStateToProps = ({ auth }) => {
    const { user: { token } } = auth;
    return {
        token,
    };
};

export default connect(mapStateToProps)(UserPage);
