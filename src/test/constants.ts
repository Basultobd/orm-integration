import { Schema } from 'mongoose';

// Users information
export interface UserAttributes {
  id: number;
  name: string;
  username: string;
}

export const newUser = {
  id: 1,
  creationBody: {
    name: 'Winry',
    username: 'winryfma'
  }
} as { id: number, creationBody: Omit<UserAttributes, 'id'> };

export const newUsers = [
  { 
    id: 2,
    creationBody: {
      name: 'Edward',
      username: 'edwardfma'
    }
  },
  {
    id: 3,
    creationBody: {
      name: 'Alphonse',
      username: 'alphonsefma'
    }
  }
] as Array<{ id: number, creationBody: Omit<UserAttributes, 'id'> }>

export const updatedNewUser = {
  id: 3,
  updateBody: {
    name: 'Alphonse Elric',
    username: 'alphonseElricfma'
  }
} as { id: number, updateBody: Omit<UserAttributes, 'id'> };

// Posts information
export interface PostAttributes {
  id: number;
  text: string;
  userId: number;
}

export const newPost = {
  id: 1,
  creationBody: {
    userId: 1,
    text: 'This is a new post',
  }
} as { id: number, creationBody: Omit<PostAttributes, 'id'> };

export const newPosts = [
  { 
    id: 2,
    creationBody: {
      text: 'This is the post number 2',
      userId: 1
    }
  },
  {
    id: 3,
    creationBody: {
      text: 'This is the post number 3, Edward is the full metal',
      userId: 2
    }
  }
] as Array<{ id: number, creationBody: Omit<PostAttributes, 'id'> }>;

export const updatedNewPost = {
  id: 1,
  updateBody: {
    text: 'This is the post text modificated',
    userId: 1
  }
} as { id: number, updateBody: Omit<PostAttributes, 'id'> };

// Comments information
export interface CommentAttributes {
  _id: Schema.Types.ObjectId;
  postId: number;
  text: string;
  userId: number;
}

interface CommentCreationAttributes extends Omit<CommentAttributes, '_id'> {};

export const newComment = {
  userId: 1,
  postId: 1, 
  text: 'This is a new comment',
} as CommentCreationAttributes;

export const newComments = [
  {
    userId: 1,
    postId: 1, 
    text: 'This is a new comment 2',
  },
  {
    userId: 1,
    postId: 1, 
    text: 'This is a new comment 3',
  }
] as Array<CommentAttributes>;

export const updatedNewComment = {
  text: 'This is the comment text modificated',
} as Omit<CommentAttributes, 'userId' | 'postId'>;
