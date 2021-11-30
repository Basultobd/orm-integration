import { Server } from 'src/server';
import { App } from '../app';
import supertest from 'supertest';
import httpStatus from 'http-status';
import {
  newUser,
  newUsers,
  updatedNewUser,
  UserAttributes,
  newPost,
  newPosts,
  PostAttributes,
  newComment,
  updatedNewPost,
  CommentAttributes
} from './constants';

let app: App;
let server: Server;
 
beforeAll(async () => {
  app = new App();
  await app.start();
  server = (app.httpServer as unknown) as Server;
 });
 
afterAll(async () => {
  await app.stop();
});

/**
 * Users CRUD test suite
 */

describe('Users CRUD', () => {
  it('Should be able to execute CRUD flow', async () => {
    // Create Users
    const promises = [newUser, ...newUsers].map(({ creationBody }) => (
        supertest(server)
          .post('/users')
          .send(creationBody)
          .expect(httpStatus.CREATED)
      ));
  
    // Create new users
    await Promise.all(promises);

    const [winry] = newUsers;

    // Get created user info
    await supertest(server)
      // GET /users/:id
      .get(`/users/${winry.id}`)
      .expect(httpStatus.OK)
      .then(response => {
        // Check response is not undefined
        expect(response.body).toBeDefined();
        // Check the response data
        expect((response.body as UserAttributes).id).toBe(winry.id);
        expect((response.body as UserAttributes).name).toBe(winry.creationBody.name);
        expect((response.body as UserAttributes).username).toBe(winry.creationBody.username);
      });

    // Update existing user info
    await supertest(server)
      // PUT /users/:id
      .put(`/users/${updatedNewUser.id}`)
      .send(updatedNewUser.updateBody)
      .expect(httpStatus.NO_CONTENT)

    const [_, alphonse] = newUsers;
    // Verify if update was succesful
    await supertest(server)
      // GET /users/:id
      .get(`/users/${updatedNewUser.id}`)
      .expect(httpStatus.OK)
      .then(response => {
        // Check response is not undefined
        expect(response.body).toBeDefined();
        // Check the response data
        expect((response.body as UserAttributes).id).toBe(alphonse.id); // The id should not be changed
        expect((response.body as UserAttributes).name).toBe(updatedNewUser.updateBody.name);
        expect((response.body as UserAttributes).username).toBe(updatedNewUser.updateBody.username);
      });
    
    // Delete updated user
    await supertest(server)
      // DELETE /users/:id
      .delete(`/users/${updatedNewUser.id}`)
      .expect(httpStatus.NO_CONTENT)
    
    // Try to retrieve delete user info, should return 404
    // Verify if update was succesful
    await supertest(server)
      // GET /users/:id
      .get(`/users/${updatedNewUser.id}`)
      .expect(httpStatus.NOT_FOUND)
    }
  );
});

/**
 * Posts CRUD test suite
 */

 describe('Posts CRUD', () => {
  it('Should be able to execute CRUD flow', async () => {
    // Create posts
    const promises = [newPost, ...newPosts].map(({ creationBody }) => (
      supertest(server)
        .post('/posts')
        .send(creationBody)
        .expect(httpStatus.CREATED)
    ));

    // Create new users
    await Promise.all(promises);

    // Get created post info
    await supertest(server)
      // GET /posts/:id
      .get(`/posts/${newPost.id}`)
      .expect(httpStatus.OK)
      .then(response => {
        // Check response is not undefined
        expect(response.body).toBeDefined();
        // Check the response data
        expect((response.body as PostAttributes).id).toBe(newPost.id);
        expect((response.body as PostAttributes).text).toBe(newPost.creationBody.text);
        expect((response.body as PostAttributes).userId).toBe(newPost.creationBody.userId);
      });

    // Update existing post info
    await supertest(server)
      // PUT /posts/:id
      .put(`/posts/${newPost.id}`)
      .send(updatedNewPost.updateBody)
      .expect(httpStatus.NO_CONTENT)

    // Verify if update was succesful
    await supertest(server)
      // GET /posts/:id
      .get(`/posts/${newPost.id}`)
      .expect(httpStatus.OK)
      .then(response => {
        // Check response is not undefined
        expect(response.body).toBeDefined();
        // Check the response data
        expect((response.body as PostAttributes).id).toBe(newPost.id); // The id should not be changed
        expect((response.body as PostAttributes).text).toBe(updatedNewPost.updateBody.text);
        expect((response.body as PostAttributes).userId).toBe(updatedNewPost.updateBody.userId);
      });
    
    // Delete updated user
    await supertest(server)
      // DELETE /posts/:id
      .delete(`/posts/${updatedNewPost.id}`)
      .expect(httpStatus.NO_CONTENT);
    
    // Try to retrieve delete user info, should return 404
    // Verify if update was succesful
    await supertest(server)
      // GET /posts/:id
      .get(`/posts/${updatedNewPost.id}`)
      .expect(httpStatus.NOT_FOUND);
    }
  );
});

/**
 * Comments CRUD test suite
 */

 describe('Comments CRUD Flow', () => {
  it('Should be able to execute CRUD flow', async () => {

    let commentId;
    const POST_ID_OVERRIDE = 2;

    // Create comment
    await supertest(server)
      // POST /comments
      .post('/comments')
      .send({ ...newComment, postId: POST_ID_OVERRIDE })
      .expect(httpStatus.CREATED)
      .then(response => {
        const comment = response.body as CommentAttributes;
        commentId = comment._id;
      })

    // Get created comment info
    await supertest(server)
      // GET /comments/:id
      .get(`/comments/${commentId}`)
      .expect(httpStatus.OK)
      .then(response => {
        const comment = response.body as CommentAttributes;
        // Check response is not undefined
        expect(response.body).toBeDefined();
        // Check the response data
        // Fixed id
        expect(comment.postId).toBe(POST_ID_OVERRIDE);
        expect(comment.text).toBe(newComment.text);
        expect(comment.userId).toBe(newComment.userId);
      });

    // Update existing comment info
    await supertest(server)
      // PUT /comments/:id
      .put(`/comments/${commentId}`)
      .send(updatedNewPost.updateBody)
      .expect(httpStatus.NO_CONTENT)

    // Verify if update was succesful
    await supertest(server)
      // GET /comments/:id
      .get(`/comments/${commentId}`)
      .expect(httpStatus.OK)
      .then(response => {
        const comment = response.body as CommentAttributes;
        // Check response is not undefined
        expect(comment).toBeDefined();
        // Check the response data
        expect(comment.postId).toBe(POST_ID_OVERRIDE);
        expect(comment.text).toBe(updatedNewPost.updateBody.text);
        expect(comment.userId).toBe(updatedNewPost.updateBody.userId);
      });
    
    // Delete updated comment
    await supertest(server)
      // DELETE /comments/:id
      .delete(`/comments/${commentId}`)
      .expect(httpStatus.NO_CONTENT)
    
    // Try to retrieve delete user info, should return 404
    // Verify if update was succesful
    await supertest(server)
      // GET /comments/:id
      .get(`/comments/${commentId}`)
      .expect(httpStatus.NOT_FOUND)
    }
  );
})
