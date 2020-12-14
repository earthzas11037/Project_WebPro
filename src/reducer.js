const initialState = {
    user:{
        user_id: null,
        name: null,
        position_eng: null,
        position_th: null,
        type_name: null
    }
}
const reducer = (state = initialState, action) => {
    // const user = state.user;
    switch(action.type) {
        case 'ADD_USER':
            const addedState = {
                ...state,
                user:{
                    user_id: action.playload.sub,
                    name: action.playload.name,
                    position_eng: action.playload.position_eng,
                    position_th: action.playload.position_th,
                    type_name: action.playload.type
                }
            }
            return addedState;
            
        default:
            break;
    }
    return state;
}
export default reducer;
