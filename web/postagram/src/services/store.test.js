import  {render, fireEvent, waitFor, screen} from '@testing-library/react';
import store from './store';

test('store defaults', () => {

  expect(store.allPosts).toBeInstanceOf(Array);
  expect(store.posts).toBeInstanceOf(Object);

});

test('store adds posts', () => {
  // initally 0
  expect(store.allPosts.length).toBe(0);
  // add a post
  store.setPosts([{id: 1}, {id: 2}])
  expect(store.allPosts.length).toBe(2);

});

test('update a post', () => {
 
  // update the post
  store.setPost({id: 1, comment_count: 1});

  // get post by id
  let post = store.getPost(1)

  expect(post.comment_count).toBe(1);
  
});
test('store get post by id', () => {
  // get post by id
  let post = store.getPost(1)
  expect(post.id).toBe(1);
  
});

test('set a posts comments', () => {
  // get post by id
  store.setPostComments(1, [{id: 1, title: 'comment'}])
  // get post by id
  let post = store.getPost(1)

  expect(post.comments).toBeInstanceOf(Array);
  expect(post.comments.length).toBe(1);
  
});

test('clear a posts comments', () => {
  // get post by id
  store.clearPostComments(1)
  // get post by id
  let post = store.getPost(1)

  expect(post.comments).toBeInstanceOf(Array);
  expect(post.comments.length).toBe(0);
  
});

test('store clears posts', () => {
  // initally 2
  expect(store.allPosts.length).toBe(2);
  // clear all
  store.clearPosts()
  expect(store.allPosts.length).toBe(0);
  
});