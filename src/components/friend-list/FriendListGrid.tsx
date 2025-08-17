import AddFriendCard from "./AddFriendCard";
import FriendRequestCard from "./FriendRequestCard";
import MyFriendsCard from "./MyFriendsCard";

export default function FriendListGrid() {
    return (
        <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AddFriendCard />
                <FriendRequestCard />
            </div>
            <div>
                <MyFriendsCard />
            </div>
        </div>
    )
}