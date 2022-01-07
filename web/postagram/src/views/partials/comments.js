/*
/ Rick Fox
/ 01-06-22
/ Feed view for showing all blogs
*/

import { Link } from "react-router-dom";
import api from "../../services/api";
import store from "../../services/store";
import Collection from "../../loaders/collection";
import List from "../../components/list";
import Comment from "../../components/comment";

class CommentsList extends Collection {
	constructor(props) {
		super(props);
		this.type = "comments";
		this.callApi = (page) => {
			return new Promise(async (resolve, reject) => {
				try {
					const comments = await api.getPostByIdComments(props.id, page);
					if (!comments) {
						return reject();
					}
					resolve(comments);
				} catch (e) {
					console.log("error", e);
				}
			});
		};
	}
	render() {
		return (
			<section className="p-4 mx-auto max-w-screen-md flex-1 overflow-y-auto">
				<List
					type={"comments"}
					{...this.state}
					elms={store.getPost(this.props.id).comments}
					loadMore={this.loadNextPage}
					Component={(props) => {
						return <Comment comment={props.el} />;
					}}
				/>
			</section>
		);
	}
}

export default CommentsList;
