
##  Shopify Frontend Internship Challenge - Fall 2021
The website can be viewed here https://shoppies-c6ygye14x.vercel.app/

## Product Requirements

1.  Search results should come from OMDB's API (free API key: [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)). ✅
    
2.  Each search result should list at least its title, year of release, and a button to nominate that film. ✅
    
3.  Updates to the search terms should update the result list. ✅
    
4.  Movies in search results can be added and removed from the nomination list. ✅
    
5.  If a search result has already been nominated, disable its nominate button. ✅
    
6.  Display a banner when the user has 5 nominations. ✅

## Extra Features
-   Save nomination lists if the user leaves the page ✅
    
-   Create shareable links ✅

## Methodology
React was used in the development of this application. Movies were fetched from OMDB using their publically accessible API endpoint. Some of the considerations taken in building this application are:

 - **Accessibility**: Polaris was used for this project because of its accessible components that come out of the box (Some of the reasons i love Polaris). Automatically the application can be navigated using just your keyboard. You can move through the movie list by pressing Tab and put a movie up for nomination by pressing enter. 
 - **Interactivity**: Giving the user the best experience is always a focus for me and to achieve this i added the following features: To give the user the best search experience, while typing in the movie name, the application automatically fetches movies from OMDB without the user pressing enter. To make sure we don't pester the API with too many requests from each keystroke, a debounce was used to only send a request after 300ms. Users won't need to worry about their nominations disappearing after reloading the page as every nomination is saved locally on the user's browser. Users are also easily able to share their nominations with friends by copying a shareable link or sharing it directly on social media.
 
 - **Responsiveness**: Polaris also does a great job with mobile responsiveness with custom fonts for different screen sizes and their flexible layouts, making it a breeze to build responsive designs. The application can easily be used by mobile device users.

 ## Tools Used 🛠️
 - **React js** - Frontend Framework 
 - **Polaris** - UI Library  
 - **OMDB API**

## Improvements


 - Make the nominations draggable so that you can rank the nominations.
 - Add Pagination to the movie result, currently it displays only 10 search results per search term.
  
