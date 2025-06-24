# Source code for the website "MyPortfolio":

https://monfolioperso.fr

# Build localy with

npm start

# To deploy functions/ to google cloud functions run:

firebase deploy --only functions
firebase functions:list

# Set firebase gmail variables (for emails)
firebase functions:secrets:set GMAIL_USER
firebase functions:secrets:set GMAIL_APP_PASSWORD