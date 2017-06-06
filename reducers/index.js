

const morphiumReducer = (state, action) => {
  switch (action.type) {
    case 'TRIGGER':
      console.log('Store: TRIGGER action')
      newState = {
        ...state,
        triggerTime: (new Date()).toUTCString(),
      }
      return(newState);
    case 'SET_INTERVAL':
      console.log('Store: SET_INTERVAL action')
      newState = {
        ...state,
        interval: action.interval,
      }
      return(newState);
    case 'SET_TITLE':
      console.log('Store: SET_TITLE action: '+action.title)
      newState = {
        ...state,
        title: action.title,
      }
      return(newState);
    default:
      console.log('s: ' + state.triggerTime)
      // state = {...state}

      console.log('unknown action: ' + action.type)
      return(state)
  }
}
export default morphiumReducer;
// export  initState;
