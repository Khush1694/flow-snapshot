import React, { Component } from 'react';
import { Image, Button, Text, TextInput, View } from 'react-native';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import Toolbar from '../../components/Toolbar';

class Settings extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Settings',
    }
  }

  constructor(props) {
    super(props);
    let sett = this.props.screenProps.settings;
    this.state = {
      form: {
        reminders_per_week: sett.reminders_per_week || '',
        start_hr: sett.start_hr || '',
        end_hr: sett.end_hr || '',
        api_pw: sett.api_pw || ''
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
     let setting_change = JSON.stringify(this.props.screenProps.settings) != JSON.stringify(prevProps.screenProps.settings);
     if (setting_change) {
      console.log('settings_change');
      this.setState({form: this.props.screenProps.settings});
     }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  storeChange(state) {
      this.setState({form: state.settings});
  }


  save() {
    let {form} = this.state;
    console.log('save');
    UserActions.updateUserSetting(form);
  }

  handle_change(key, val) {
    let {form} = this.state;
    form[key] = val;
    this.setState({form});
  }

  signout() {
    UserActions.userSignout();
  }

  render() {
    let {form} = this.state;
    let {screenProps} = this.props;
    let _user_signedin;
    if (screenProps.user) _user_signedin = <Text>Signed in as {screenProps.user.email}</Text>
    return (
      <View style={{padding: 10}}>

        <Toolbar />


        <Text>How many times a week do you want to answer the question?</Text>

        <TextInput
          style={{height: 40}}
          value={form.reminders_per_week || ''}
          placeholder="How many times a week do you want to answer the question?"
          onChangeText={this.handle_change.bind(this, 'reminders_per_week')}
        />

        <Text>Reminder start hour</Text>

        <TextInput
          style={{height: 40}}
          value={form.start_hr || ''}
          keyboardType='numeric'
          placeholder="Reminder start hour"
          onChangeText={this.handle_change.bind(this, 'start_hr')}
        />

        <Text>Reminder end hour</Text>

        <TextInput
          style={{height: 40}}
          value={form.end_hr || ''}
          keyboardType='numeric'
          placeholder="Reminder end hour"
          onChangeText={this.handle_change.bind(this, 'end_hr')}
        />
        <TextInput
          style={{height: 40}}
          value={form.api_pw || ''}
          placeholder="Flow API password"
          secureTextEntry={true}
          onChangeText={this.handle_change.bind(this, 'api_pw')}
        />

        <View style={{marginTop: 10}}>
          <Button
            onPress={this.save.bind(this)}
            title="Save Settings"
            color="#000000"
          />
        </View>

        <View style={{marginTop: 30}}>

          { _user_signedin }

          <Button
            onPress={this.signout.bind(this)}

            title="Sign Out"
            color="#C1073A"
          />
        </View>
      </View>
    )
  }
}

Settings.propTypes = {

};

export default Settings;