import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, Button } from "./util";

export default function InputContainer({ list, firstInput, onSubmit }) {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      {firstInput !== undefined && (
        <Select
          title={firstInput.title}
          optionList={firstInput.optionList}
          onChange={firstInput.onChange}
        />
      )}
      {list.map((data, index) => (
        <React.Fragment key={index}>
          {data.type === "input" && <Input register={register} {...data} />}
          {data.type === "select" && <Select register={register} {...data} />}
        </React.Fragment>
      ))}
      <Button title="저장하기" type="submit" />
    </form>
  );
}
