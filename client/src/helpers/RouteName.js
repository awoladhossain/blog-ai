// Welcome/Landing page
export const RouteWelcome = "/";
// Auth Routes
export const RouteSignup = "/signup";
export const RouteSignin = "/signin";

// Main App Routes (after login or "Learn More")
export const RouteIndex = "/app";
export const RouteProfile = "/app/profile";
export const RouteCategoryDetails = "/app/categories";
export const RouteAddCategory = "/app/categories/add";
export const RouteEditCategory = (category_id) => {
  if (category_id) {
    return `/app/categories/edit/${category_id}`;
  } else {
    return `/app/categories/edit/:category_id`;
  }
};
export const RouteBlog = "/app/blog";
export const RouteBlogAdd = "/app/blog/add";
export const RouteBlogEdit = (blog_id) => {
  if (blog_id) {
    return `/app/blog/edit/${blog_id}`;
  } else {
    return `/app/blog/edit/:blog_id`;
  }
};

export const RouteBlogDetails = (category, blog, blog_id) => {
  if (!category && !blog) {
    return `/app/blog/:category/:blog/:blog_id`;
  }else{
    return `/app/blog/${category}/${blog}/${blog_id}`;
  }
};
