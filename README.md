# Image API

## Summary

Image API is an image storage and retrieval service written in node that can be accessed using APIs

## Features

### Upload new images

You can issue a `POST /api/images` that includes an images within a multi-part payload, the name of the multi-part field should be `images`.

### Retrieve existing image

You can request an existing image using `GET /api/images?id=IMAGE_ID_HERE` to receive the image

## Building and running

1. Run `npm install` to install dependencies
1. Run `npm i -g typescript` to install typescript
1. Run `tsc` to build the source
1. Run `node .` to run the compiled source

## Configuration

Configurations for the application as under `/config`.
Requests are logged using [morgan](https://www.npmjs.com/package/morgan).
Linting and Prettier are enabled, please refer to `scripts` in `package.json`.
