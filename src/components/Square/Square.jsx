const Square = ({ children, isSelected, updateBoard, index }) => {

    const selectPlayer = `square ${isSelected ? "is-selected" : ''}`

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div onClick={handleClick} className={selectPlayer} >
            {children}
        </div >
    )
}

export default Square