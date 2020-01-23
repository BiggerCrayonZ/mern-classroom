import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Combine
import authReducer from './authReducer';
import activityReducer from './activity.reducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    activity: activityReducer,
});
