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
  fontFamilyWeight,
  fontColor
}) {
  const textareaRef = useRef(null);

  // Force update box size on value change, font size, font family, and window resize etc
  useEffect(() => {
    function handleResize() {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [value, fontFamilySize, fontFamilyStyle, fontFamilyWeight]);

  return (
    <div className={containerClass}>
      {isPublished ? (
        <span 
          className={textClass}
          style={{ fontFamily: fontFamilyStyle,
          fontSize: fontFamilySize,
          fontWeight: fontFamilyWeight,
          color: fontColor }}>
            {value}
        </span>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          className={inputClass}
          style={{ overflow: "hidden",
            fontFamily: fontFamilyStyle,
            fontSize: fontFamilySize,
            fontWeight: fontFamilyWeight,
            color: fontColor }}
          rows={1}
        />
      )}
    </div>
  );
}