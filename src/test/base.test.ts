import { Server } from 'src/server';
import { App } from '../app';
import supertest from 'supertest';
import httpStatus from 'http-status';
import {
  newUser,
  newUsers,
  UserAttributes,
  newPost,
  newPosts,
  PostAttributes,
  newComment,
  newComments,
  CommentAttributes
} from './constants';

// https://sequelize.org/v3/docs/associations/

/**
 * Declare variables to be initialized before
 * all the test cases. 
 */
let app: App;
let server: Server;
 
beforeAll(async () => {
  app = new App();
  await app.start();
  /**
    * This is necessary because we can't cast from a custom type
    * like Server to a primitive like undefined.
    * 
    * Check https://stackoverflow.com/a/53813384
    * https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
    * https://stackoverflow.com/questions/64601286/specify-a-type-for-response-express
    */
  server = (app.httpServer as unknown) as Server;
 });
 
afterAll(async () => {
  await app.stop();
});

/**
 * Users test cases.
 * 
 * This section will cover the next cases:
 * 
 * 1. Create `users`
 * 2. Retrieve single `user` information
 * 3. Retrieve all `users` information
 * 
 */

describe('Users API', () => {
  it('POST /users - Should be able to create a user', async () => {
    await supertest(server)
      // POST /users
      .post('/users')
      .send(newUser.creationBody)
      .expect(httpStatus.CREATED)
      .then(response => {
        // Check response is not undefined
        expect(response.body).toBeDefined();
        // Check the response data
        expect((response.body as UserAttributes).id).toBe(newUser.id);
        expect((response.body as UserAttributes).name).toBe(newUser.creationBody.name);
        expect((response.body as UserAttributes).username).toBe(newUser.creationBody.username);
      })
    }
  );

  it('GET /users/:id - Should be able to get specific user information', async () => {
    await supertest(server)
      // GET /users/:id
      .get(`/users/${newUser.id}`)
      .expect(httpStatus.OK)
      .then(response => {
        // Casting
        const user = response.body as UserAttributes;
        // Check response is defined
        expect(user).toBeDefined();
        // Check if fetched user info matches with the new user obj
        expect(user.id).toBe(1);
        expect(user.name).toBe(newUser.creationBody.name);
        expect(user.username).toBe(newUser.creationBody.username);
      })
    }
  );

  it('GET /users - Should be able to get all users information', async () => {
    const promises = newUsers.map(({ creationBody }) => (
      supertest(server)
        .post('/users')
        .send(creationBody)
        .expect(httpStatus.CREATED)
    ));

    // Create new users
    await Promise.all(promises);

    // Get all users information
    await supertest(server)
    // GET /users
      .get(`/users`)
      .expect(httpStatus.OK)
      .then(response => {
        // Check response is defined
        expect((response.body as Array<UserAttributes>)).toBeDefined();
        // Check if fetched user info matches with the new user obj
        expect((response.body as Array<UserAttributes>).length).toBe(3);

      // Ww have three users, Winry is not required
      const [_, edward, alphonse] = response.body;

      // Users info that we sent to create users in db
      const [edwardUser, alphonseUser] = newUsers;

      // User with id: 2 should be Edward
      const {
        id: edwardId,
        name: edwardName,
        username: edwardUsername
      } = edward as UserAttributes;
      expect(edwardId).toBe(edwardUser.id);
      expect(edwardName).toBe(edwardUser.creationBody.name);
      expect(edwardUsername).toBe(edwardUser.creationBody.username);

      // User with id: 2 should be Alphonse
      const {
        id: alphonseId,
        name: alphonseName,
        username: alphonseUsername
      } = alphonse as UserAttributes;
        expect(alphonseId).toBe(alphonseUser.id);
        expect(alphonseName).toBe(alphonseUser.creationBody.name);
        expect(alphonseUsername).toBe(alphonseUser.creationBody.username);
      })
    }
  );
})

/**
 * Posts test cases.
 * 
 * This section will cover the next cases:
 * 
 * 1. Create `posts`
 * 2. Retrieve single `post` information
 * 3. Retrieve all `posts`
 * 
 */

describe('Posts API', () => {
  it('POST /posts - Should be able to create a post', async () => {
    await supertest(server)
      // POST /posts
      .post('/posts')
      .send(newPost.creationBody)
      .expect(httpStatus.CREATED)
      .then(response => {
        // Check response is not undefined
        expect(response.body).toBeDefined();
        // Check the response data
        expect((response.body as PostAttributes).userId).toBe(newPost.id)
      })
    }
  );

  it('GET /posts/:id - Should be able to get specific posts information', async () => {
    await supertest(server)
      // GET /posts/:id
      .get(`/posts/${newPost.id}`)
      .expect(httpStatus.OK)
      .then(response => {

        const post = response.body as PostAttributes;

        // Check response is defined
        expect(post).toBeDefined();

        // Check if fetched user info matches with the new user obj
        expect(post.id).toBe(1);
        expect(post.userId).toBe(1);
        expect(post.text).toBe(newPost.creationBody.text)
      })
    }
  );

  it('GET /posts - Should be able to get all posts information', async () => {
    const promises = newPosts.map(({ creationBody }) => (
      supertest(server)
        .post('/posts')
        .send(creationBody)
        .expect(httpStatus.CREATED)
    ));

    // Create new users
    await Promise.all(promises);

    // Get all posts information
    await supertest(server)
      // GET /posts
      .get(`/posts`)
      .expect(httpStatus.OK)
      .then(response => {

        // Cast information to correct type

        const fetchedPosts = response.body as Array<PostAttributes>;

        // Check response is defined
        expect(fetchedPosts).toBeDefined();

        // Check if fetched user info matches with the new user obj
        expect(fetchedPosts.length).toBe(3);

        // Users info that we sent to create users in db
        newPosts.forEach(({ id, creationBody }) => {
          const { userId, text } = creationBody as PostAttributes;
          expect(fetchedPosts[id - 1].id).toBe(id)
          expect(fetchedPosts[id - 1].userId).toBe(userId);
          expect(fetchedPosts[id - 1].text).toBe(text);
        })
      })
    }
  );
})

/**
 * Comments test cases
 * 
 * 1. Create a `comment` as part of a post
 * 1. Retrieve all `comments` from a post
 */

describe('Comments API', () => {
  it('POST /comments - Should be able to create a comment', async () => {
    await supertest(server)
      // POST /posts
      .post('/comments')
      .send(newComment)
      .expect(httpStatus.CREATED)
      .then(response => {
        // Check response is not undefined
        expect(response.body).toBeDefined();
        // Check the response data
        expect((response.body as CommentAttributes).userId).toBe(newComment.userId)
        expect((response.body as CommentAttributes).postId).toBe(newComment.postId)
        expect((response.body as CommentAttributes).text).toBe(newComment.text)
      })
    }
  );

  it('GET /posts/:id/comments - Should be able to get specific post comments', async () => {
    const promises = newComments.map(comment => (
      supertest(server)
        .post('/comments')
        .send(comment)
        .expect(httpStatus.CREATED)
    ));

    // Create new users
    await Promise.all(promises);

    await supertest(server)
      // GET /posts/:id
      .get(`/posts/${newComment.postId}/comments`)
      .expect(httpStatus.OK)
      .then(response => {

        const comments = response.body as Array<CommentAttributes>;

        // Check response is defined
        expect(comments).toBeDefined();
        // Check if fetched user info matches with the new user obj
        expect(comments.length).toBe(3);

        // Users info that we sent to create users in db
        newComments.forEach(({ userId, postId, text }, index) => {
          expect(comments[index + 1].postId).toBe(postId)
          expect(comments[index + 1].text).toBe(text);
          expect(comments[index + 1].userId).toBe(userId);
        })
      })
    }
  );
})
