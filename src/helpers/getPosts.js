export default function getPosts() {
  fetch('https://protected-beyond-87972.herokuapp.com/post')
    .then((result) => result.json())
    .then((result) => console.log(result))
    .catch((error) => {
      //
    });
}
