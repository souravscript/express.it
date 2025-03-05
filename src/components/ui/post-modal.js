const PostModal=({toggleCreateExpression})=>{
    return (
        <div className="post-modal-container">

            <div className="modal">
                <h1>This is the modal view</h1>
                <input className="expression-input" />
                <button onClick={toggleCreateExpression} className="create-expression">Create Expression</button>
            </div>
        </div>
    )
}
export default PostModal;