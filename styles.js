import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    position: 'absolute',
    top:0,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 82,
    left: 56,
    width: 90,
    textAlign: 'center',
    color: '#7591af',
    fontSize: 25,
    fontWeight: "100"
  },
  menu_right: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  menu_left: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});
// export styles;
