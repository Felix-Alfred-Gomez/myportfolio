import { useRef, useEffect, useState } from "react";
import { getResponsiveFontSize } from "./responsiveFontSize";

export default function UpdateText({
  isPublished,
  value,
  onChange,
  containerClass,
  textClass,
  fontFamilyStyle,
  fontFamilySize,
  fontFamilyWeight,
  fontColor
}) {
  const textareaRef = useRef(null);
  const [responsiveFontSize, setResponsiveFontSize] = useState(fontFamilySize);

  useEffect(() => {
    function handleResize() {
      setResponsiveFontSize(getResponsiveFontSize(fontFamilySize));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fontFamilySize]);

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
  }, [value, responsiveFontSize, fontFamilyStyle, fontFamilyWeight]);

  return (
    <div className={containerClass}>
      {isPublished ? (
        <div 
          className={textClass}
          style={{ fontFamily: fontFamilyStyle,
          fontSize: responsiveFontSize,
          fontWeight: fontFamilyWeight,
          color: fontColor,
          whiteSpace: "pre-line" }}>
            {value}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          className={`${textClass} update-textarea-editing`}
          style={{ 
            overflow: "hidden",
            fontFamily: fontFamilyStyle,
            fontSize: responsiveFontSize,
            fontWeight: fontFamilyWeight,
            color: fontColor
          }}
          rows={1}
        />
      )}
    </div>
  );
}