Multi tenant application using NextJS. With this app the user can create their own web page.

Example :  
we have webpage templates : [001.. 0010]  
we have user : [test1.. test10]  
User page will be : [test1.example.com.. test10.example.com]  

install :  

```
$ git clone git@github.com:renalfarid/multisite.git
$ cd multisite
$ npm install
$ npm run dev
```

open :  - http://test1.localhost:3000  
        - http://test2.localhost:3000  
        ...  
        - http://test10.localhost:3000  

can deploy to vercel !