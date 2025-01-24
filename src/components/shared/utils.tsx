import { composeSliderObj } from "../../utils/shared";

export const composeSliderMarks = (options?: Array<string>, type?: string) => {
  let values = { max: 10, min: 0, marks: {}, hasLetter: false };

  if (type === "slider" && options?.length) {
      const hasLetters = options.filter((option) => isNaN(Number(option)));
      values.hasLetter = !!hasLetters.length

      if (!hasLetters.length) {
        values.min = Number(options[0]);
        values.max = Number(options[options.length - 1]);
    
        const sliderOptions = options.map((option) => ({
          [Number(option)]: {
            label: <strong className="ml-3 text-[#1d2d50]">{option}</strong>,
          },
        }));
        values.marks = composeSliderObj(sliderOptions);
      } else {
        values.min = 0;
        values.max = options.length;
    
        const sliderOptions = options.map((option, index) => ({
          [index]: {
            label: <strong className="ml-3 text-[#1d2d50]">{option}</strong>,
          },
        }));
        values.marks = composeSliderObj(sliderOptions);
      }
  }  

  return values;
};
