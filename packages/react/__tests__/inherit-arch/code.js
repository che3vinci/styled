
/**
 *              button                  p
 *              /   \                   \
 *          VButton LoginBtn            VText
 *         /   \
 *   VRedBtn  VBlueBtn
 */

const styled = () => {
    throw new Error('cannot be run in runtime')
}
const VText = styled('p', {})
const VButton = styled('button', {});
const VRedButton = styled(Button, {});
const VBlueBtn = styled(Button, {});
const LoginBtn = () => <button><VText>login</VText></button>


const App = () => {
    return <div>
        <Button>btn</Button>
        <RedButton>red-btn</RedButton>
        <BlueBtn>blue-btn</BlueBtn>
        <div>foo</div>
    </div>
}
export default App
