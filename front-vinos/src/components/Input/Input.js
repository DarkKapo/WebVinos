//Importa style component (para aprender a usarlo)
import styled from "styled-components"
import { useField } from "formik"

const Control = styled.div`
    margin-bottom: 20px;
`

const Label = styled.label`
    color: #000;
    display: block;
    margin-bottom: 0;
`

const MyInput = styled.input`
    outline: none;
    paddong: 8px;
    border: solid 1px #b1b3b5;
    border-radios: 5px;
    width: 100%;
    margin-bottom: 5px;
`
const ErrorMessage = styled.div`
    color: red;
`

const Input = ({ label, ...props }) => {
    //Extraer las propiedades y el error
    const [field, meta] = useField(props)

    return (
        <Control>
            <Label>{label}</Label>
            <MyInput { ...field } { ...props } />
            {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
        </Control>
    )
}

export default Input