/*
/ Rick Fox
/ 01-06-22
/ Feed view for showing all blogs
*/

import { Link } from "react-router-dom";
import api from "../services/api";
import store from "../services/store";
import Collection from "../loaders/collection";
import List from "../components/list";
import Post from "../components/post";

class FeedView extends Collection {
	constructor(props) {
		super(props);
		this.type = "posts";
		this.callApi = (page) => {
			return new Promise(async (resolve, reject) => {
				try {
					const posts = await api.getPosts(page);
					if (!posts) {
						return reject();
					}
					resolve(posts);
				} catch (e) {
					console.log("error", e);
				}
			});
		};
	}
	componentDidMount() {
		super.componentDidMount();
		this.cbId = store.addListener(() => {
			this.setState({ updated: new Date() });
		});
	}
	componentWillUnmount() {
		super.componentWillUnmount();
		store.removeListener(this.cbId);
	}
	render() {
		return (
			<section className="p-4 mx-auto max-w-screen-md flex-1 overflow-y-auto">
				<List
					type={"posts"}
					{...this.state}
					elms={[...store.allPosts]}
					loadMore={this.loadNextPage}
					Component={(props) => {
						const post = store.getPost(props.el.id);
						return post.is_deleted ? null : (
							<Link to={`/post/${post.id}`}>
								<Post post={post} />
							</Link>
						);
					}}
				/>
			</section>
		);
	}
}

export default FeedView;
