import { useRef, useEffect } from "react";

export default function UpdateText({
  isPublished,
  value,
  onChange,
  containerClass,
  textClass,
  inputClass,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className={containerClass}>
      {isPublished ? (
        <span className={textClass}>{value}</span>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          className={inputClass}
          style={{ overflow: "hidden" }}
          rows={1}
        />
      )}
    </div>
  );
}