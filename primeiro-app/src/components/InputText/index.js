function InputText(props){
    return(
        <div className="input-text">
            <label htmlFor={props.id}>{props.text}</label>
            <input 
                type={props.type} 
                placeholder={props.placeholder} 
                id={props.id} 
                onChange={props.callback}></input>
        </div>
    );
}

export default InputText;