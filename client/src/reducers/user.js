const userReducer=(state=[],action)=>{
    switch (action.type) {
        case "FEATCH_USER":
            return action.user
        case "UPDATE_USER":
            return action.user.map((u)=>u.id === action.id ?{...action.user,logedin:action.user.logedin} : action.user)
        default:
            return state
    }
}
export default userReducer