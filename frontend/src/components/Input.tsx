import { ChangeEvent } from "react";
import styled from "styled-components";

interface InputProps {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
}

export default function Input({
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <InputWrapper>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  /* Chrome, Safari, Edge, Opera */
  & > input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & > input {
    font-size: 14px;
    font-family: Inter;
    font-weight: 600;
    line-height: 40px;
    border-radius: 10px;
    padding: 0px 14px;
    background: #ffffff;
    border: 2px solid rgba(48, 15, 7, 0.25);
    border-radius: 10px;
    color: #e4780c;
    width: 14vw;
    min-width: 170px;
    @media (max-width: 1200px) {
      width: 22vw;
      justify-content: center;
    }
    @media (max-width: 722px) {
      width: calc(70vw - 32px);
      font-size: 12px;
    }
    /* Firefox */
    -moz-appearance: textfield;
    &::placeholder {
      font-size: 14px;
      color: rgba(48, 15, 7, 0.25);
      @media (max-width: 722px) {
        font-size: 12px;
      }
    }
    &:focus {
      outline: none;
      border: 2px solid #79bfd8;
    }
  }
  & > label {
    font-weight: 700;
    font-size: 14px;
    line-height: 28px;
    color: #79bfd8;
    text-transform: uppercase;
  }
`;
