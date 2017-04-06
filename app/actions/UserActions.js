'use strict';

import alt from '../config/alt';
import {GoogleSignin} from 'react-native-google-signin';

class UserActions {

  constructor() {
      // Automatic action
      this.generateActions('updateUserSetting', 'checkForSession', 'saveSession', 'userSignout');
  }

  updateUser(_user) {
    if (_user != null) return _user;
    return (dispatch) => {
      GoogleSignin.currentUserAsync().then((user) => {
        console.log(['USER', user]);
        dispatch(user);
      }).done();
    }
  }
}

export default alt.createActions(UserActions);
