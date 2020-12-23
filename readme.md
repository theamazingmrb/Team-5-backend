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
1. User is able to view pre-populated recipes or search for new recipes
    * Set up API connection to pull from Spoonacular's API's available recipes
    * Pull in all recipe details through API
    * Redirect to recipe detail page when selected
1. User is able to add a recipe to my 'cookbook'
    * Confirm addition by navigating to 'My Recipes' page with all favorited recipes
    * CREATE route to add recipe in recipe model
1. User is able to view recipes according to category
    * Click "Categories" link to navigate to categories page
    * GET route to get recipes with certain category
1. User is able to write a review/comment on a recipe
    * PUT route to add comment to a recipe


### Routes

| Route | HTTP Verb | CRUD | Model | Explanation
| ------------- | ------------- | ------------- | ------------- | ------------- |
| `"/"` | GET  | READ | N/A | Renders home page
|`"/recipes"`  | GET  | READ | `recipe` | Renders all search recipes for searched recipe
|`"/recipes/my-recipes"` | GET | READ | `recipe` | Displays user's saved favorite recipes
|`"/recipes/my-recipes"` | POST | CREATE | `recipe` | Adds a new recipe to the user's favorite recipes
|`"/recipes/my-recipes"` | DELETE | DELETE | `recipe` | Deletes recipe from user's favorite recipes
|`"/recipes/:id"` | GET | READ | `recipe` | Displays selected recipe's details
|`"/recipes/:id/comments"` | POST | CREATE | `comment` | Adds a new comment/review to a recipe
|`"/recipes/:id/"` | DELETE | DELETE | `comment` | Deletes user's comment
|`"/recipes/:id/"` | PUT | UPDATE | `comment` | Updates user's comment
|`"/personals"` | GET | READ | `personal` | Get all of user's personally created recipes
|`"/personals/show/:id"` | GET | READ | `personal` | Displays selected personally created recipe's details
|`"/personals/show/:id"` | POST | CREATE | `personal` | Creates a new personally created recipe for the user
|`"/personals/show/:id/"` | PUT | UPDATE | `personal` | Updates user's personally created recipe
|`"/personals/:id/"` | DELETE | DELETE | `personal` | Deletes personally created recipe
|`"/personals/new/"` | GET | READ | N/A | Renders page to edit a personally created recipe
|`"/personals/edit/:id"` | GET | READ | N/A | Renders page to create a new recipe
|`"/categories"` | GET | READ | N/A | Renders categories home page
|`"/categories/breakfast"` | GET | READ | N/A | Displays breakfast related recipes
|`"/categories/lunch"` | GET | READ | N/A | Displays lunch related recipes
|`"/categories/dinner"` | GET | READ | N/A | Displays dinner related recipes
|`"/categories/dessert"` | GET | READ | N/A | Displays dessert related recipes


### MVP



### Stretch Goals


## Challenges:
