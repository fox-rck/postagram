import { render, screen } from "@testing-library/react";
import api from "./api";

test("get posts", async () => {
  try {
    const res = await api.getPosts({ pageNumber: 1 });
    expect(res.posts).toBeInstanceOf(Array);
    expect(res.meta).toBeInstanceOf(Object);
  } catch (e) {
    if (e) {
      expect(e.status).toBe("error");
    }
  }
});

test("get post by id", async () => {
  try {
    const res = await api.getPostById(1);
    expect(res.post).toBeInstanceOf(Object);
    expect(res.post.id).toBe(1);
  } catch (e) {
    if (e) {
      expect(e.status).toBe("error");
    }
  }
});

test("get post by id comments", async () => {
  try {
    const res = await api.getPostByIdComments({ id: 1, pageNumber: 1 });
    expect(res.comments).toBeInstanceOf(Array);
    expect(res.meta).toBeInstanceOf(Object);
  } catch (e) {
    if (e) {
      expect(e.status).toBe("error");
    }
  }
});

test("delete a post", () => {
  // TODO:
  expect(api.deletePostById).toBeInstanceOf(Function);
});

test("update a post", () => {
  // TODO:
  expect(api.updatePostById).toBeInstanceOf(Function);
});

test("add a post comment", () => {
  // TODO:
  expect(api.addPostComment).toBeInstanceOf(Function);
});
