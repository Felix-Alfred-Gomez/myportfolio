# Source code for the website "MyPortfolio":

https://monfolioperso.fr

# Build localy with:

```bash
npm start
```

# To deploy functions/ to google cloud functions (check users inactivity) run:

```bash
firebase deploy --only functions
firebase functions:list
```

# Set firebase gmail variables (for users inactivity emails):

```bash
firebase functions:secrets:set GMAIL_USER
firebase functions:secrets:set GMAIL_APP_PASSWORD
```