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
* User Auth Pages (Login/Sign Up)
* Event Search
* Searched Event Population Page
* Event Detail Pages
* My Events Show Page (My Calendar)

### ERD

https://lucid.app/lucidchart/fedc4728-9636-4691-b53b-7a313be1a67e/edit?shared=true&page=0_0#

### Original Wireframes



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
|`"/events"`  | GET  | READ | N/A | Renders all search events for searched location
|`"/profile"` | GET | READ | `user` | Displays user's profile and saved calendar

### MVP
User should be able to 


### Stretch Goals


## Challenges:
git 