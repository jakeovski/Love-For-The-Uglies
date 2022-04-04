# Hi, This is Love-for-the-Uglies Project!
---
## Setup
To run the project you need to perform an intial setup:

1. Clone the repository
2. Run:

```shell
npm install
```

Both in the client and server folders of the project

3. Create .env file with the following properties:
   CONNECTION_URL - containing the url to connect to Mongo Atlas database
   PORT - containing the port you would like the server to run on

4. For security reasons the private key required for the JWT token is not present in the repository. Generate a new pair of public.pem and private.pem RS256 keys and put them in the /server/config folder of the project

---

## Project dependencies

### Client

| Dependency          | Version        | Description                                           |
|---------------------|----------------|-------------------------------------------------------|
| @emotion/react      | 11.7.1         | Styling library used by MUI                           |
| @emotion/styled     | 11.6.0         | Styling library used by MUI                           |
| @mui/icons/material | 5.3.0          | MUI icons library                                     |
| @mui/lab            | 5.0.0-alpha.74 | MUI library of experimental components                |
| @mui/material       | 5.3.0          | MUI core component library                            |
| axios               | 0.25.0         | Used to make api calls from the frontend              |
| luxon               | 2.3.1          | Date and time library                                 |
| react               | 17.0.2         | React core library                                    |
| react-dom           | 17.0.2         | React core library                                    |
| react-dropzone      | 12.0.4         | File dropzone component                               |
| react-redux         | 7.2.6          | Redux store                                           |
| react-rounded-image | 2.0.14         | Used to display some of the images in the application |
| react-router-dom    | 6.2.1          | Used for the routing                                  |
| react-scripts       | 5.0.0          | React core library                                    |
| recharts            | 2.1.9          | Library for creating graphs                           |
| redux               | 4.1.2          | Redux store                                           |
| redux-thunk         | 2.4.1          | Redux store                                           |
| web-vitals          | 2.1.3          | React core library                                    |

### Server

| Dependency   | Version | Description                                                                                             |
|--------------|---------|---------------------------------------------------------------------------------------------------------|
| bcrypt       | 5.0.1   | Used to encrypt and compare passwords                                                                   |
| cors         | 2.8.5   | package for providing a Connect/Express middleware that can be used to enable CORS with various options |
| dotenv       | 14.2.0  | Used to manage environmental variables                                                                  |
| express      | 4.17.2  | Express core                                                                                            |
| jsonwebtoken | 8.5.1   | Used to sign and validate JWT tokens                                                                    |
| luxon        | 2.3.0   | Date and time library                                                                                   |
| mongoose     | 6.1.7   | MongoDb persistence library                                                                             |
| nodemon      | 2.0.15  | Used to automatically restart server on change                                                          |
