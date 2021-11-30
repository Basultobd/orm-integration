
For the future
- Don't modify anything

Daniel Alcudia
- Base 1/8 - 60% Maybe considerations
- Extra 0/3
- User.hasMany.Posts required foreign key 'userId', In the hasMany the foreign key is mandatory
- The returned http status are not the correct ones, creation should be 201, other operations 200
- The endpoint /users/:id should return an object not a list
- The endpoint to create a new post is /post not /users/:id/posts

Christian Can
- Base 8/8 - 100%
- Extra 0/3

Mauricio Rosas
- Base 0/8 - 50% Maybe considerations for code
- Extra 0/3
- User model doesnt have username in the creation interface
- getUserById instead of getUser, the params should not be creation ones
- The endpoint /users/:id should return an object not a list
- Posts creation endpoint should be POST /posts

Brenda Rodriguez
- Base 3/8 75% Maybe considerations for status codes
- Extra 0/3
- The returned http status are not the correct ones, creation should be 201, other operations 200
- The endpoint /users/:id should return an object not a list
- The endpoint /posts/:id should return an object not a list
- The declared route for /posts/:id/comments has an error, check line 19 on comments.routes

Lizzete Rodriguez
- Base 1/8 60% Maybe considerations for code
- Extra 0/3
- Posts creation endpoint should be POST /posts
- Comments creation endpoint should be POST /comments
- The returned http status are not the correct ones, creation should be 201, other operations 200

Roger Osalde
- Base 0/8 - 50% Maybe considerations for code
- Extra 0/3
- The endpoint /users/:id should return an object not a list
- The endpoint /posts/:id should return an object not a list
- The returned http status are not the correct ones, creation should be 201, other operations 200
- Posts creation endpoint should be POST /posts
- Comments API is not present

Daniel Aguero
- Base 2/8
- Extra 0/3
- The endpoint /users/:id should return an object not a list
- The endpoint /posts/:id should return an object not a list
- The returned http status are not the correct ones, creation should be 201, other operations 200
- There is not endpoint to get post comments /posts/:id/comments
- We can have user_id at low level but not at API level, also there is no way to thrown an error
- User.hasMany should have defined the foreign key

Ignacio Cruz
- Base 3/8
- Extra 0/3
- The endpoint /users/:id should return an object not a list
- The endpoint /posts/:id should return an object not a list
- The returned http status are not the correct ones, creation should be 201, other operations 200

Jhonatan Orozco
- Base 4/8 Changing uuid make any tests fail
- Extra 0/3
- UUID cool but not requested
- The endpoint /users/:id should return an object not a list
- The endpoint /posts/:id should return an object not a list
- Post information was not returned completely
- Comments creation should be done using POST /comments

Carlos Estrella
- Base 3/8
- Extra 0/3
- The returned http status are not the correct ones, creation should be 201, other operations 200
- In returned post info didn't include userId
- There is not endpoint to get post comments /posts/:id/comments

Irving Echeverria
- Base 0/8
- Extra 0/3

Sergio
- Base 3/8
- Extra 0/3

Gabriel
- Base 5/8
- Extra 0/3
