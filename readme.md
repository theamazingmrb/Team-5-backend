 # FOMO NOMO! 

 ---

## How to Set Up:
1. Fork & Clone
2. Install dependencies
```
npm i
```
3. 


---

## Concept:

The FOMO NOMO App is for the user who is bored at home and is looking for new virtual events to avoid the FOMO. Users can add events to their personal calendar or coordinate attending events with their friends.

## Technologies Used:

* Node / Express
* CSS
* MongoDB
* Axios for API calls
* React.js
* User Auth
* [Ticketmaster API](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)


## Approach:

### App Components

* Home Page
* User Auth Pages (Login/Sign Up) ✅
* Event Search
* Searched Event Population Page
* Event Detail Pages
* My Events Show Page (My Calendar)

### ERD

https://lucid.app/lucidchart/fedc4728-9636-4691-b53b-7a313be1a67e/edit?shared=true&page=0_0#



### Original Wireframes

https://www.figma.com/file/mX3ffaiWw5n8SdHHM5pwDM/FOMO-NO-MO!?node-id=272890%3A0
(Add photo once completed)



### Color Pallet:

```

```

### User Stories
1. User will land on a homepage and be directed to login / sign-up when any links are clicked
   * Create redirect to login page
   * Verify if user exists or if new sign up is needed (authentication)
   * Add user to user model
1. User is directed to home page after login
    * Create redirect to home page
1. User is able to view pre-populated events or search for new events in their area
    * Set up API connection to pull from Ticketmasters's API's events
    * Pull in all event details through API
    * Redirect to event detail page when selected
1. User is able to add an event to their calendar
    * Confirm addition by navigating to 'My Calendar' page with all favorited events
    * CREATE route to add event in event model
1. User is able to write a review/comment on an event
    * PUT route to add comment to an event


### Routes

| Route | HTTP Verb | CRUD | Model | Explanation
 | ------------- | ------------- | ------------- | ------------- | ------------- |
 | `"/" or "/home"` | GET  | READ | N/A | Renders home page
 |`"/register"` | POST | CREATE | `user` | Renders form for new user to sign up
 |`"/login"` | POST | CREATE | `user` | Renders form for user to login
 |`"/profile"` | GET | READ | `user` & `calendar` | Displays user's profile and saved calendar
 |`"/profile"` | POST | CREATE | `calendar` | Adds a saved event to the user's calendar
 |`"/profile"` | DELETE | DELETE | `calendar` | Removes saved event from calendar
 |`"/events"`  | GET  | READ | N/A | Renders all search events for searched location
 |`"/events/id"`  | GET  | READ | `event` | Renders all event details for selected event
 |`"/events/:id/comments"` | POST  | CREATE | `comment` | Allows user to add comment to an event
 |`"/events/id"`  | PUT  | UPDATE | `comment` | Allows user to update comment on an event
 |`"/events/id"`  | DELETE  | DELETE | `comment` | Allows user to delete comment to an event




<!-- Methods	URLs	Actions
GET	/ or /home	Visit the app landing page
POST	/auth/signup	-User Signup
POST	/auth/signin	-User Login
GET	/home	-axios call for events
POST	/user/calendar	-add event to Calendar -->
		
### MVP
- Signup and login  ✅
- to search for events (location, performer, venue, etc)
- to add event to their user calendar
- to update/delete their calendar
- update their primary location within profile (search by zip?)
Be able to see user public pages 



### Stretch Goals
- User can add a phot to their profile using cloudanry
- User should be able to recoomend events to other users 
- User should be able to give a star rating. 


## Challenges:
