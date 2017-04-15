

const morphiumReducer = (state, action) => {
  switch (action.type) {
    case 'TRIGGER':
      console.log('Store: TRIGGER action')
      newState = {
        triggerTime: (new Date()).toUTCString(),
        interval: (new Date(1970,0,1,0,1,0,0)).toUTCString()
      }
      // persistStore(newState);
      return(newState);

    // case 'persist/REHYDRATE':
    //   console.log('rehydrating' + JSON.stringify(state))
    //   return(state);
    default:
      console.log('s: ' + state.triggerTime)
      // state = {...state}

      console.log('unknown action: ' + action.type)
      return(state)
  }
}
export default morphiumReducer;
// export  initState;
