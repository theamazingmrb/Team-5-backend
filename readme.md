 # FOMO NOMO! 

 ---

## How to Set Up:
1. Fork & Clone
2. Install dependencies
```
npm i
```
3. Access: 

Link: 
Test Email: 
Test PAssword: 


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

### ERD:
![Screen Shot 2020-12-24 at 17 25 24](https://user-images.githubusercontent.com/68154135/103107550-6c465580-460d-11eb-826f-24db53149811.png)


### Original Wireframes:
Home Page:
![Screen Shot 2020-12-23 at 9 17 25 PM](https://user-images.githubusercontent.com/68258139/103062876-69435a80-4564-11eb-8e03-f6bea83a5212.png)
Event Page: 
![Screen Shot 2020-12-23 at 9 23 47 PM](https://user-images.githubusercontent.com/68258139/103063141-3e0d3b00-4565-11eb-9b1d-0a3c1076bdb0.png)
Profile Page: ![Screen Shot 2020-12-23 at 9 25 38 PM](https://user-images.githubusercontent.com/68258139/103063231-83ca0380-4565-11eb-9005-f9845d7b26a2.png)

(Add photo once completed)



### Color Pallet:

```

```

### User Stories:
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
    


### Routes:
![Screen Shot 2020-12-24 at 11 44 37 AM](https://user-images.githubusercontent.com/68258139/103104711-aac41c00-45dd-11eb-9fa7-20e9c06c493e.png)
| Route | HTTP Verb | CRUD | Model | Explanation			
| ------------- | ------------- | ------------- | ------------- | ------------- |			
| `"/" or "/home"` ✅| GET | READ | N/A | Renders home page			
|`"/register"`✅ | POST | CREATE | `user` | Renders form for new user to sign up			
|`"/login"` ✅| POST | CREATE | `user` | Renders form for user to login			
|`"/profile"` | GET | READ | `user` & `calendar` | Displays user's profile and saved calendar			
|`"/profile"` | POST | CREATE | `calendar` | Adds a saved event to the user's calendar			
|`"/profile"` | DELETE | DELETE | `calendar` | Removes saved event from calendar			
|`"/events"` | GET | READ | N/A | Renders all search events for searched location			
|`"/events/id"` | GET | READ | `event` | Renders all event details for selected event			
|`"/events/:id/comments"` ✅| POST | CREATE | `comment` | Allows user to add comment to an event			






		
### MVP:
- Signup and login  ✅
- to search for events (location, performer, venue, etc)
- to add event to their user calendar
- to update/delete their calendar
- update their primary location within profile (search by zip?)
Be able to see user public pages 



### Stretch Goals:
- User can add a photo to their profile using cloudinary
- User should be able to recommend events to other users 
- User should be able to give a star rating. 


## Challenges:
- Adding events to user's calendar
- Saving frontend API data to backend
- Associating comment to user and event
- Testing in postman (specifically for user)
