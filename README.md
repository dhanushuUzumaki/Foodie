# Foodie

## [Capital One Mindsumo challenge](https://www.mindsumo.com/contests/d052bcf8-4580-4922-95ef-a9f6ceaf0f10)

## Deliverables

1. Submit a deployed web application and include both your website URL and the supporting Github repository.
2. The app must use Yelp's Fusion API
3. Your app should be able to plot merchants on a map
4. Your app should be able to obtain user location via HTML5 Geolocation

## TODO

1. Support pagination style fetching of merchants. Currently a single request gets 50 merchants ordered by rating. 
2. Currently API keys are statically present in the code due to some issues with variable injection during build. Need to update them.

## Future plans

1. Provide search option and make use of autocomplete API.


### Setting up the project

Made using *create-react-app*

1. Clone the repository.
2. Run `npm i` .
3. Start development server with `npm run start` .
4. Build for production using `npm run build` .

### Deployment

Deployed to github pages, using travis CI. Deployment is done only for **master**.
