const initialState = {
    user:{
        user_id: null,
        fullname: null,
        username: null,
        faculty_id: null,
        type_name: null,
        tel: null,
        email: null,
        position: null,
        name_title: null
    },
    inbound:{
        selectFaculty: null,
        startDate: null,
        endDate: null,
        faculty: null
    },
    inbound_user:{
        selectRoom: null,
        startDate: null,
        endDate: null,
        room: null
    },
    outbound:{
        selectFaculty: null,
        startDate: null,
        endDate: null,
        faculty: null
    },
}
const reducer = (state = initialState, action) => {
    // const user = state.user;
    switch(action.type) {
        case 'ADD_USER':
            const addedState = {
                ...state,
                user: action.playload
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
