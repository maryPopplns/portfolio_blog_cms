export default async function getPosts() {
  let returnedPosts;
  await fetch('https://protected-beyond-87972.herokuapp.com/post')
    .then((result) => result.json())
    .then((posts) => (returnedPosts = posts));
  return await returnedPosts;
}
