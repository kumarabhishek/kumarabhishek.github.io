# React Music Equalizer

## Live Demo:[ https://kumarabhishek.github.io/apps/equalizer/client/build/](https://kumarabhishek.github.io/apps/equalizer/client/build/)

## Introduction

Demo project to showcase ES6 Modules + Express.js + React.js based web application. It is about music equalizer UI component having various features explained in next section.

## Features

1. User can use keyboard to select any particular thumb of equalizer frequency slider.

2. User can use mouse to move frequency slider.

3. User can click anywhere on the rail area of frequency slider to set respective value.

4. Background color of frequency slider changes from red to green via yellow as its value changes from +12 to -12.

5. Each thumb of frequency slider shows current frequency value and updates automatically on moving.

## Getting started

To build using webpack for production use below commands:
```sh
npm i
npm start
```

For dev environment use below commands

```sh
npm i
npm run dev
```

## Design

1. It uses ES6 Module for dev setup to make page reload fastest as there is not webpack or any kind of JS bundling, tranpilation or code splitting involved.

2. Same ES6 Module is used for production for those browser which supports it. For other browser it fall back to webpack built application.

3. Entire UI uses composition of React Component to achieve bettr organization of concern.
This leads to better maintainability and easier feature extension.

4. It does not uses JSX and thus hardly any time is spent in webpack bundling.

5. Only hand coded global namespaced atomic CSS is used. This removed complexity of tooling and keep file size under strict limit.

6. Entire application is under 4KB (excluding React library files). This itself taks about the kind of strict gaols this design achieves. 

## Stack

1. Node.js is the platform used for building application and running Express.js based server.

2. It uses React 16.x for implementing UI components.

3. As it supports ES6 module enabled browser and rest other modern browsers it makes use of webpack.

4. `live-server` is used to automatically reload application on source change in dev mode.

5. Babel is used for just minification and not for transpilation.