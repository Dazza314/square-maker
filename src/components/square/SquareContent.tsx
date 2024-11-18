import Droppable from './Droppable';
import "./SquareContent.css";
import StagingArea from './StagingArea';



function SquareContent() {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const gridCellSize = Math.floor((viewportHeight - 140) / 24)

    return <div className='main-content'>

        <div id="printCapture" className='square-content' style={{
            gridTemplateColumns: `repeat(24, ${gridCellSize}px)`, gridTemplateRows: `repeat(24, ${gridCellSize}px)`
        }}>
            <Droppable dropId={0} />
            <Droppable dropId={1} />
            <Droppable dropId={2} />
            <Droppable dropId={3} />
            <Droppable dropId={4} />
            <Droppable dropId={5} />
            <Droppable dropId={6} />
            <Droppable dropId={7} />
            <Droppable dropId={8} />
            <Droppable dropId={9} />
            <Droppable dropId={10} />
            <Droppable dropId={11} />
            <Droppable dropId={12} />
            <Droppable dropId={13} />
            <Droppable dropId={14} />
            <Droppable dropId={15} />
            <Droppable dropId={16} />
            <Droppable dropId={17} />
            <Droppable dropId={18} />
            <Droppable dropId={19} />
            <Droppable dropId={20} />
            <Droppable dropId={21} />
            <Droppable dropId={22} />
            <Droppable dropId={23} />
            <Droppable dropId={24} />
            <Droppable dropId={25} />
            <Droppable dropId={26} />
            <Droppable dropId={27} />
            <Droppable dropId={28} />
            <Droppable dropId={29} />
        </div>
        <StagingArea />
    </div>



}





export default SquareContent