// functions to handle field changes in forms
export const handleFieldChange = (setData, data, field) => (e) => {
  setData({ ...data, [field]: e.target.value });
};

// function to handle changes in nested fields
export const handleNestedFieldChange = (setData, data, parentField, field) => (value) => {
  setData({...data, [parentField]: {...data[parentField], [field]: value}});
};
