# lambdarents

# Introduction

LambdaRents is a web application that offers software as a service,
giving users the ability to :

- Look for a property to rent.

- List their property to rent. 

- To interact with each other : 
  - As a tenant you can create a request to rent a property.
  - As a landlord, you receive offers from tenants and manage your listings online.
 
---

# Installation
First, clone the repository:

```bash
git clone https://github.com/AbduAliAndrei/fullstack-renting-application.git
# or
git clone git@github.com:AbduAliAndrei/fullstack-renting-application.git
```
Second, install the dependencies:

```bash
npm run install:all
```

Lastly, run the :
```bash
npm run dev
```

You should see it running on your local host (Port 3000).

# Usage
## Users
---
## register user
Create a new user using your personal data. 
![image](https://user-images.githubusercontent.com/60021814/145650421-d37e811e-5258-48c3-bf0b-2d12bec5c2e7.png)

After registeration, you will be redirected to the offers page.

---

## Login user

![image](https://user-images.githubusercontent.com/60021814/145650566-75af2805-9a44-48e1-a997-87759976ec4a.png)

After logging in successfully, you will be redicrected to the offers page.

---
## Update user
To update your personal info, navigate to profile.

There you can: 
	
- update your personal info, credentials and others there.
- Create offer (As a landlord)

![image](https://user-images.githubusercontent.com/60021814/145650653-d74a8034-a404-4c85-a5d2-9c88bc577a00.png)

---

## Offers
---

### Create offer


If your role type is a landlord, you can create a listing and receive requests for it.

#### Navigate to profile -> create offer. Enter the offer's details and after you're done, click on submit.

![image](https://user-images.githubusercontent.com/60021814/145650730-c40f135f-6821-44bd-a1be-d1bd5019a11f.png)

---

### View offers globally

#### You can view all the offers currently hosted on the platform. 
#### Use the side filter tool to filter the offers according to your needs.
![image](https://user-images.githubusercontent.com/60021814/145650809-d1810219-c630-4b26-aac3-3398b0746bef.png)


---

# Technologies used

- Languages:
    - Server: NodeJS (Typescript supersetted)
    - Client: JS (Typescript supersetted)
- Frameworks:
    - Server: ExpressJS + Firebase
    - Client: NextJS + ReactJS
- Hosting:
		- Firebase
- Database:
		- Firestore
- CI/CD :
		- Github Actions + Firebase integrated workflow-setup/deployment
- Containerization:
		- Docker containers  Find the image on docker hub here

# Under progress

- Features :
	- Enhancement in User/Platform interactivity.
    	- Adding reviewing system feature to enable recommendation for:
        	- Users (Tenant or Landlord).
        	- Offers.
    	- Enabling chat messaging feature.
    - Adding more user-role-specific features.
      - Ability to block and review other users based on interactions.
      - Filtering users not following the guidelines.
      - Adding a dashboard for tenants to track their listings and manage them more easily.

- Technologies :
  - Adding containers + orchestration.
  - Creating data scrapers and setting up dashboards for admins (Using Prometheus and Grafana).
