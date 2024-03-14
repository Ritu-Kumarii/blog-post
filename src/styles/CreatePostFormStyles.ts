import styled from 'styled-components';

export const CreatePostFormContainer = styled.form`
  width: 40%;
  height: 100%;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: left;
  align-items: left;
  margin: 1rem 0;
  label {
    margin-bottom: 5px; 
    font-weight: bold; 
  }

  .form-items {
    display: flex;
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
  }
`;


export const ThemeCheckbox = styled.div`
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px; 
  align-items: center;
  width: 100%;

  label, input {
    width: 50%;
    text-align: left;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormButton = styled.button`
  background-color: #0a315a;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

export const CancelButton = styled(FormButton)`
  background-color: #0a315a; 
  margin-left: 10px; 

  &:hover {
    background-color: #5a6268;
  }
`;

export const FormError = styled.p`
  color: #FF0000;
  margin-top: 5px;
  font-size: 15px;
`;
