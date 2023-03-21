/**
 *  AUTHOR: Joanna Zabasajja
    COURSE: CSc 337 | Spring 2023 | Dicken
    FILENAME: client.js | PA8
    DESCRIPTION: This js file controls the functions that allow a user to interact
    with index.html as appropriate (client-side).
 */

/**
 * Retrieves from, and displays the chats in, the database.
 */
function getChats() {
  let url = '/chats';
  let p = fetch(url);
  let ps = p.then((response) => {
    return response.text();
  });
  ps.then((text) => {
    console.log(text);
    let x = document.getElementById('chatWindow');
    x.innerText = text;
  });
  p.catch(() => {
    alert('Something went wrong! --getChats');
  });
}
  
/**
 * Gathers the information necessary to post a chat to the server so it can be stored
 *  in the database.
 */
function createChat() {
  let a = document.getElementById('chatAlias').value;
  let m = document.getElementById('chatMessage').value;
  let url = '/chats/post/' + a + '/' + m;
  let p = fetch(url, { method: 'POST' });
  p.then(() => {
    getChats();
  });
  p.catch(() => {
    alert('Something went wrong! --createItem');
  });
}

//1 second ping
setInterval(getChats, 1000);
  
  