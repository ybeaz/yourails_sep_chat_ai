# README SEP Chat AI React Typescript UI Native Project

## Decisions made

1. We consider as a Container, the root for loading the store the following types. These components are "smart". We put in there store. All descendents are "dumb". Smart/ container components are:

- screens
- parent modal window frames

2. We supply Containers (see item 1) store not throug useSelector, but with withStoreState HOC
   We provide components with device type informaton with withDeviceType HOC

3. All business logic is in handles, not in the reducers or actions. Actions are only a contraction and manifest the name. Reducers do only what directly matches their names.

## How to section, architecture / development notes

### How to initialize the project from Dev directory

`react-native init SEP --version "0.72.4"`
where `SEP` - project name
`0.72.4` react native version

This does the following:
✔ Downloading template
✔ Copying template
✔ Processing template
✔ Installing Ruby Gems
⠦

### How to debug ios (and possibly android)

1. @link [Chrome DevTools](chrome://inspect/#devices)
2. Info @link [React Native Debugging By Using Hermes](https://reactnative.dev/docs/hermes?package-manager=yarn)

### How to debug web page on IOS mobile device

1. @link [Enabling Web Inspector on MacBook - Safari](https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html)
2. Teminal - ifconfig - Search 192... This is your IP address, correspondent to localhost:port (127.0.0.1:port)
3. On IOS device run app with 192... address
4. Connect IOS device with cable
5. Safari > Develop > Your IOS device name > Select tab > debug

### How to install dependencies, for example module-resolver

`npx expo install module-resolver`

### How to (web) add screens

1.  Use one of two templates
    - TemplateScreen (more customized for a screen) > `TemplateScreen.tsx` && `TemplateScreen.less` from `src/ViewLayer/Screens/`
    - Template (more universal) `Template.tsx` && `Template.less` from `src/ViewLayer/Components/`
2.  Add a link to `....less` file into `src/ViewLayer/Styles/index.style.less`
3.  Add a router into `src/Constants/routes.const.ts`
4.  Add a component import and property to the object into `src/RouterScreensConfig.tsx`
5.  Add 2.4 to the screen component

### How to (web) manage color themes `GLOBAL_THEME.colors`, `BRIGHTNESS` and `ALPHAS`

TODO: Need to write

### How to Input values. Passing input values from input component is implemented by event.target.value in handleEvents function of the related property name in `src/DataLayer/index.handleEvents.ts`

    1. Passing actions. Passing an action is made through the secuence `Component` => `handleEvents` => `dispatch` => `reducer`

### How to add an modal window is made by the following:

1.  Add `ModalFrames` component to `HeaderFrame` component (once)
2.  Add a specific new component to `CHILDREN` object in the `ModalFrames` component
3.  Add an object to the array that controls modal window appearance to state tree `state`: { `componentsState`: {
    `modalFrames`: [ ... ]

### How to use templates:

    A developer is better to use `Template` for creating

1.  functional Components
2.  handlers
3.  reducers
4.  sagas
5.  connectors

### How to run the mobile app

1.  To build Docker image from `docker-compose-mongodb.yml`\
    See here [`Docker.md`](https://github.com/ybeaz/manuals/blob/main/Docker.md)

2.  To run Server\
    in server directory run `yarn dev`

3.  To go to the UI directory: `cd Dev/react-ui-native-template-2022`

4.  To make sure the right path to App in here: `node_modules/expo/AppEntry.js`
    Probably `import App from '../../src/App';`

5.  To run the app
    `yarn expo:start`
    `yarn expo:start --web` To run the app specifically for web
    `/usr/bin/xcodebuild -version` To check xCode version

### How to troubleshoot running the app

1. if you have exception `CommandError: Can't determine id of Simulator app; the Simulator is most likely not installed on this machine. Run sudo xcode-select -s /Applications/Xcode.app` then I run xcode.app and macbook suggested to update xcode. This solved the issue

### How to create/ update `src/types/graphql.tsx`

To run `yarn codegen`
Note: to config `codegen` edit ??? `codegen.yml`

### How to use react-chat-elements

1. gfd
2. yarn `react-native link react-native-vector-icons`

### How to change locale

- **`locale`** _(String)_ - Locale to localize the dates. You need first to import the locale you need (ie. `require('dayjs/locale/de')` or `import 'dayjs/locale/fr'`)
- **`timeFormat`** _(String)_ - Format to use for rendering times; default is `'LT'` (see [Day.js Format](https://day.js.org/docs/en/display/format))
- **`dateFormat`** _(String)_ - Forma

### How to build and deploy web.yourails.com

@link https://github.com/jsdelivr/jsdelivr // Link to CDN that works with GitHub.com
@link https://docs.expo.dev/distribution/publishing-websites/

- In VS Code, `~/Dev/yourails_sep_chat_ai/deployment`,
  - open `/deployment/index-r1.userto.html` and `/deployment/index-web.yourails.html`
  - !!! change version in links for `bundle.min.js` and `main.bundle.min.js`
- Building
  `yarn export:web`: To build. It runs script from package.json file. Legacy command `npx expo export:web`
- Copy `~/Dev/yourails_sep_chat_ai/web-build/static` into
  `~/Dev/yourails-assets-sep-chat-ai/dist/static`
- In Browser authorise at https://www.npmjs.com/ and check previous `yourails-assets-sep-chat-ai` package version
- In Terminal, go to `cd ~/Dev/yourails-assets-sep-chat-ai/`
- In VS code change versions (for example `"version": "0.60.0",`) in
  `/Users/admin/Dev/yourails_sep_chat_ai/package.json` and
  `/Users/admin/Dev/yourails-assets-sep-chat-ai/package.json`
- In Terminal
  - `cd ~/Dev/yourails-assets-sep-chat-ai/ && eval $(ssh-agent -s); ssh-add ~/.ssh/2020-10-19-rsa && npm init && npm publish`,
    go through steps and change version to the next one
- In ForkLift copy
  - copy `/deployment/index-r1.userto.html` to `r1.userto.com/www/`
  - copy `/deployment/index-web.yourails.html` to `../web.yourails.com/www`
  - ` /deployment/index-web.yourails.html``index.html ` and `.htaccess` to the directories
- In Browser, new Tab,
  - `shift`+`command`+`delete` and remove cache
  - check r1.userto.com
  - check `web.yourails.com`
- Check version in https://www.npmjs.com/

### How to navigae? Rules for Urls

See `src/Shared/getSetStoreScenario` and `src/Shared/__tests__/getSetStoreScenario.test.ts`

### How to prepare content? Notes

- `16 x 9` resolution/dimensions for pictures for projects are

## Release 0.60.0

- added help, send features for chat input
- added TQA persona, politicians personas, Ilya Frank style translation persona
