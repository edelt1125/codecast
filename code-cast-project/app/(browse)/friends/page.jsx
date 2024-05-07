import { getFollowedUsers } from "@/lib/follow-service"
import { Following } from "./following";

export default async function FriendsPage() {

    const following = await getFollowedUsers();

    return (
        <div className="bg-gray-900 min-h-screen overflow-x-hidden overflow-y-hidden">
            <div className="max-w-[800px] ml-16">
                <div className="mt-[30px] mb-[20px] px-4">
                    <Following data={following}/>
                </div>
            </div>
        </div>
    )
}