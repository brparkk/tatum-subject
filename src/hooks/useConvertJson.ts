export const useConvertJson = () => {
  const convertJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const json = JSON.parse(evt.target!.result as string);
      console.log(json);
    };
    reader.readAsText(file);
  };

  return { convertJson };
};
