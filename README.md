### QUICK START:

Add _.env_ file to root directory. It should contain the following content:

    REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_access_key

Then run:

    npm install
    npm start

### APP LIVE

[https://giedryza.github.io/image-search](https://giedryza.github.io/image-search)

### FOLDER STRUCTURE:

I have 4 folders in src directory:

- **assets** holds my styles (.scss) and svgs (icons).
- **components** holds all components of the app. The main one is _Search.js_ that holds all the logic. Some utility-ish components (_ButtonPrimary, Title, Layout_) may be moved to other folders, but since its a small application, decided it makes sense to keep it like that.
- **context** is obviously responsible for the context of the app. It holds global state _(store.js)_ and my _SearchContext_. Initially the logic of the _store.js_ was in the App component, but i wanted to keep it clean, so moved the logic into separate component. This is especially helpful when application scales.
- **utils** holds helper components that can easily be reused in other applications as well. I created _Icon_ component so in the app i can easily access any icon by providing name via props.

### LOGIC:

The whole logic is kept in one component _(Search.js)_ and outsourced into its child components. Also all the simple rendering logic is in the function body as well because i wanted to keep my JSX clean.

### CLASS vs. FUNCTION:

Initially I made the application using stateful class based component, but later on decided to refactor it into functional component using hooks. This is the path React is moving forwards so i guess its a good idea to come along.

### ERRORS:

Errors are displayed in the modal. The modal can be closed by clicking backdrop or 'close' button. Errors handled:

- when user tries to submit search with no keywords
- when search returns 0 results
- when API response is not OK
- when user tries to save an empty search
- when user tries to save the search that has already been saved

### SOME INTERESTING SPOTS:

- Exactly zero 3rd party dependecies were used building this app.
- Used little css padding trick to maintain the perfect aspect ratio (16:9) for image containers.
- Image grid uses minmax, so its responsive without any media queries.
- Decided to implement 'load more' since it makes perfect sense for this application.
- Spinner is shown instead of the button - either Search or Load More, depending on the user action.
- Application is quite accessible. User can navigate easily with a keyboard.
