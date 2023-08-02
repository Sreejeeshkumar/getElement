console.log('person 1:shows ticket')

console.log('person 2:shows ticket')

const pwbt=new Promise((resolve,reject)=>{

    setTimeout(()=>{

        resolve('ticket')

    },3000)

})

const gpc=pwbt.then((t)=>

{

    console.log(`wif:I HAVE THE TICS`)

    console.log(`hus:we should go in`)

    console.log(`wif:I am hungry`)

console.log(`person 3:shows ${t} popcorn`)

})

const gb=gpc.then((t)=>

{

    console.log(`hus:I have popcorn`)

    console.log(`hus:we should go in`)

    console.log(`wif:I need butter`)

    return new Promise((resolve,reject)=> resolve(`${t} butter`))



})

const gcd=gb.then((t)=>{

    console.log(`can we get cold drinks`)

})





console.log('person 1:shows ticket')

console.log('person 2:shows ticket')

const prevmovie=async()=>

{

    const pwbt=new Promise((resolve,reject)=>{

    setTimeout(()=>{

        resolve('ticket')

    },3000)

})

const gpc=new Promise((resolve,reject)=>resolve(`popcorn`))

const ob=new Promise((resolve,reject)=>resolve(`butter`))

const gcd=new Promise((resolve,reject)=>resolve(`cold drinks`))

let ticket=await pwbt

console.log(`wif:I HAVE THE ${ticket}`)

    console.log(`hus:we should go in`)

    console.log(`wif:I am hungry`)

    let ppcrn=await gpc

     console.log(`hus:I have ${ppcrn}`)

    console.log(`hus:we should go in`)

    console.log(`wif:I need butter`)

     let gob=await ob

     console.log(`hus:we have ${gob} let us go`)

       let cd=await gcd

     console.log(`hus:we have ${cd} let us go`)

     

return ticket

}

prevmovie().then((m)=>console.log(m))

console.log('person 4:shows ticket')

console.log('person 5:shows ticket')



const blogs = [];



function delay(ms) {

 return new Promise((resolve) => setTimeout(resolve, ms));

}



async function create1stBlog() {

 await delay(1000);

 blogs.push({ title: 'BLOG1' });

}



async function create2ndBlog() {

 await delay(2000);

 blogs.push({ title: 'BLOG2' });

}



async function deleteBlog() {

 await delay(1000);

 if (blogs.length > 0) {

  const deletedBlog = blogs.pop();

  return deletedBlog;

 } else {

  reject ("ERROR");

 }

}



function updateLastUserActivityTime() {

 return new Promise((resolve) => {

  setTimeout(() => {

   const lastActivityTime = new Date().toISOString();

   console.log(`Last activity time of user ${lastActivityTime}`);

   resolve(lastActivityTime);

  }, 1000);

 });

}



async function main() {

 try {

  await Promise.all([create1stBlog(), create2ndBlog()]);

  const lastActivityTime = await updateLastUserActivityTime();

  console.log('All posts created:');

  blogs.forEach((blog) => console.log(blog.title));

  console.log(`Last activity time of user: ${lastActivityTime}`);

  const deletedBlog = await deleteBlog();

  console.log(`Deleted Blog: ${deletedBlog.title}`);

  console.log('New set of Posts:');

  blogs.forEach((blog) => console.log(blog.title));

 } catch (error) {

  console.log(error);

 }

}



main()