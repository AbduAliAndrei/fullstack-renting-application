# lambdarents

INTRODUCTION
------------

LambdaRents is a web application that offers software as a service,
giving users the ability to :

1- Look for a property to rent.
2- List their property to rent. 
3- To interact with each other : 
	- As a tenant you can create a request to rent a property.
	- As a landlord, you receive offers from tenants and manage your listings online. 

INSTALLATION
------------

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

You should see it running on your local host.

USAGE
-----
###Users

#Register user
Create a new user using your personal data. 


After registeration, you will be redirected to the offers page.

#Login user

After logging in successfully, you will be redicrected to the offers page.


#Update user
To update your personal info, navigate to profile.
You can update your personal info, credentials and others there.
Create offer (As tenant)

![image](https://user-images.githubusercontent.com/60021814/145650421-d37e811e-5258-48c3-bf0b-2d12bec5c2e7.png)

###Offers

#Create offer
If your role type is a landlord, you can create a listing and receive requests for it.
Navigate to profile -> create offer. Enter the offer's details and upload the images 
of the property along with the layout. After you're done, click on publish.
Done

#View offers globally
You can view all the offers currently hosted on the platform. 
Use the side filter tool to filter the offers according to your needs.


TECHNOLOGIES USED
----------------
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

UNDER PROGRESS
--------------

- Features :
		- Enhancement in User/Platform interactivity.
    - Adding more user-role-specific features.


