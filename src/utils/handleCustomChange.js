const handleCustomChange = (event, validationSchema, handleChange) => {
  const { name, value } = event.target;

  if (value === "") handleChange(event);


  if (validationSchema.fields[name]?.tests[0]?.OPTIONS?.params) {
    const regex = validationSchema.fields[name].tests[0].OPTIONS.params.regex;
    
    if (regex.test(value)) handleChange(event);
  } else {
    handleChange(event);
  }
};

export default handleCustomChange;
