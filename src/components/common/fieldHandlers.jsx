// function to handle changes in input fields
export const handleFieldChange = (setData, data, field) => (e) => {
  setData({ ...data, [field]: e.target.value });
};
