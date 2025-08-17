import AddFriendCard from "./AddFriendCard";
import FriendRequestCard from "./FriendRequestCard";

export default function FriendListGrid() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AddFriendCard />
            <FriendRequestCard />
        </div>
    )
}