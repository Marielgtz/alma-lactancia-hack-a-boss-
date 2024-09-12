const CustomDialog = ({ onYes, onNo, onCancel, message }) => {
    return (
        <div className='dialog'>
            <p>{message}</p>
            <button onClick={onYes}>Sí</button>
            <button onClick={onNo}>No</button>
            <button onClick={onCancel}>Cancelar</button>
        </div>
    )
}
export default CustomDialog
