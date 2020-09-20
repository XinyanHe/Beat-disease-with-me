# team14
https://beat-disease-with-me.herokuapp.com/

## Getting Started
This is a project of CSC309 at University of Toronto made by Xin Peng, Xinyan He, Ruoxi Su and Yingke Wang(dropped the course during Phase 2). There's a deployed website on https://beat-disease-with-me.herokuapp.com/ which serves only for academic purposes.
### Install Dependencies
- $(the path of folder containing our project)/beat-disease-with-me>npm install
- $(the path of folder containing our project)/beat-disease-with-me/client>npm install

### Run App

- Start mongo database server in your terminal: $mongod
- Connect to the altas database if you want to inspect the database
- $(the path of folder containing our project)/beat-disease-with-me/client >$npm run build-run
- Access our page on http://localhost:5000/

## How to use
- The home page is for login. There are two links below the LOGIN button, one will direct to the regular user 
registration page and the other will direct to the professional one. New users can create their accounts by 
clicking the corresponding link.

### sample users for login:

(1) Regular User:
- User Name:user
- Password:user

(2) Professional User:
- User Name:user2
- Password:user2

 (3) Admin:
- User Name:admin
- Password:admin
---
## For regular users:
After logging in, there is a navigation bar on top so regular users can choose to go to the target page 
they want to. If the user clicks LOG OUT, he/she will be redirect to the login page.

### Search Page
Regular users can search the keywords they are interested in the search bar.
They could also apply the filter to the posts. 
Filters here including the tags, locations and user types. 
What's more, users could also choose to sort these posts by likes or time.
Also, there are suggested posts for regular users, by default, we will show the newest posts. But if user filter to show only following, we will show the newest posts of their following users.
When they find the post they want, they could click the post title to see the whole post.

### Post Page
In the post page, users could comment on the post by clicking on "Add Your Comment". There is also a like and dislike button near the author's profile photo. 
Users could also click the author's profile photo to see the author's whole profile if the author is a professional user. There will be a certificate and description about relative experience on the profile page, and a follow/unfollow button under the author's profile picture.

### New Post Page
Users can create a new post by typing in the title and the content. They also need to choose the tags and location for this post.

### Manage account Page
There are mainly three functions on this page. 
Users could choose the certain page they want to go to on the left navigation bar. 
Personal Info is for editing their personal information.
 Post History is for checking their post history, they can delete certain post on this page. Following is for checking
  the professional users they are currently following, they can unfollow certain professional user.
---
## For professional users:
The pages of professional user are similar to regular user, but there're also several difference between them.

### Search Page
Search page for professional user is exactly the same as the one for regular user, except that the suggested posts for professional users are the newest posts.

### Post Page
Professional user can also comment on the post, and like or dislike the post. However, professional user are unable to follow/unfollow any other users, they can only be 
 followed by others.
 
### New Post Page
 The new post page for professional user is exactly the same as the one for regular user.

### Manage Account Page
Instead of following, professional users can see their followers at the Followers page,

---
## For admin:
### Manage Posts Page
- Admin can search the posts by post titles in the search bar. They can see the entire post after they click the "DETAILS" button so they could choose to delete the posts by clicking the trash icon.

### Manage Users Page
- Admin can search the users by their user name in the search bar. They could choose to delete the user accounts by clicking the trash icon.

### Authorize Accounts Page
- There will be a list of professional accounts. Admin can choose to authorize those accounts after seeing the certificates they posted. And they can hover the certificates to zoom in. If they click on the check icon, the state of professional user will change from "In progress" to "Authorized", and if they click on the cross icon, the state of professional user will change from "In progress" to "Declined". If they want to remove user from Authorize Accounts Page (not remove from database), they can click on the trash icon.
---
## Difference with proposal
1) In the proposal, we decided to add a star level for each professional account.
However, we found out later that this idea would lead to the consequence that users
may only willing to read the post from authors with high star levels. So we remove 
this feature currently.

2) To make our websites be more beneficial for users to find their target information, we decided to
add tags and locations feature for each post. This could raise the search efficiency and help users 
find the target information more quickly. Tags show whether the post is a donation info, lockdown policy updates or just public health. 
For the search page, users can now select a tag and a location. For example, when a user selects a tag as “Donation information” and location as “Canada”, posts about donation information in Canada will be shown.
---
## Overview of Routes
### USERS 
- POST http://localhost:5000/users </br>
Route for adding regular user, with *no* following, *no* likes, *no* dislikes (empty arrays). </br>
Request body expects </br>
{ </br>
   "username": (unique) String, </br>
   "emailAddress": (valid email address) String, </br>
   "password": String, </br>
   "userType": String, </br>
   "imageId": String </br>
} </br>
Returned JSON is the database document added.

- GET http://localhost:5000/users </br>
Route for getting all regular user information. </br>
Returned JSON is the entire regular user document.

- DELETE http://localhost:5000/users/:id </br>
Route for deleting a specific regular user by id. </br>
Returned JSON is the database document deleted.
 
- GET http://localhost:5000/users/:id </br>
Route for getting the information for a specific regular user by id. </br>
Returned JSON is the database document wanted.
 
- PATCH http://localhost:5000/users/:id </br>
Route for changing regular user information. </br>
Request body expects </br>
{ </br>
   "following": Array of String, </br>
   "username": String, </br>
   "emailAddress": String, </br>
   "password": String, </br>
   "likes": Array of String, </br>
   "dislikes": Array of String, </br>
   "imageId": String </br>
} </br>
Returned JSON is the database document updated.
 
### PUSERS
- POST http://localhost:5000/pusers </br>
Route for adding professional user, with *no* follower, *no* likes, *no* dislikes (empty arrays). </br>
Request body expects </br>
{ </br>
   "username": (unique) String, </br>
   "emailAddress": (valid email address) String, </br>
   "password": String, </br>
   "description": String, </br>
   "userType": String, </br>
   "imageId": String, </br>
   "certificateId": String </br>
} </br>
Returned JSON is the database document added.

- GET http://localhost:5000/pusers </br>
Route for getting all professional user information. </br>
Returned JSON is the entire professional user document.

- DELETE http://localhost:5000/pusers/:id </br>
Route for deleting a specific professional user by id. </br>
Returned JSON is the database document deleted.
 
- GET http://localhost:5000/pusers/:id </br>
Route for getting the information for a specific professional user by id. </br>
Returned JSON is the database document wanted.
 
- PATCH http://localhost:5000/pusers/:id </br>
Route for changing professional user information. </br>
Request body expects </br>
{ </br>
   "status": String, </br>
   "onPage": boolean, </br>
   "follower": Array of String, </br>
   "username": String, </br>
   "emailAddress": String, </br>
   "password": String, </br>
   "description": String, </br>
   "likes": Array of String, </br>
   "dislikes": Array of String, </br>
   "imageId": String </br>
} </br>
Returned JSON is the database document updated.


### POSTS
- POST http://localhost:5000/posts </br>
Route for adding post, with *no* comments (an empty array). </br>
Request body expects </br>
{ </br>
  "userObj": { </br>
      "_id": String, </br>
      "username": String,</br>
      "userType": String, </br>
      "imageId": String </br>
      }, </br>
  "title": String, </br>
  "body": String, </br>
  "tag": String, </br>
  "location": String </br>
} </br>
Returned JSON is the database document added.

- GET http://localhost:5000/posts </br>
Route for getting all post information. </br>
Returned JSON is the entire post document.

- DELETE http://localhost:5000/posts/:id </br>
Route for deleting a specific post by id. </br>
Returned JSON is the database document deleted.
 
- PATCH http://localhost:5000/posts/:id </br>
Route for changing post information. </br>
Request body expects </br>
{ </br>
   "likes": Number </br>
} </br>
Returned JSON is the database document updated.
 
### COMMENTS
- POST http://localhost:5000/posts/:id </br>
Route for adding a comment to a specific post. </br>
Request body expects </br>
{ </br>
   "commenter": String, </br>
   "content": String, </br>
   "imageId": String </br>
}</br> 
Returned JSON is the updated post.
