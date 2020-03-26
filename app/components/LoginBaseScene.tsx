import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';

type State<P> = P & {
  visible: boolean;
};

abstract class LoginBaseScene<P extends object = {}> extends Component<any,State<P>> {
  abstract renderModal(): React.ReactElement<any>;

  constructor(props, state?: P) {
    super(props);

    this.state = {
      ...state,
      visible: true,
    };

  }

  open = () => this.setState({visible: true} as any);
  close = () => this.setState({visible: false} as any);
  isVisible = () => this.state.visible;
  
  render() {
    return (
      <View style={styles.view}>
        <LoginBaseScene/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default LoginBaseScene;
