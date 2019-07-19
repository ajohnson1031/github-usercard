/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector(".cards");

const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

const getProfile = axios
  .get("https://api.github.com/users/ajohnson1031")
  .then(response => {
    cards.appendChild(createCard(response));
  })
  .then(
    followersArray.map(elem => {
      axios
        .get(`https://api.github.com/users/${elem}`)
        .then(response => {
          cards.appendChild(createCard(response));
        })
        .catch(err => console.log(`Error: ${err}`));
    })
  )
  .catch(err => console.log(`Error: ${err}`));

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const createCard = userObject => {
  //Creation of Elements
  const card = document.createElement("div"),
    cardImg = document.createElement("img"),
    cardInfo = document.createElement("div"),
    cardH3 = document.createElement("h3"),
    cardUserP = document.createElement("p"),
    cardLocationP = document.createElement("p"),
    cardProfileP = document.createElement("p"),
    cardFollowersP = document.createElement("p"),
    cardFollowingP = document.createElement("p"),
    cardBioP = document.createElement("p"),
    cardProfileLink = document.createElement("a"),
    cardExpandButton = document.createElement("p");

  //Element Classing
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  cardH3.classList.add("name");
  cardUserP.classList.add("username");
  cardExpandButton.classList.add("button");

  //Element Attribute Setting
  cardImg.setAttribute("src", userObject.data.avatar_url);
  cardProfileLink.setAttribute("href", userObject.data.html_url);
  cardProfileLink.setAttribute("target", "_blank");

  //Element TextContent Setting

  cardH3.textContent = null ? "Name Not Provided" : userObject.data.name;
  cardUserP.textContent = userObject.data.login;
  cardLocationP.textContent =
    userObject.data.location !== null
      ? `Location: ${userObject.data.location}`
      : "Location Not Provided";
  cardProfileP.textContent = `Profile: `;
  cardFollowersP.textContent = `Followers: ${userObject.data.followers}`;
  cardFollowingP.textContent = `Following: ${userObject.data.following}`;

  const bio =
    userObject.data.bio === null
      ? "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus rerum porro voluptates? Libero dolore error, cumque laudantium aperiam magnam quis, assumenda at corporis enim accusamus, similique deserunt ipsum impedit autem."
      : userObject.data.bio;

  cardBioP.textContent = `Bio: ${bio}`;

  cardProfileLink.textContent = cardProfileLink;

  cardExpandButton.textContent = "Expand";

  //Card Expand Button
  cardExpandButton.addEventListener("click", e => {
    e.stopPropagation();
    e.currentTarget.textContent =
      e.currentTarget.textContent === "Expand" ? "Minimize" : "Expand";
  });

  //Element Appending
  cardInfo.appendChild(cardH3);
  cardInfo.appendChild(cardUserP);
  cardInfo.appendChild(cardLocationP);
  cardInfo.appendChild(cardProfileP);
  cardInfo.appendChild(cardFollowersP);
  cardInfo.appendChild(cardFollowingP);
  cardInfo.appendChild(cardBioP);
  cardInfo.appendChild(cardExpandButton);

  cardProfileP.appendChild(cardProfileLink);

  card.appendChild(cardImg);
  card.appendChild(cardInfo);

  return card;
};

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
