![image](https://github.com/user-attachments/assets/8294865e-7130-4491-829a-a46d43b3f7ed)## Installation

- Frstly , clone the repository

```bash
git clone ...
cd filepath
```

- install the dependencies
```bash
git clone ...
cd filepath
```
- update the enviroment variable
  
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=****
CLERK_SECRET_KEY=****
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_CLERK_SIGN_IN_FALLBACK_URL=/
NEXT_CLERK_SIGN_UP_FALLBACK_URL=/
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=****
NEXT_PUBLIC_CLOUDINARY_API_KEY=****
CLOUDINARY_API_SECRET=****
CLOUDINARY_CLOUD_NAME=****
CLOUDINARY_API_KEY=****
CLOUDINARY_API_SECRET=****

# Stripe
STRIPE_API_KEY=****
FRONTEND_STORE_URL=****

STRIPE_WEBHOOK_SECRET=****
```
for clerk credentials, please learn [here](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages?_gl=1*u4c109*_gcl_au*MTI1MjM1NDA0NS4xNzEzMTc1MjM1*_ga*Mjc4ODAzNTA3LjE3MTMxNzUyMzU.*_ga_1WMF5X234K*MTcxMzE3NTIzNS4xLjEuMTcxMzE3NTk0OC4wLjAuMA..)
for stripe api keys, please visit ['stripe'](https://dashboard.stripe.com/)
for cloudinary, please check npm package `npm i next-cloudinary`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##### You can start creating the store at the home page. After creating a store , you will be in dashboard.

## Screenshots

- OverView Screen
![image](https://github.com/user-attachments/assets/42a7d46f-6daa-4913-b3db-fb91205ebfee)

- Create A billboard (for background in ecommerce website)
![image](https://github.com/user-attachments/assets/54217528-eea5-41ee-83d0-d38e35e61821)

- then create color, categories and sizes. After that, you can create a product

![image](https://github.com/user-attachments/assets/eadd22c3-8d45-4099-8e61-c13c1008ee6c)

![image](https://github.com/user-attachments/assets/d59f08f0-205e-4dba-b05f-d1ccddef69ff)

- check settings page to config the store website

  ![image](https://github.com/user-attachments/assets/37304ef9-9f9d-4a16-9af7-d5c531207b68)


#### Deployments

You can use zenmo app [here](https://zenmo.drazcoding.com)

You can check zenmo store app [here](https://zenmostore.drazcoding.com)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
