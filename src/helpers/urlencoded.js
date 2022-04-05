export default function urlencoded(object) {
  let formBody = [];
  for (const property in object) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(object[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return formBody;
}
