# vehicle-selector
## Objective
The goal of this assignment is to create a dynamic dropdown interface using Vue.js. The dropdowns allow users to select a Year, Make, and Model of vehicles based on data retrieved from a third-party API. The selection flow should be as follows:

1. **Year Selection**: User selects a Year from a list of available years.
2. **Make Selection**: Once a Year is selected, the Make dropdown is populated with the makes available for that Year.
3. **Model Selection**: After selecting a Make, the Model dropdown is populated with models available for the selected Year and Make.

## Features
- **Dynamic Dropdowns:** Dropdowns for Year, Make, and Model that populate based on prior selections.
- **Data Fetching:** API calls are made using Axios to fetch data for Years, Makes, and Models.
- **State Management:** Pinia is used for state management to handle the selected Year, Make, and Model across the application.
- **Error Handling:** Proper error handling in case of failed API requests.

## Technologies & Tools
- **Vue.js**
- **Axios**
- **Pinia**

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
