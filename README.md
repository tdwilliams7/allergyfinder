## Allergy finder

#### user profiles of allergies, food allergies or preferences.

[hosted on heroku](https://dry-taiga-95955.herokuapp.com)\
[Mobile Project](https://github.com/tdwilliams7/allergies-mobile)

##### Frontend

* SPA made with CRA, React-router v4, Axios for api calls, Redux to handle state and user logged in status, Mostly styled components with css sprinkled in where needed. Authorization token stored in localStorage.

##### Backend

* Express server with separated routes for different schemas. Mongodb for server accessed through mongoose. Authorization token encrypted with bcrypt and signed and verified with jsonwebtoken.

##### Plan

* Add ability to search recipes for safe things to eat.

* React native app connecting to same server.

##### Server routes

* Routes are split up by schemas. User models has routes for allergies, doctors, and contacts since storing all of those as subdocs in the user.

* POST: `/users/signup` - sign up for new account. musty have name, email, and password. Able to add to the profile later.

* POST: `/users/login` - login after signing up. If logging in for the first time, have to use email and password, otherwise the JWT token stored in localStorage will handle logging in automatically.

* PATCH: `/users/profile/update` - update name and DOB. TODO: Figure out picture uploading and url being added to the user schema.

* PATCH: `/users/profile/allergy` - add allergy to user, returns updated user.

  `const AllergySchema = new Schema({ name: { type: String, required: true }, severity: { type: Number, required: false }, reaction: { type: String, required: false }, comments: { type: String, required: false }, treatment: { type: String, required: false } });`

* PATCH: `/users/profile/contact` - add contact to user, returns updated user.

  `const ContactSchema = new Schema({ name: { type: String, required: true }, phone: { type: String, required: true }, email: { type: String, required: true }, relation: { type: String, required: true }, comments: { type: String, required: false } });`

* PATCH: `/users/profile/doctor` - add doctor to user, returns updated user.

  `const DoctorSchema = new Schema({ name: { type: String, required: true }, phone: { type: String, required: true }, email: { type: String, required: true }, specialty: { type: String, required: true }, comments: { type: String, required: false } });`

* GET: `/allergy` - returns an array of all of the allergy names.

* POST: `/allergy/new` - add a new allergy name to allergy collection.
  `{ "name": required }`

* GET: `/reaction` - returns an array of all of the allergy names;

* POST: `/reaction/new` - adds a new reaction name to collection and returns that reaction.
  `{ "name": required}`
