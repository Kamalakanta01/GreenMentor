let initialData={
    login:false,
    name:"User",
    loading:false,
    totalPages:0
}

export const myReducer=(store=initialData,action)=>{

if(action.type==="LOGGED_IN"){
    return {
        ...store,login:true,name:action.payload
    }
}
if(action.type==="LOGGED_OUT"){
    return {
        ...store,login:false,name:"User"
    }
}
if(action.type==="LOADING"){
    return {
        ...store,loading:true
    }
}
if(action.type==="LOADED"){
    return {
        ...store,loading:false
    }
}
if(action.type==="TOTAL_PAGES"){
    return {
        ...store,totalPages:action.payload
    }
}
    return store
}