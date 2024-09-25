import React from "react";

interface PropType {
  title: string;
  type: any;
  onChange: () => {};
}

export default function Button({ title, type, onChange }: PropType) {
  return (
    <button
      type={type}
      onChange={onChange}
      style={{
        width: 158,
        height: 42.25,
        flexShrink: 0,
        borderRadius: 28,
        border: 0,
        backgroundColor: "#4F46E5",
        color: "#FFF",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: 500,
        marginTop: 10,
      }}
    >
      {title}
    </button>
  );
}
