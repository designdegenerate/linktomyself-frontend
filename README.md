# Linktomyself

Linktomyself is a public homepage as-a-service in a world where our digital life is spread across multiple platforms.

### [view it live](https://linktomyself.com)

[Trello board]([https://trello.com/invite/b/m1C2hRb9/8577da003e286d5af3630a98c567c30e/linktomyself](https://trello.com/b/m1C2hRb9)

## Features
- Name, bio, profile picture
- List of Links
- Galleries with an optional link (e.g: My 5 favorite books and a link to the person's GoodReads)
- Clean, fully responsive, design.
- Light and Dark mode support and a selection of colour schemes.

## Screenshots

![](https://raw.githubusercontent.com/designdegenerate/linktomyself-frontend/main/screenshots/linktomyself.png)

[More screenshots](https://laurensdesign.design/work/linktomyself)

## Not Implemented (yet?)
- validate forms better
- links could use icons
- API integration for automatically fetching content such as books, movies, etc.
- The ability to change the arrangment of content (links, sections, section cards).
- Reset password via email.
- Public deployment!

## Instructions

### Backend Server
This only contains the front-end code, you'll probably want [the server too](https://github.com/designdegenerate/linktomyself-backend).

### Fonts
This project was designed with the [Cabinet Grotesque Variable fonts](https://www.fontshare.com/fonts/cabinet-grotesk) from Indian Type Foundry with specific typographic adjustments. You'll need to download this yourself and place the files in ``src/fonts/`` as its license does not allow redistribution (although it has free unlimited usage for personal and commercial use). If you choose to use another font, you'll probably want to change the CSS in the following places:
- ``src/scss/fonts.scss`` (fonts are imported here)
- ``src/scss/typography.scss`` (font sizing)
- ``src/scss/global-variables.scss`` (font setting, weight and scaling)

Run ``npm install`` to fetch dependencies.

Rename ``apiUrl-template.js`` to ``apiUrl.js`` and add the URL to your own server.

Now you can run the development server using ``npm start`` or build it using ``npm build``.

## Deployment
The Terms of Service and Privacy Policy pages have been left blank, however, it is your responsibility to write them and follow the local laws in your jurisdiction. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## React Stuff

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technologies
- React
- Redux
- Mongoose
- Axios
- Sass
- Cloudinary
- React Router
- React hot toast
- zip.js

## LICENSE
Licensed under the terms of the MIT License.
