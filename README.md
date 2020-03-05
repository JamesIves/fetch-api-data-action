# Fetch API Data Action 📦 🚚

## Work in Progress (Pre-Release)

This GitHub action will handle authenticated API requests for you, allowing you to save the data from the request into your workspace as an environment variable or a `.json` file. Using this action will allow you to save data from these queries on a schedule so they can be used in a static page.

This action was originally created for the 2020 GitHub Actions Hackathon.

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
          SAVE: true
          
```

Once the action has run the requested data will be exported as `FETCH_API_DATA` and will be available as a `.json` file in your workspace as `fetch-api-data/data.json`.

You can combine this action with the github-pages-deploy-action to trigger scheduled updates to a feed on your website.

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
          SAVE: true
```

## Configuration 📁

---

### Token Request 🎟️

If you need to make a request to another endpoint in order to request an access token or something similar you can do so using the `TOKEN_ENDPOINT` and `TOKEN_CONFIGURATION` parameters. You can then use the returned token in your `CONFIGURATION` string using the triple mustache syntax like so `{{{ tokens.access_token }}}`. The action uses mustache.js to make these replacements.

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
          TOKEN_ENDPOINT: https://example.com/auth
          TOKEN_CONFIGURATION: '{ "method": "GET", "headers": {"Authorization": "Bearer ${{ secrets.secret }}"} }'
          ENDPOINT: https://example.com
          CONFIGURATION: '{ "method": "GET", "headers": {"Authorization": "Bearer {{{ data.access_token }}}"} }'
          SAVE: true
```

