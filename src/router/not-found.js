export default{
    path:"/:catchAll(.*)",
    name:"Not Found",
    component:()=>{
        return import("../views/404/PageNotFound")
    }
}