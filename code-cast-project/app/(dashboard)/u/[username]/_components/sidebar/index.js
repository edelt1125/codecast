import Toggle from "./toggle";
import CategoriesButton from "./categoriesButton";
import HomepageButton from "./homepageButton";
import Wrapper from "./wrapper";
import CommunityButton from "./communityButton";

function Sidebar() {

    return(
        <Wrapper>
             <Toggle/>
             <HomepageButton/>
             <CategoriesButton/>
             <CommunityButton/>
        </Wrapper>
    )
}

export default Sidebar;