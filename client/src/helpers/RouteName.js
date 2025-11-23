export const RouteIndex = '/'
export const RouteSignup = '/signup'
export const RouteSignin = '/signin'
export const RouteProfile = '/profile'
export const RouteCategoryDetails = '/categories'
export const RouteAddCategory = '/categories/add'
export const RouteEditCategory = (category_id)=>{
  if(category_id){
    return `/categories/edit/${category_id}`;
  }else{
    return `/categories/edit/:category_id`;
  }
}
