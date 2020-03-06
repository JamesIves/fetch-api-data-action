# Fetch API Data Action 📦 🚚

This GitHub action will handle authenticated API requests for you, allowing you to save the data from the request into your workspace as an environment variable and a `.json` file. Using this action will allow you to save data from these queries on a schedule so they can be used in a static page without exposing your API credentials.

This action was originally created for the [2020 GitHub Actions Hackathon](https://github.community/t5/Events/Featured-Event-GitHub-Actions-Hackathon/td-p/48206).

## Getting Started ✈️
You can include the action in your workflow to trigger on any event that GitHub actions supports. You'll need to provide the action with the endpoint you'd like to request along with [any configuration options](TODO:) as [stringified JSON](TODO:). Be sure to store any required secrets using the `${{ secrets.secret_name }}` [syntax](TODO:).

```yml
name: Refresh Feed
on: [push]
jobs:
  refresh-feed:
    runs-on: ubuntu-latest
    steps:
      - name: Fetch API Data
        uses: JamesIves/fetch-api-data-action@releases/v1
        with:
          ENDPOINT: https://example.com
          CONFIGURATION: '{ "method": "GET", "headers": {"Authorization": "Bearer ${{ secrets.API_TOKEN }}"} }'
```

Once the action has run the requested data will be exported as the `FETCH_API_DATA` environment variable and will also be available as a `.json` file in your workspace located by default in `fetch-api-data/data.json`.

You can combine this with the [github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action) to trigger scheduled updates to a feed on your website. 

<details>
<summary>You can view a full example of this here.</summary>

In one workflow you can fetch data from an API on a schedule and push it to your master branch.

```yml
name: Refresh Feed
on: 
  schedule:
    - cron: 10 15 * * 0-6
jobs:
  refresh-feed:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
        with:
          persist-credentials: false
  
      - name: Fetch API Data
        uses: JamesIves/fetch-api-data-action@releases/v1
        with:
          ENDPOINT: https://example.com
          CONFIGURATION: '{ "method": "GET", "headers": {"Authorization": "Bearer ${{ secrets.API_TOKEN }}"} }'
          SAVE: true

      - name: Build and Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: master
          FOLDER: fetch-api-data-action
          TARGET_FOLDER: data
```

 In another workflow you can then build and deploy your page whenever a push is made to that branch.

 ```yml
 name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
        with:
          persist-credentials: false

      - name: Install
        run: |
          npm install
          npm run-script build

      - name: Build and Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages # The branch the action should deploy to.
          FOLDER: build # The folder the action should deploy.
```

In your project you can import the JSON file and make it part of your build script. This way your site will re-build and deploy whenever refreshed data has been fetched from the server.

</details>

## Configuration 📁

The `with` portion of the workflow **must** be configured before the action will work. You can add these in the `with` section found in the examples above. Any `secrets` must be referenced using the bracket syntax and stored in the GitHub repositories `Settings/Secrets` menu. You can learn more about setting environment variables with GitHub actions here.

#### Required Setup

The following configuration options must be set.

| Key            | Value Information                                                                                                                                                                                                                                                                                                                                                                                                                                              | Type             | Required |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| `ENDPOINT`          | The URL of the endpoint you'd like to retrieve data from.                                                                                                                                                            | `with`           | **Yes**  |
| `CONFIGURATION` | Any applicable configuration settings that should be set such as authentication tokens. You can reference secrets using the `${{ secrets.secret_name }}` syntax, or you can reference data returned from the `TOKEN_ENDPOINT` request using the triple mustache syntax: `{{{ data.access_token }}}`. For more information refer to the [Token Request part of the readme](https://github.com/JamesIves/fetch-api-data-action#token-request-%EF%B8%8F) and the [Fetch API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).                                                                                                | `secrets / with` | **Yes**  |

### Optional Choices

| Key            | Value Information                                                                                                                                                                                                                                                                                                                                                                                                                                              | Type             | Required |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| `TOKEN_ENDPOINT`          | If the `ENDPOINT` API requires you to make a request to get an access token prior to fetching data you can perform this task by specifying a token endpoint. Any data returned from the token end.                                                                                                                                                            | `with`           | **No**  |
| `TOKEN_CONFIGURATION` | Any applicable configuration settings that should be set such as authentication tokens. You can reference secrets using the `${{ secrets.secret_name }}` syntax. For more information refer to the [Fetch API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).                                                                                               | `secrets / with` | **No**  |
| `SAVE_LOCATION` | By default the save location of the JSON file is `fetch-api-data-action/data.json`, if you'd like to override the directory you can do by specifying one with this variable.                                                                                                | `secrets / with` | **No**  |


---

### Token Request 🎟️

If you need to make a request to another endpoint in order to request an access token or something similar you can do so using the `TOKEN_ENDPOINT` and `TOKEN_CONFIGURATION` parameters. You can then use the returned token in your `CONFIGURATION` string using the triple mustache syntax like so `{{{ tokens.access_token }}}`. You can find an example of this below.

```yml

name: Refresh Feed
on: [push]
jobs:
  refresh-feed:
    runs-on: ubuntu-latest
    steps:
      - name: Fetch API Data
        uses: JamesIves/fetch-api-data-action@releases/v1
        with:
          TOKEN_ENDPOINT: https://example.com/auth/token
          TOKEN_CONFIGURATION: '{ "method": "GET", "body": {"client_id": "${{ secrets.client_id }}", "client_secret": "${{ secrets.client_secret }}"} }'
          ENDPOINT: https://example.com/data
          # The token here is returned from the TOKEN_ENDPOINT call. The returned data looks like so: {data: {access_token: '123'}}
          CONFIGURATION: '{ "method": "GET", "headers": {"Authorization": "Bearer {{{ data.access_token }}}"} }'
```

