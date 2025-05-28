import { useRef, useEffect } from "react";

export default function UpdateText({
  data,
  isPublished,
  value,
  onChange,
  containerClass,
  textClass,
  inputClass,
  fontFamilyStyle,
  fontFamilySize,
  fontFamilyWeight
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value, fontFamilySize, fontFamilyStyle, fontFamilyWeight]); // Force update on value change, font size, and font family

  return (
    <div className={containerClass}>
      {isPublished ? (
        <span 
          className={textClass}
          style={{ fontFamily: fontFamilyStyle, fontSize: fontFamilySize, fontWeight: fontFamilyWeight }}>
            {value}
        </span>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          className={inputClass}
          style={{ overflow: "hidden", fontFamily: fontFamilyStyle, fontSize: fontFamilySize, fontWeight: fontFamilyWeight }}
          rows={1}
        />
      )}
    </div>
  );
}