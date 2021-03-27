import { currentUser } from "repositories/User"
import Result500 from "./common/organisms/500";

export default function TestPage() {
    try{
        const user = currentUser();
        console.log(user)
        // throw new Error("テストエラー")
        return (
            <div>
                テストページ
            </div>
        )
    }catch(e){
        return <Result500 error={e} />
    }
}