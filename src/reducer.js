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

        case 'ADD_INBOUND':
            const addedState_inbound = {
                ...state,
                inbound: action.playload
            }
            return addedState_inbound;

        case 'ADD_INBOUND_USER':
            const addedState_inbound_user = {
                ...state,
                inbound_user: action.playload
            }
            return addedState_inbound_user;

        case 'ADD_OUTBOUND':
            const addedState_outbound = {
                ...state,
                outbound: action.playload
            }
            return addedState_outbound;
        default:
            break;
    }
    return state;
}
export default reducer;
