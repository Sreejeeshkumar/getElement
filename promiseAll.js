const blogs = [];
function create1stBlog() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      blogs.push({ title: 'BLOG1' });
      resolve();
    }, 3000);
    }, 1000);
  
}

function create2ndBlog() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      blogs.push({ title: 'BLOG2' });
      resolve();
    }, 2000);
  });
}
function deleteBlog() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (blogs.length > 0) {
        const deletedBlog = blogs.pop();
        resolve(deletedBlog);
      } else {
        reject("ERROR");
      }
    }, 1000);
  });
}

function updateLastUserActivityTime(userId) {
function updateLastUserActivityTime() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lastActivityTime = new Date().toISOString();
      console.log(`Last activity time of user ${userId}: ${lastActivityTime}`);
      console.log(`Last activity time of user  ${lastActivityTime}`);
      resolve(lastActivityTime);
    }, 1000);
  });
}

create1stBlog()
  .then(create2ndBlog)
  .then(() => updateLastUserActivityTime(123)) 
Promise.all([create1stBlog(), create2ndBlog()])
  .then(() => updateLastUserActivityTime())
  .then((lastActivityTime) => {
    console.log('All posts created:');
    blogs.forEach((blog) => console.log(blog.title));
    console.log(`Last activity time of user: ${lastActivityTime}`);
  })
  .then(() => deleteBlog())
  .then((deletedBlog) => {
    console.log(`Deleted Blog: ${deletedBlog.title}`);
    console.log('New set of Posts:');
    blogs.forEach((blog) => console.log(blog.title));
  })
  .catch((error) => console.log(error));
}