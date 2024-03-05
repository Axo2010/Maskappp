const firebaseConfig = {

  apiKey: "AIzaSyCQekH8F87Jcj5Y_UP3AcJe9wtOQVpmwo4",

  authDomain: "kionder.firebaseapp.com",

  databaseURL: "https://kionder-default-rtdb.firebaseio.com",

  projectId: "kionder",

  storageBucket: "kionder.appspot.com",

  messagingSenderId: "1083671727631",

  appId: "1:1083671727631:web:8f6af2e2866086f7e55d7a"

};


firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");



document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";


function addRoom() {
  room_name = document.getElementById("room_name").value;


  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });


  localStorage.setItem("room_name", room_name);
  window.location.replace("page.html");


}




function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Inicia código
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name + "<img class='user_tick' src='mask.webp'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";


        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
        //Termina código
      }
    });
  });
}
getData();




function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("inicio.html");
}




function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "page.html";
}
