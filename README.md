
<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>ancora_sys
</h1>
<h3>◦ Building wave upon wave of future-ready simplicity.</h3>
<h3>◦ Developed with the software and tools listed below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/esbuild-FFCF00.svg?style&logo=esbuild&logoColor=black" alt="esbuild" />
<img src="https://img.shields.io/badge/Chart.js-FF6384.svg?style&logo=chartdotjs&logoColor=white" alt="Chart.js" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style&logo=PostCSS&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
<img src="https://img.shields.io/badge/Chai-A30701.svg?style&logo=Chai&logoColor=white" alt="Chai" />
<img src="https://img.shields.io/badge/sharp-99CC00.svg?style&logo=sharp&logoColor=white" alt="sharp" />
<img src="https://img.shields.io/badge/Vitest-6E9F18.svg?style&logo=Vitest&logoColor=white" alt="Vitest" />
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style&logo=Vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Swiper-6332F6.svg?style&logo=Swiper&logoColor=white" alt="Swiper" />
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style&logo=Axios&logoColor=white" alt="Axios" />
<img src="https://img.shields.io/badge/Vue.js-4FC08D.svg?style&logo=vuedotjs&logoColor=white" alt="Vue.js" />

<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/OpenAI-412991.svg?style&logo=OpenAI&logoColor=white" alt="OpenAI" />
<img src="https://img.shields.io/badge/SemVer-3F4551.svg?style&logo=SemVer&logoColor=white" alt="SemVer" />
<img src="https://img.shields.io/badge/SVGO-3E7FC1.svg?style&logo=SVGO&logoColor=white" alt="SVGO" />
<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style&logo=Lodash&logoColor=white" alt="Lodash" />
<img src="https://img.shields.io/badge/Flat-3481FE.svg?style&logo=Flat&logoColor=white" alt="Flat" />
<img src="https://img.shields.io/badge/Koa-33333D.svg?style&logo=Koa&logoColor=white" alt="Koa" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Ajv-23C8D2.svg?style&logo=Ajv&logoColor=white" alt="Ajv" />
<img src="https://img.shields.io/badge/Buffer-231F20.svg?style&logo=Buffer&logoColor=white" alt="Buffer" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/languages/top/gaqno/ancora_sys?style&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/gaqno/ancora_sys?style&color=5D6D7E" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/commit-activity/m/gaqno/ancora_sys?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/license/gaqno/ancora_sys?style&color=5D6D7E" alt="GitHub license" />
</div>

---

## 📒 Table of Contents
- [📒 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [⚙️ Features](#-features)
- [📂 Project Structure](#project-structure)
- [🧩 Modules](#modules)
- [🚀 Getting Started](#-getting-started)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

This project is a SPA.
The default store has to be save in sessionStorage.
This project const with a fake api, using json-server.

Need to feed /.env with values.
You can follow /.env.example
---

## ⚙️ Features

```html
[x] Admin SSO
[] Minhas Franquias
[] Catálogo de Produtos
[] Boas Práticas
[] Portal de Compras
[] Comunicações
[] Gestão de Colaboradores
```
---

## 📂 Project Structure

```bash
repo
├── app.vue
├── components
│   ├── admin-sso-component.vue
│   ├── admin-sso-groups-component.vue
│   ├── admin-sso-keys-component.vue
│   ├── admin-sso-systems-component.vue
│   ├── admin-sso-users-component.vue
│   ├── best-pratices-components.vue
│   ├── breadcrumbs-component.vue
│   ├── button-component.vue
│   ├── carrousel-component.vue
│   ├── chat-component.vue
│   ├── graphs-component.vue
│   ├── header-component.vue
│   ├── home-component.vue
│   ├── loading-component.vue
│   ├── login-component.vue
│   ├── modal-component.vue
│   ├── my-account-component.vue
│   ├── sidebar-component.vue
│   ├── skeleton-component.vue
│   ├── slide
│   │   ├── about-component.vue
│   │   ├── edit-component.vue
│   │   └── filters-component.vue
│   ├── table-component.vue
│   └── tags-component.vue
├── composables
│   ├── useCallAssistant.ts
│   ├── useFormatBreadcrumbs.ts
│   └── useGetEnviroment.ts
├── constants
│   ├── apy_key.ts
│   ├── company.ts
│   ├── systems.ts
│   └── usuario.ts
├── db.json
├── global.css
├── global.d.ts
├── nuxt.config.ts
├── package.json
├── pages
│   └── index.vue
├── plugins
│   └── vercel.ts
├── public
│   └── favicon.ico
├── README.md
├── routes.json
├── server
│   └── tsconfig.json
├── service
│   ├── ApiKeyService.ts
│   ├── api.ts
│   ├── BaseAdminService.ts
│   ├── BasePortalService.ts
│   ├── ColaboradorService.ts
│   ├── DadosUsuarioService.ts
│   ├── EmpresaService.ts
│   ├── EventosService.ts
│   ├── openai.ts
│   ├── PerfilAcessoService.ts
│   ├── SistemaService.ts
│   ├── SsoService.ts
│   └── UsuarioService.ts
├── static
│   └── img
│       ├── banner.png
│       ├── banner-web-slide_01.png
│       ├── banner-web-slide_02.png
│       ├── banner-web-slide_03.png
│       ├── banner_xl.jpg
│       ├── login_banner.png
│       └── logo.png
├── store
│   ├── app.ts
│   └── client.ts
├── tailwind.config.js
├── test
│   └── openai.test.ts
├── tsconfig.json
├── types
│   ├── backend-conversation.ts
│   ├── git.ts
│   ├── request
│   │   ├── ApiKeyRequest.ts
│   │   ├── PerfilAcessoRequest.ts
│   │   ├── PermissaoRequest.ts
│   │   ├── SistemaRequest.ts
│   │   └── UsuarioRequest.ts
│   └── response
│       ├── ApiKeyResponse.ts
│       ├── CriarApiKeyResponse.ts
│       ├── DadosUsuarioResponse.ts
│       ├── EmpresaResponse.ts
│       ├── ErroResponse.ts
│       ├── PerfilAcessoConfirmacaoResponse.ts
│       ├── PerfilAcessoResponse.ts
│       ├── PermissaoResponse.ts
│       ├── SistemaResponse.ts
│       └── UsuarioResponse.ts
├── vitest.config.js

16 directories, 86 files
```

---

## 🧩 Modules

<details closed><summary>Root</summary>

| File                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---                                                                                    | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [nuxt.config.ts](https://github.com/gaqno/ancora_sys/blob/main/nuxt.config.ts)         | The code snippet configures a Nuxt.js app with various functionalities including configured app head, installed modules, compression of public assets, Cloudinary image settings, plugins, Pinia store settings, Tailwind CSS configuration, runtime environment variables.                                                                                                                                                                                                               |
| [vitest.config.js](https://github.com/gaqno/ancora_sys/blob/main/vitest.config.js)     | The code snippet configures Vite by defining plugins, setting up test globals and environment, and resolving aliases for file paths. It enables Vue plugin, sets test environment to jsdom, and configures aliases for commonly used paths.                                                                                                                                                                                                                                               |
| [.eslintrc](https://github.com/gaqno/ancora_sys/blob/main/.eslintrc)                   | This code snippet is a configuration file for ESLint, a popular JavaScript linter. It enables linting for Vue.js projects with TypeScript and sets rules for code formatting and style.                                                                                                                                                                                                                                                                                                   |
| [tailwind.config.js](https://github.com/gaqno/ancora_sys/blob/main/tailwind.config.js) | This code exports a configuration object for a project using Tailwind CSS. It includes the mode, content patterns, plugins, and theme customization options. The plugins include form styles, typography, aspect ratio, and a UI library called DaisyUI. The theme is extended with custom colors, fonts, animations, and keyframes.                                                                                                                                                      |
| [global.css](https://github.com/gaqno/ancora_sys/blob/main/global.css)                 | This code snippet imports the Poppins font from Google Fonts and applies it to all elements on the web page. It also includes styles for fade animations, which are triggered when an element enters or leaves the page.                                                                                                                                                                                                                                                                  |
| [.npmrc](https://github.com/gaqno/ancora_sys/blob/main/.npmrc)                         | The code snippet allows developers to configure two options: 1. Shamefully hoisting dependencies (by overriding the default behavior) 2. Allowing flexibility in peer dependencies (by disabling the strict check). Both options promote code efficiency and flexibility in the overall development process.                                                                                                                                                                              |
| [app.vue](https://github.com/gaqno/ancora_sys/blob/main/app.vue)                       | The code snippet is a Vue/Nuxt component that sets up the layout and main functionality for the app. It includes conditional rendering of a modal component and a loading component based on the app state. It also sets the theme of the Nuxt page based on the app's dark mode state. Additionally, it imports and uses a Vuex store module for managing the app state. The code defines a transition effect for entering and leaving components, and also includes some custom styles. |
| [global.d.ts](https://github.com/gaqno/ancora_sys/blob/main/global.d.ts)               | This code snippet initializes the pinia store for Vue.js applications. It sets the store suffix to'pinia', adjusts the module declaration for Vue files, and creates the pinia instance for state management.                                                                                                                                                                                                                                                                             |

</details>

<details closed><summary>Plugins</summary>

| File                                                                         | Summary                                                                                                                                                                    |
| ---                                                                          | ---                                                                                                                                                                        |
| [vercel.ts](https://github.com/gaqno/ancora_sys/blob/main/plugins/vercel.ts) | The provided code defines a plugin for Nuxt.js that injects the @vercel/analytics library into the Nuxt.js context. This allows for analytics tracking in the application. |

</details>

<details closed><summary>Components</summary>

| File                                                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---                                                                                                                         | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [home-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/home-component.vue)                           | This code snippet is a template for a web page that displays a carousel component, a welcome message with user information, and a set of interactive cards. The cards represent different features or sections of the website, each with a label, subtitle, and an icon. Clicking on a card triggers a change in the view. The data for the cards is stored in an array.                                                                                                 |
| [chat-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/chat-component.vue)                           | This code snippet is a Vue component that represents a virtual assistant chat interface. It includes features such as displaying user and virtual assistant messages, handling user input, and emitting events for tips and questions. The component uses transitions for smooth message animations and references for managing the chat container. Additionally, it accepts props for the response stream and loading state.                                            |
| [sidebar-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/sidebar-component.vue)                     | This code snippet is a drawer component that includes a sidebar menu and a content area. The sidebar menu displays a list of views based on the user's roles. The component allows users to toggle the sidebar's visibility, switch between dark and light modes, and navigate to different views by clicking on the menu items. The content area is a slot where additional content can be inserted.                                                                    |
| [admin-sso-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/admin-sso-component.vue)                 | This code snippet is part of a Vue.js application and includes the template for an admin dashboard. It uses Vue Transitions for smooth animations. There are sections for different components based on the app's current route. Each section displays different data related to permission groups, API keys, systems, and users. There is also a pagination feature that allows the user to navigate through the data.                                                  |
| [modal-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/modal-component.vue)                         | This code snippet contains a modal component that displays a title, content, and certain details based on the template selected. The component also includes buttons to cancel or perform specific actions. It uses the Vuex store to manage the state of the application.                                                                                                                                                                                               |
| [admin-sso-groups-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/admin-sso-groups-component.vue)   | This code snippet is a Vue.js template that renders a table component displaying permission groups. It fetches data from an API, allows pagination, searching, and customization of the number of entries displayed per page. It also includes actions like editing and deleting permission groups, with corresponding modals or slides for confirmation and further interaction.                                                                                        |
| [login-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/login-component.vue)                         | The code snippet is a template for a login page. It includes a form with input fields for username and password, a checkbox option for "remember me," and a button to submit the login form. The handleLogin function is responsible for calling the login API endpoint and handling the login process.                                                                                                                                                                  |
| [admin-sso-keys-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/admin-sso-keys-component.vue)       | This code snippet is a Vue component that displays a table of API keys. It includes features such as pagination, search, and actions like editing and deleting. The component fetches the API keys from a server and updates the table accordingly. There is also integration for chart visualization of the API keys.                                                                                                                                                   |
| [table-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/table-component.vue)                         | This code snippet represents a component that displays tabular data with pagination and sorting capabilities. It receives data and configuration parameters as props and renders the table accordingly. It also handles user interactions such as sorting, pagination, and additional actions. The component uses Tailwind CSS classes for styling and incorporates conditional rendering logic for different types of table cell values.                                |
| [loading-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/loading-component.vue)                     | The code snippet represents the template of a modal component that displays a loading icon in the center of the modal. The template includes a div element with the "modal" and "modal-open" classes, and a nested div with the "text-center" class. Inside the nested div, there is an Icon component with the name "line-md:loading-loop" and size "20em". The purpose of this code is to render a loading icon within the modal component.                            |
| [breadcrumbs-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/breadcrumbs-component.vue)             | This code snippet is a Vue.js component that generates a breadcrumb navigation menu. It uses data from the app store to determine the current route and format the breadcrumb links accordingly. The component also accepts a callback function as a prop, which is triggered when a breadcrumb link is clicked.                                                                                                                                                         |
| [header-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/header-component.vue)                       | This code snippet is a Vue.js component that represents a drawer with a navbar and content. It includes features like toggling the drawer visibility, displaying different slides based on the selected template, and handling the click event to change the slide view.                                                                                                                                                                                                 |
| [best-pratices-components.vue](https://github.com/gaqno/ancora_sys/blob/main/components/best-pratices-components.vue)       | This code snippet is a Vue.js template that includes a table component to display API key information. It fetches the API keys from an API service, with pagination support. It also provides functionality to edit or delete API keys through slide and modal components. The table can be filtered by name and the number of items per page can be adjusted.                                                                                                           |
| [carrousel-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/carrousel-component.vue)                 | This code snippet represents a carousel component. It uses Vue.js's TransitionGroup for animated transitions between slides. The component takes an array of slides as a prop and has previous and next navigation buttons. The current slide is managed by currentIndex variable, and the navigatePrev and navigateNext functions handle the slide navigation logic.                                                                                                    |
| [admin-sso-systems-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/admin-sso-systems-component.vue) | The provided code snippet is a Vue component that displays a table of systems. It fetches system data from an API, allows pagination, and includes options to edit or delete each system. It also includes search functionality and allows the user to customize the number of systems displayed per page.                                                                                                                                                               |
| [my-account-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/my-account-component.vue)               | This code snippet contains a form that allows users to input and update their basic information, such as name and email. It also includes fields for changing the current password and confirming a new password. The form can be submitted to save the changes. The data is stored in the client store and pre-populated when the page loads.                                                                                                                           |
| [admin-sso-users-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/admin-sso-users-component.vue)     | This code snippet is a Vue component that displays a table of users. It fetches users from an API, allows pagination, and provides search functionality. Users can be edited or deleted using slide and modal components. The number of users displayed per page can be adjusted.                                                                                                                                                                                        |
| [graphs-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/graphs-component.vue)                       | The code snippet is a Vue.js template component that displays a section with graphical reports. It uses various chart libraries like Bar, Line, Doughnut, and Bubble to visualize different data sets. The charts show sales and stock information for products, financing data, and stock levels by category. The data for the charts can be randomly generated or received as a prop. The component also has buttons to switch between different views of the reports. |
| [button-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/button-component.vue)                       | This code snippet defines a button component in Vue.js. The button can be customized with text, an optional icon, and whether it should have a "ghost" style. The button's appearance and behavior are determined based on the provided props. The code also imports and utilizes a global app store.                                                                                                                                                                    |
| [skeleton-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/skeleton-component.vue)                   | This code snippet is a Vue.js component template that renders a placeholder skeleton UI. The skeleton UI consists of rows with columns and optional avatars. It dynamically generates rows and columns based on the provided props. The code uses CSS classes and animations to create a pulsating effect on the skeleton UI, giving the impression of loading content. It also uses state from a Vuex store to handle the dark mode preference.                         |
| [tags-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/tags-component.vue)                           | This code snippet is a Vue component for a tag input field. It allows users to input tags, with options for autocomplete, tag verification, duplicate tag handling, and tag count display. Users can add and remove tags, and the component emits the updated list of tags. The code also handles styling and animations for the tag input interface.                                                                                                                    |

</details>

<details closed><summary>Slide</summary>

| File                                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---                                                                                                           | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [edit-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/slide/edit-component.vue)       | This code snippet comprises three forms for managing Single Sign-On (SSO) keys, groups, and users. It dynamically renders different inputs and controls for each form based on the `app.route` value. The data for each form is fetched from the `app.getSlideData` and stored in separate reactive variables such as `ssoFormKeys` and `ssoFormGroups`. The forms allow users to input and save various parameters related to SSO functionalities like prefix, system name, permissions, and more. |
| [filters-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/slide/filters-component.vue) | This code snippet is a Vue.js component that represents a filter form for a specific route in an application. It includes input fields for prefix, category, and price, with cancel and save buttons. It fetches and populates data from the application store when mounted.                                                                                                                                                                                                                        |
| [about-component.vue](https://github.com/gaqno/ancora_sys/blob/main/components/slide/about-component.vue)     | The provided code snippet is a template for a slide-over component that displays information about Rede ANCORA. It includes a close button, a form, and a section that describes the history and operations of Rede ANCORA. It also features a video embedded from YouTube. The code uses functions and variables from the `app` store and the `useAppStore` hook.                                                                                                                                  |

</details>

<details closed><summary>Service</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---                                                                                                    | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [SsoService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/SsoService.ts)                   | The code snippet defines a function called callApi which sends HTTP requests using Axios. It sets the base URL, handles loading states, and adds headers. The function returns a Promise that resolves with the response data. The logout function is also defined, which calls the callApi function to send a GET request to the "/logout" endpoint.                                                                                                                             |
| [openai.ts](https://github.com/gaqno/ancora_sys/blob/main/service/openai.ts)                           | This code snippet implements a function called useChatCompletion, which utilizes the OpenAI API for chat-based language completion. It takes a question as input and constructs a context based on previous messages and predefined variables. It then sends the message to the chat model and retrieves the response. The function manages the conversation flow by appending the question and response to the previous messages. Ultimately, it returns the generated response. |
| [PerfilAcessoService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/PerfilAcessoService.ts) | This code snippet is a collection of functions that make API requests using the axios library. The functions handle various operations related to user profiles, such as fetching all profiles, retrieving profiles by ID, saving and editing profiles, confirming profiles, and deleting profiles.                                                                                                                                                                               |
| [ApiKeyService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/ApiKeyService.ts)             | The provided code snippet is a collection of functions that make HTTP requests using the axios library. The functions handle various API operations such as fetching all API keys, fetching an API key by ID, creating a new API key, editing an existing API key, and deleting an API key. The functions utilize the axios library to send requests with specified methods, endpoints, headers, and data.                                                                        |
| [BaseAdminService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/BaseAdminService.ts)       | The code snippet defines functions for making API calls using Axios with optional loading indicator. It sets the base URL, sends requests with appropriate method, endpoint, data, and headers, and handles loading state. Four functions are provided for performing CRUD operations on an admin resource.                                                                                                                                                                       |
| [UsuarioService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/UsuarioService.ts)           | The code snippet is a collection of functions that utilize axios to make HTTP requests. The functions handle various API requests such as fetching user data, logging in, resetting passwords, changing password, logging out, searching for trophies, and performing admin tasks for managing users. The use of the "callApi" function helps in setting loading state while making requests.                                                                                     |
| [ColaboradorService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/ColaboradorService.ts)   | This code snippet makes use of the Axios library to facilitate making API calls. It defines a function called callApi that sets up the Axios configuration and makes the API request. It also includes several specific functions for different API endpoints, such as getting collaborators, creating or editing them, changing their status, retrieving companies, functions, roles, and resetting passwords.                                                                   |
| [SistemaService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/SistemaService.ts)           | The provided code snippet is a set of functions for making API calls using axios. It includes functions for retrieving and saving data, as well as editing existing data. The functions handle loading state and set headers for the requests. They return Promises with appropriate data types.                                                                                                                                                                                  |
| [EventosService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/EventosService.ts)           | This code snippet defines functions that make API calls using Axios. It includes functionalities such as retrieving lives, getting privacy policies, downloading PDFs, agreeing to privacy policies, obtaining credentials, checking event status, retrieving online participants by ID, retrieving all online participants, starting an event, handling participant entry and exit, and ending a live event.                                                                     |
| [EmpresaService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/EmpresaService.ts)           | The code snippet is a function that makes an API call using the Axios library. It sets the API's base URL, handles loading states, sets headers, and returns the response data. It includes a specific functionality for retrieving all companies from the API. The response data is expected to be in the format of an array of EmpresaResponse objects.                                                                                                                         |
| [api.ts](https://github.com/gaqno/ancora_sys/blob/main/service/api.ts)                                 | The provided code snippet contains a set of functions that make HTTP requests using the Axios library. These functions are used to interact with an API by making various types of requests (GET, POST) to different endpoints. The functions also handle loading state management using a custom store.                                                                                                                                                                          |
| [BasePortalService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/BasePortalService.ts)     | The code snippet is a set of functions that make HTTP requests using Axios. The `callApi` function sets up the Axios configuration, including the base URL and headers. It then makes the request and handles the loading state. The `getPortal`, `postPortal`, `putPortal`, and `deletePortal` functions are shorthand functions that call `callApi` with specific HTTP methods and endpoints.                                                                                   |
| [DadosUsuarioService.ts](https://github.com/gaqno/ancora_sys/blob/main/service/DadosUsuarioService.ts) | This code snippet is a function that makes an API call using Axios. It sets up the base URL for the API, handles loading states, adds headers to the request, and returns the response data. Specifically, it includes a function that retrieves user data from the server.                                                                                                                                                                                                       |

</details>

<details closed><summary>Test</summary>

| File                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                                              |
| ---                                                                                 | ---                                                                                                                                                                                                                                                                                                                                                                                  |
| [openai.test.ts](https://github.com/gaqno/ancora_sys/blob/main/test/openai.test.ts) | The provided code snippet contains a test suite for a function called `useChatCompletion`, which interacts with the OpenAI API. The code ensures that the function returns a valid response from the API, which is not empty, a string, and different from the input question. The `vi.mock` function is used to mock the imported `useRuntimeConfig` function for testing purposes. |

</details>

<details closed><summary>Composables</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---                                                                                                          | ---                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [useFormatBreadcrumbs.ts](https://github.com/gaqno/ancora_sys/blob/main/composables/useFormatBreadcrumbs.ts) | This code snippet provides a function called "formatBreadcrumbs" that takes in a name parameter and returns an object with properties including name, icon, view, and father based on the given name. It is primarily intended to format breadcrumb data for a UI component.                                                                                                                                              |
| [useCallAssistant.ts](https://github.com/gaqno/ancora_sys/blob/main/composables/useCallAssistant.ts)         | The code snippet defines a custom hook called "useCallAssistant" that handles an assistant chat functionality. It makes use of the openai service and app store to handle user questions and responses. The hook exposes a function "ask" to send user questions, a "response" variable to store the assistant's response, and "responseStream" and "loadingSteam" variables to track the conversation and loading state. |
| [useGetEnviroment.ts](https://github.com/gaqno/ancora_sys/blob/main/composables/useGetEnviroment.ts)         | The code snippet exports a custom hook called useGetEnviroment. It retrieves the endpoint URL based on the environment by using global store values and runtime configuration. The returned getEndpoint function is used to dynamically select the appropriate URL.                                                                                                                                                       |

</details>

<details closed><summary>Types</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                                                                                                         |
| ---                                                                                                    | ---                                                                                                                                                                                                                                                                                                             |
| [backend-conversation.ts](https://github.com/gaqno/ancora_sys/blob/main/types/backend-conversation.ts) | The code snippet provides interface definitions for the Conversation and ConversationMessage objects. These objects contain properties such as message IDs, author roles, message content, metadata, conversation history, model information, timezone offsets, and a token for disabling history and training. |
| [git.ts](https://github.com/gaqno/ancora_sys/blob/main/types/git.ts)                                   | The code snippet defines the structure of a User interface, specifying various properties such as login, name, email, and follower count, which can be used to represent a user object in a web application.                                                                                                    |

</details>

<details closed><summary>Response</summary>

| File                                                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                            |
| ---                                                                                                                                   | ---                                                                                                                                                                                                                                                                                                                                |
| [ApiKeyResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/ApiKeyResponse.ts)                                   | The code provides an interface called `ApiKeyResponse` that defines the structure and core properties of the response object returned by an API request. It includes fields for an API key ID, system ID, system name, prefix, consumer, creation date, status, and a list of groups.                                              |
| [CriarApiKeyResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/CriarApiKeyResponse.ts)                         | The provided code snippet defines an interface for a response object, which includes a property called "apiKey" of type string.                                                                                                                                                                                                    |
| [EmpresaResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/EmpresaResponse.ts)                                 | The code snippet contains an interface called "EmpresaResponse" with four properties: "id" (identifies the company), "cnpj" (business identity number), "nome" (name of the company), and "tipo" (type of the company).                                                                                                            |
| [PerfilAcessoConfirmacaoResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/PerfilAcessoConfirmacaoResponse.ts) | This code snippet defines an interface, "PerfilAcessoConfirmacaoResponse," which represents data for confirming user access permissions. It consists of an optional array of user names and an array of objects containing a prefix and a consumer for API keys.                                                                   |
| [DadosUsuarioResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/DadosUsuarioResponse.ts)                       | This code snippet defines an interface called DadosUsuarioResponse with two properties:'login' as a string and'permissoes' as an array of strings. It represents the response data structure for retrieving user information, including login credentials and permissions.                                                         |
| [PerfilAcessoResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/PerfilAcessoResponse.ts)                       | The code snippet defines an interface called PerfilAcessoResponse. It includes properties such as'idPerfil' and'nomePerfil' to store profile details,'idSistema' for system identification,'nomeSistema' for system name (optional), and'permissoes' for storing permissions (optional).                                           |
| [ErroResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/ErroResponse.ts)                                       | The code snippet defines two interfaces, `ErroCampo` and `ErroResponse`, for handling errors in a web application. `ErroCampo` represents an error field with a name and a description, while `ErroResponse` is a more general error response that can contain a list of `ErroCampo` objects or a list of any other message types. |
| [UsuarioResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/UsuarioResponse.ts)                                 | The code snippet defines an interface called UsuarioResponse, which specifies the response format for a user. It includes properties for the user's name, login, status, and an array of group IDs to which the user belongs.                                                                                                      |
| [PermissaoResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/PermissaoResponse.ts)                             | The code snippet defines an interface called PermissaoResponse, which has two properties: nome (name) and descricao (description). The interface is used to model the shape of a response object that contains these two properties.                                                                                               |
| [SistemaResponse.ts](https://github.com/gaqno/ancora_sys/blob/main/types/response/SistemaResponse.ts)                                 | The code defines an interface, SistemaResponse, that captures information about a system. It includes properties like idSistema, nome, url, descricao, and status. It also has an array of permissoes, which are of type PermissaoResponse.                                                                                        |

</details>

<details closed><summary>Request</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                                                                         |
| ---                                                                                                          | ---                                                                                                                                                                                                                                                                                                             |
| [SistemaRequest.ts](https://github.com/gaqno/ancora_sys/blob/main/types/request/SistemaRequest.ts)           | This code defines the core structure of a "SistemaRequest" object, which represents a system in an application. It includes properties for icon, name, url, description, status, and an array of permissions. The "PermissaoRequest" interface defines the structure for individual permissions.                |
| [UsuarioRequest.ts](https://github.com/gaqno/ancora_sys/blob/main/types/request/UsuarioRequest.ts)           | The code snippet defines an interface called UsuarioRequest, which has two properties: "status" of type string and "grupos" as an array of strings.                                                                                                                                                             |
| [PermissaoRequest.ts](https://github.com/gaqno/ancora_sys/blob/main/types/request/PermissaoRequest.ts)       | The code snippet defines an interface named "PermissaoRequest" that has two properties: "nome" of type string and "descricao" of type string. This interface is used to define the structure of a request object that is used to store user permissions information.                                            |
| [ApiKeyRequest.ts](https://github.com/gaqno/ancora_sys/blob/main/types/request/ApiKeyRequest.ts)             | The code snippet defines an interface called ApiKeyRequest with three properties: idGrupos (an array of strings or undefined), consumidor (a string), and status (a string). It represents the structure and data requirements for an API key request object.                                                   |
| [PerfilAcessoRequest.ts](https://github.com/gaqno/ancora_sys/blob/main/types/request/PerfilAcessoRequest.ts) | The code snippet defines an interface for a request object called "PerfilAcessoRequest". It has properties for nome (name), idSistema (system ID), and permissoes (permissions) which is an array of strings. This interface can be used to represent and validate requests for accessing profiles in a system. |

</details>

<details closed><summary>Store</summary>

| File                                                                       | Summary                                                                                                                                                                                                                                                                                                               |
| ---                                                                        | ---                                                                                                                                                                                                                                                                                                                   |
| [client.ts](https://github.com/gaqno/ancora_sys/blob/main/store/client.ts) | The provided code snippet defines a reactive store using Vue Composition API. It stores user-related data such as ID, login, name, roles, systems, and companies. It includes getters to retrieve specific user data and an action to set the user data in the store.                                                 |
| [app.ts](https://github.com/gaqno/ancora_sys/blob/main/store/app.ts)       | The provided code snippet defines an interface and a store for managing the app state. The state includes properties for dark mode, loading status, sidebar visibility, current route, environment, language, and various modal and toast properties. The store provides getters and actions to manipulate the state. |

</details>

<details closed><summary>Constants</summary>

| File                                                                             | Summary                                                                                                                                                                                                                                                                                                   |
| ---                                                                              | ---                                                                                                                                                                                                                                                                                                       |
| [apy_key.ts](https://github.com/gaqno/ancora_sys/blob/main/constants/apy_key.ts) | The provided code snippet defines a type called "ApiKey" which represents an API key with various properties such as id, system name, prefix, consumer, creation date, status, and groups. It also exports an instance of ApiKey with specific values assigned to each property.                          |
| [usuario.ts](https://github.com/gaqno/ancora_sys/blob/main/constants/usuario.ts) | The code snippet defines types for Role, SystemType, Empresa, and User. It exports a userData object that represents a user with various roles, systems, and companies they belong to.                                                                                                                    |
| [systems.ts](https://github.com/gaqno/ancora_sys/blob/main/constants/systems.ts) | The code snippet defines a type "Sistema" with specific properties. It also exports an object "sistemaData" that follows that type, with default values assigned to the properties. These properties include id, nome, url, descricao, status, icone, and permissoes.                                     |
| [company.ts](https://github.com/gaqno/ancora_sys/blob/main/constants/company.ts) | The code snippet declares an interface called "Empresa" that consists of properties such as id, cnpj, nome, and tipo (which should be defined with a more descriptive type). This snippet also exports a constant called "empresaData" that initializes an object with values for the Empresa properties. |

</details>

<details closed><summary>Pages</summary>

| File                                                                       | Summary                                                                                                                                                                                                                                                                                                                                                                                          |
| ---                                                                        | ---                                                                                                                                                                                                                                                                                                                                                                                              |
| [index.vue](https://github.com/gaqno/ancora_sys/blob/main/pages/index.vue) | This code snippet implements a component that handles different views within an application. It renders different child components based on the current route, such as a login component, home component, admin single sign-on component, chat component, and my account component. It also includes functionality for handling view changes, fetching user data, and displaying error messages. |

</details>

---

## 🚀 Getting Started

### ✔️ Prerequisites

Before you begin, ensure that you have the following prerequisites installed:
> - `ℹ️ Requirement 1`
> - `ℹ️ Requirement 2`
> - `ℹ️ ...`

### 📦 Installation

1. Clone the ancora_sys repository:
```sh
git clone https://github.com/gaqno/ancora_sys
```

2. Change to the project directory:
```sh
cd ancora_sys
```

3. Install the dependencies:
```sh
npm install
```

### 🎮 Using ancora_sys

```sh
npm run build && node dist/main.js
```

### ⚙️ Mounting fake backend
```sh
json-server --watch db.json --port 3008
```

### 🧪 Running Tests
```sh
npm test
```

---


## 🗺 Roadmap

> - [X] `ℹ️  Task 1: Implement X`
> - [ ] `ℹ️  Task 2: Refactor Y`
> - [ ] `ℹ️ ...`


---

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:
1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).
```sh
git checkout -b new-feature-branch
```
4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.
```sh
git commit -m 'Implemented new feature.'
```
6. Push your changes to your forked repository on GitHub using the following command
```sh
git push origin new-feature-branch
```
7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
The project maintainers will review your changes and provide feedback or merge them into the main branch.

---

## 📄 License

This project is licensed under the `ℹ️  INSERT-LICENSE-TYPE` License. See the [LICENSE](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) file for additional info.

---

## 👏 Acknowledgments

> - `ℹ️  List any resources, contributors, inspiration, etc.`

---
