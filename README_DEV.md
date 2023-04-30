# README React Typescript UI Native Template

## Revisions history notes

created 2022
updated 2022-10-05
updated 2023-03-17
updated 2023-04-29 partially

## Plans

2023-04-29 edition. Two weeks sprint

- Provide route path to each modal view panel
- Refactor app close to the real conversation scenario: create two other users
- Move userHost-active Profile to the upper bar in the left column
- Create sliding up panel from the bottom of the left column while pushing/ clicking on the userHost-active Profile. And while clicking on the each userHost profile it becomes active for the user
- Each tab-modal window makes its own request of its own content with the help of the useEffect-axios mechanism
- Main screen makes a request and populates tabs according to the available tabs. And load a conversation with a respondent or if there is no, the blank chat space. First move is to implement this without request but based on the import

## Decisions made

1. We consider as a Container, the root for loading the store the following types. These components are "smart". We put in there store. All descendents are "dumb". Smart/ container components are:

- screens
- parent modal window frames

2. We supply Containers (see item 1) store not throug useSelector, but with withStoreState HOC
   We provide components with device type informaton with withDeviceType HOC

3. All business logic is in handles, not in the reducers or actions. Actions are only a contraction and manifest the name. Reducers do only what directly matches their names.

## How to section, architecture / development notes

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

### How to build for web environment and deploy on Panel.NetAngels.ru

@link https://docs.expo.dev/distribution/publishing-websites/

- Building
  `yarn export:web`: To build. It runs script from package.json file. Legacy command `npx expo export:web`
- Deployment on Panel.NetAngels.ru
  With ForkLift copy folder static to SIM link folder `2023-04-22.yourails.com/`. It serves automatically to

  - `r1.userto.com/static/`
  - `web1.yourails.com/static/`

- `npx serve web-build`: Does not work. To serve locally

### How to navigae? Rules for Urls

See `src/Shared/getSetStoreScenario` and `src/Shared/__tests__/getSetStoreScenario.test.ts`

### How to prepare content? Notes

- `16 x 9` resolution/dimensions for pictures for projects are